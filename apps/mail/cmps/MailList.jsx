import { MailPreview } from "./MailPreview.jsx"

const { Link,useNavigate } = ReactRouterDOM


export function MailList({ mails, onRemoveMail }) {
    
    const navigate = useNavigate()

    return (
        <ul className="mail-list flex column">
            {mails.map(mail =>
                <li className="row clean-list grid"
                 key={mail.id}
                 onClick={()=>navigate(`/mail/${mail.id}`)}>
                    <MailPreview mail={mail}
                        onRemoveMail={onRemoveMail}
                    />
                    <section className="list-btns">
                    </section>
                </li>
            )}
        </ul>
    )
}
