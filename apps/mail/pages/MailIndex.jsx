const { Link, useSearchParams,Outlet } = ReactRouterDOM
import { MailFilterTxt } from "../cmps/MailFilterTxt.jsx"
import { MailList } from "../cmps/MailList.jsx"
import { SideMenu } from "../cmps/SideMenu.jsx"
import { mailService } from "../services/mail.service.js"


const { useEffect, useState } = React


export function MailIndex() {

    const [searchParams, setSearchParams] = useSearchParams()
    const [mails, setMails] = useState(null)
    const [filterBy, setFilterBy] = useState(mailService.getFilterFromSearchParams(searchParams))

    useEffect(() => {
        loadMails()
        setSearchParams(filterBy)
    }, [filterBy])

    function loadMails() {
        mailService.query(filterBy)
            .then(mails => {
                setMails(mails)
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
            .then((mail) => setMails(prevMails=>
                                        prevMails.map(prevMail=> 
                                            prevMail.id===mailId? mail: prevMail )
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
                onSetFilter={onSetFilter} />

            <MailFilterTxt className="search"
                filterBy={{ txt }}
                onSetFilter={onSetFilter} />

            <MailList
                mails={mails}
                onRemoveMail={onRemoveMail}
                onBookmarkMail={onBookmarkMail}
            />
            <Outlet/>
        </section>
        
    )
}

