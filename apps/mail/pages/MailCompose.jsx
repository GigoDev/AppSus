const { useNavigate, useParams } = ReactRouterDOM

const { useState, useEffect } = React
import { mailService } from "../services/mail.service.js";



export function MailCompose() {

    const [mailToEdit, setMailToEdit] = useState(mailService.getEmptyMail())
    const navigate = useNavigate()
    // const { mailId } = useParams()

    useEffect(() => {
        setMailToEdit(prevMailToEdit => ({ ...prevMailToEdit, from: 'me@gmail.com' }))
    }, [])

    // function loadMail() {
    //     mailService.get(mailId)
    //         .then(setMailToEdit)
    //         .catch(err => console.log('err:', err))
    // }

    function onSaveMail(ev) {
        console.log(mailToEdit)
        ev.preventDefault()
        mailService.save(mailToEdit)
            .then(() => {
                navigate('/mail')
                // Todo:
                // showSuccessMsg(`Mail saved successfully!`)
            })
            .catch(err => console.log('err:', err))
    }

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        setMailToEdit(prevMail => ({ ...prevMail, [field]: value }))
    }


    const { to, subject, body } = mailToEdit
    return (

        <form className="compose-mail grid"
            onSubmit={onSaveMail}>

            <h2>New Message</h2>
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