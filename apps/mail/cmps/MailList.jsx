import { MailPreview } from "./MailPreview.jsx"

const { Link, useNavigate } = ReactRouterDOM


export function MailList({ mails, onRemoveMail }) {

    const navigate = useNavigate()

    return (
        <ul className="mail-list flex column">
            <li className="row clean-list flex">
                <button className="sort-btn">Date <i className="fa-solid fa-chevron-up"></i></button>
                <button className="sort-btn">Subject <i className="fa-solid fa-chevron-up"></i></button>
            </li>
            {mails.map(mail =>
                <li className="row clean-list grid"
                    key={mail.id}
                    onClick={() => navigate(`/mail/details/${mail.id}`)}>
                    <MailPreview mail={mail}
                        onRemoveMail={onRemoveMail}
                    />
                </li>
            )}
        </ul>
    )
}
