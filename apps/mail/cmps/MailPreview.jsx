import { utilService } from "../../../services/util.service.js"

export function MailPreview({ mail, onRemoveMail }) {

    const { subject, sentAt, from } = mail
    const date = new Date(sentAt)
    const dayNumber = date.getDate()
    const monthName = utilService.getMonthName(date)

    return (
        <article className="mail-preview grid">

            <i className="bookmark fa-regular fa-star"></i>
            <span className="from">{from}</span>
            <span className="subject">{subject}</span>
            <span className="sent-at">{monthName}  {dayNumber}</span>
            <div className="delete-btn"><i className="fa-regular fa-trash-can" onClick={(event) => onRemoveMail(event,mail.id)}></i></div>
        </article>
    )
}

