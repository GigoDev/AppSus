const { useNavigate, useParams } = ReactRouterDOM

const { useState, useEffect } = React
import { mailService } from "../services/mail.service.js";



export function MailCompose() {

    const [mailToEdit, setMailToEdit] = useState(mailService.getEmptyMail())
    const navigate = useNavigate()
    // const { mailId } = useParams()

    useEffect(() => {
        setMailToEdit(prevMailToEdit=>({...prevMailToEdit, from: 'me@gmail.com'}))
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
        <section className="compose-mail flex column">
            <form onSubmit={onSaveMail}>
                <label htmlFor="to">To</label>
                <input onChange={handleChange} value={to} type="text" name="to" id="to" />

                <label htmlFor="subject">Subject</label>
                <input onChange={handleChange} value={subject} type="text" name="subject" id="subject" />

                <label htmlFor="body">Body</label>
                <input onChange={handleChange} value={body} type="text" name="body" id="body" />


                <button>Save</button>
            </form>

        </section>
    )

}