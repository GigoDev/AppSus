const { Link, useSearchParams, Outlet } = ReactRouterDOM
import { MailFilterTxt } from "../cmps/MailFilterTxt.jsx"
import { MailList } from "../cmps/MailList.jsx"
import { SideMenu } from "../cmps/SideMenu.jsx"
import { mailService } from "../services/mail.service.js"


const { useEffect, useState, useRef } = React


export function MailIndex() {

    const [searchParams, setSearchParams] = useSearchParams()
    const [mails, setMails] = useState(null)
    const [filterBy, setFilterBy] = useState(mailService.getFilterFromSearchParams(searchParams))

    const foldersCountMap = useRef(null)

    useEffect(() => {
        loadMails()
        setSearchParams(filterBy)
        setFoldersCountMap()
    }, [filterBy,foldersCountMap.current])

    function loadMails() {
        mailService.query(filterBy)
            .then(mails => {
                setMails(mails)
            })
            .catch(err => {
                console.log('err:', err)
            })
    }

    function setFoldersCountMap() {
        mailService.query()
            .then(mails => {
                foldersCountMap.current = mails.reduce((acc, mail) => {
                    if (mail.from !== 'user@appsus.com') acc.inbox = (acc.inbox || 0) + 1
                    if (mail.sentAt) acc.sent = (acc.sent || 0) + 1
                    if (mail.isBookmarked) acc.starred = (acc.starred || 0) + 1
                    return acc
                }, {})

            })
            .catch(err => {
                console.log('err:', err)
            })


    }

    function onRemoveMail(ev, mailId) {
        ev.stopPropagation()
        mailService.remove(mailId)
            .then(() => {
                setMails(mails =>
                    mails.filter(mail => mail.id !== mailId)
                )
                // TODO:
                // showSuccessMsg(`Car (${mailId}) removed successfully!`)
            })
            .catch(err => {
                console.log('Problems removing mail:', err)
                // TODO:
                // showErrorMsg(`Having problems removing mail!`)
            })
    }

    function onBookmarkMail(ev, mailId) {
        ev.stopPropagation()

        mailService.get(mailId)
            .then(mail => {
                mail.isBookmarked = !mail.isBookmarked
                return mailService.save(mail)
            })
            .then((mail) => setMails(prevMails =>
                prevMails.map(prevMail =>
                    prevMail.id === mailId ? mail : prevMail)
            ))
            .catch(err => console.log('err:', err))
    }

    function onSetFilter(filterBy) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
    }

    if (!mails) return <div>Loading...</div>
    let { folder, txt } = filterBy
    folder = folder || 'inbox'

    return (
        <section className="mail-container grid">
            <SideMenu className="side-menu"
                filterBy={{ folder }}
                onSetFilter={onSetFilter}
                foldersCountMap={foldersCountMap}
            />

            <MailFilterTxt className="search"
                filterBy={{ txt }}
                onSetFilter={onSetFilter} />

            <MailList
                mails={mails}
                onRemoveMail={onRemoveMail}
                onBookmarkMail={onBookmarkMail}
            />
            <Outlet />
        </section>

    )
}

