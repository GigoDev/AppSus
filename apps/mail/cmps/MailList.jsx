import { MailPreview } from "./MailPreview.jsx"

const { Link } = ReactRouterDOM


export function MailList({mails,onRemoveMail}) {
    return (
        <ul className="mail-list flex column">
            {mails.map(mail =>
                <li className="clean-list grid" key={mail.id}>
                    <MailPreview mail={mail} />
                    <section className="list-btns">
                    <button onClick={() => onRemoveMail(mail.id)}>Remove</button>
                    </section>
                </li>
            )}
        </ul>
    )
}
