const { Link, useSearchParams } = ReactRouterDOM
import { MailFilter } from "../cmps/MailFilter.jsx"
import { MailList } from "../cmps/MailList.jsx"
import { mailService } from "../services/mail.service.js"


const { useEffect, useState } = React


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

    function onRemoveMail(mailId) {
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
    // console.log(mails)
    return (
        <section className="mail-index">
            <MailFilter filterBy={filterBy} onSetFilter={onSetFilter} />
            <MailList
                mails={mails}
                onRemoveMail={onRemoveMail}
            />
        </section>
    )
}

