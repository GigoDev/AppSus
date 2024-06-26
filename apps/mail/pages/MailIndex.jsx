import { mailService } from "../services/mail.service.js"


const { useEffect, useState } = React


export function MailIndex() {

    const [mails, setMails] = useState(null)

    useEffect(() => {
        laodMails()
    }, [])

    function laodMails() {
        mailService.query()
            .then(mails => {
                setMails(mails)
            })
            .catch(err => {
                console.log('err:', err)
            })
    }

    if (!mails || mails.length === 0) return <div>Loading...</div>
    console.log(mails)
    return <div>mail app</div>
}

