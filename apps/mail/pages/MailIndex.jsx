const { Link, useSearchParams } = ReactRouterDOM
import { MailFilterTxt, MailSearch } from "../cmps/MailFilterTxt.jsx"
import { MailList } from "../cmps/MailList.jsx"
import { SideMenu } from "../cmps/SideMenu.jsx"
import { mailService } from "../services/mail.service.js"


const { useEffect, useState } = React
const { useParams } = ReactRouterDOM


export function MailIndex() {

    const [searchParams, setSearchParams] = useSearchParams()
    const [mails, setMails] = useState(null)
    // const [filterBy, setFilterBy] = useState({ txt: '' })
    const [filterBy, setFilterBy] = useState(mailService.getFilterFromSearchParams(searchParams))



    useEffect(() => {
        laodMails()
        setSearchParams(filterBy)
    }, [filterBy])

    function laodMails() {
        mailService.query(filterBy)
            .then(mails => {
                setMails(mails)
            })
            .catch(err => {
                console.log('err:', err)
            })
    }

    function onRemoveMail(event, mailId) {
        event.stopPropagation()
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

    function onSetFilter(filterBy) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
        // setFilterBy({ ...filterBy })
    }

    if (!mails) return <div>Loading...</div>
    const { sent, txt } = filterBy
    return (
        <section className="mail-container grid">
            <SideMenu />
            {/* <MailFilter
                filterBy={sent}
                onSetFilter={onSetFilter}
            /> */}
            <MailFilterTxt className="search"
                filterBy={txt}
                onSetFilter={onSetFilter} />
            <MailList
                mails={mails}
                onRemoveMail={onRemoveMail}
            />
        </section>
    )
}

