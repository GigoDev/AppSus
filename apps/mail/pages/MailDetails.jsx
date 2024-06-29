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
        <section className="mail-details flex column">
            <nav className="details-navbar flex">
                <Link to="/mail"><i className="fa-solid fa-arrow-left"></i></Link>
                <section>
                    <Link to={`/mail/details/${mail.prevMailId}`}><i className="fa-solid fa-angle-left"></i></Link>
                    <Link to={`/mail/details/${mail.nextMailId}`}><i className="fa-solid fa-angle-right"></i></Link>
                </section>
            </nav>
            <h2>{mail.subject}</h2>
            <h4>From: {mail.from}</h4>
            <p>{mail.body}</p>
        </section>
    )
}