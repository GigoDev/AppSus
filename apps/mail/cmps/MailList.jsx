import { mailService } from "../services/mail.service.js"
import { MailPreview } from "./MailPreview.jsx"

const { Link, useNavigate } = ReactRouterDOM


export function MailList({ mails, onRemoveMail, onBookmarkMail }) {

    const navigate = useNavigate()

    function readMail(ev, mail) {
        mail.isRead = true
        mailService.save(mail)
            .then((mail) => navigate(`/mail/details/${mail.id}`))
            .catch(err => console.log('err:', err))
    }

    return (
        <ul className="mail-list flex column">
            <li className="row clean-list flex">
                <button className="sort-btn">Date <i className="fa-solid fa-chevron-up"></i></button>
                <button className="sort-btn">Subject <i className="fa-solid fa-chevron-up"></i></button>
            </li>
            {mails.map(mail =>
                <li className="row clean-list grid"
                    key={mail.id}
                    onClick={(event) => readMail(event, mail)} >
                    <MailPreview mail={mail}
                        onRemoveMail={onRemoveMail}
                        onBookmarkMail={onBookmarkMail}
                    />
                </li>
            )}
        </ul>
    )
}
