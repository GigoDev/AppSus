const { useNavigate, useParams, Link } = ReactRouterDOM

const { useState, useEffect } = React
import { showSuccessMsg } from "../../../services/event-bus.service.js";
import { mailService } from "../services/mail.service.js";



export function MailCompose() {

    const [mailToEdit, setMailToEdit] = useState(mailService.getEmptyMail())
    const navigate = useNavigate()
    // const { mailId } = useParams()

    useEffect(() => {
        setMailToEdit(prevMailToEdit => ({ ...prevMailToEdit, from: 'user@appsus.com' }))
    }, [])

    function onSaveMail(ev) {
        ev.preventDefault()
        mailService.save(mailToEdit)
            .then(() => {
                navigate('/mail')
                showSuccessMsg(`Email was sent successfully!`)
            })
            .catch(err => console.log('err:', err))
    }

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        setMailToEdit(prevMail => ({ ...prevMail, [field]: value, sentAt: Date.now() }))
    }

    const { to, subject, body } = mailToEdit

    return (
        <form className="compose-mail grid"
            onSubmit={onSaveMail}>

            <section className="compose-header flex">
                <h2>New Message</h2>
                <Link to="/mail/inbox"><i className="fa-solid fa-xmark"></i></Link>
            </section>
            <input onChange={handleChange}
                className="to-input"
                value={to}
                type="text"
                name="to"
                id="to"
                placeholder="to" />

            <input onChange={handleChange}
                className="subject-input"
                value={subject}
                type="text"
                name="subject"
                id="subject"
                placeholder="subject" />

            <textarea onChange={handleChange}
                className="body-input"
                value={body}
                type="text"
                name="body"
                id="body" >
            </textarea>

            <button className="send-btn">Send</button>
        </form >
    )

}