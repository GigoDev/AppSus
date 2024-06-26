import { utilService } from "../../../services/util.service.js"

export function MailPreview({ mail }) {

    const { subject, sentAt, from } = mail
    const date = new Date(sentAt)
    const dayNumber = date.getDate()
    const monthName = utilService.getMonthName(date)
    
    return (
        <article className="mail-preview grid">
            <span className="from">{from}</span>
            <span className="subject">{subject}</span>
            <span className="sent-at">{monthName}  {dayNumber}</span>
        </article>
    )
}