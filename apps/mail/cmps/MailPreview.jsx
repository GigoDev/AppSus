import { utilService } from "../../../services/util.service.js"

export function MailPreview({ mail, onRemoveMail, onBookmarkMail }) {

    const { subject, sentAt, from, isBookmarked, isRead } = mail
    const date = new Date(sentAt)
    const dayNumber = date.getDate()
    const monthName = utilService.getMonthName(date)

    const className = isBookmarked ? 'bookmarked' : 'bookmark'
    const isSolidStar = isBookmarked ? 'solid' : 'regular'
    const readClass = isRead ? 'read' : ''

    return (
        <article className={`mail-preview grid ${readClass}`}>
            <i className={`${className} fa-${isSolidStar} fa-star`} onClick={(event) => onBookmarkMail(event, mail.id)}></i>
            <span className="from">{from}</span>
            <span className="subject">{subject}</span>
            <span className="sent-at">{monthName}  {dayNumber}</span>
            <div className="delete-btn"><i className="fa-regular fa-trash-can" onClick={(event) => onRemoveMail(event, mail.id)}></i></div>
        </article>
    )
}

