import { mailService } from "../services/mail.service.js"

const { useParams, Link } = ReactRouterDOM


const { useEffect, useState } = React

export function MailDetails() {

    const [mail, setMail] = useState(null)

    const { mailId } = useParams()

    useEffect(() => {
        loadMail()
    }, [mailId])


    function loadMail() {
        mailService.get(mailId)
            .then(mail => setMail(mail))
    }

    if (!mail) return <div>Loading...</div>
    return (
        <section className="mail-details">
            <h2>From: {mail.from}</h2>
            <p>{mail.body}</p>
            <button ><Link to="/mail">Back</Link></button>
            <section>
                <button ><Link to={`/mail/${mail.prevMailId}`}>Prev Mail</Link></button>
                <button ><Link to={`/mail/${mail.nextMailId}`}>Next Mail</Link></button>
            </section>
        </section>
    )
}