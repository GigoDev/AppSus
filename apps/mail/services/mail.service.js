import { asyncStorageService } from '../../../services/async-storage.service.js'
import { storageService } from '../../../services/storage.service.js'
import { utilService } from '../../../services/util.service.js'

const MAIL_KEY = 'mailDB'

const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}

_createMails()

export const mailService = {
    query,
    get,
    remove,
    save,
    getEmptyMail,
    getDefaultFilter,
    getFilterFromSearchParams
}

function query(filterBy = {}) {
    return asyncStorageService.query(MAIL_KEY)
        .then(mails => {
            if (filterBy.txt) mails = _filterTxt(mails, filterBy)
            if (filterBy.folder) mails = _filterFolder(mails, filterBy)

            return mails
        })
}

function _filterTxt(mails, filterBy) {
    const regExp = new RegExp(filterBy.txt, 'i')
    return mails.filter(mail => regExp.test(mail.from) || regExp.test(mail.subject))
}

function _filterFolder(mails, filterBy) {
    switch (filterBy.folder) {
        case 'inbox':
            mails = mails.filter(({ from, remvedAt }) => (from !== loggedinUser.email) && !remvedAt)
            break;
        case 'sent':
            mails = mails.filter(({ sentAt, remvedAt }) => (sentAt) && !remvedAt)
            break;

        case 'trash':
            mails = mails.filter(mail => mail.removedAt)
            break;

        case 'starred':
            mails = mails.filter(mail => mail.isBookmarked)
            break;

        default:
            break;
    }

    return mails
}

function get(mailId) {
    return asyncStorageService.get(MAIL_KEY, mailId)
        .then(mail => _setNextPrevMailId(mail))
}

function remove(mailId) {
    return asyncStorageService.remove(MAIL_KEY, mailId)
}

function save(mail) {
    if (mail.id) {
        return asyncStorageService.put(MAIL_KEY, mail)
    } else {
        return asyncStorageService.post(MAIL_KEY, mail)
    }
}


function getDefaultFilter() {
    return { txt: '', minSpeed: '' }
}


function getFilterFromSearchParams(searchParams) {
    const txt = searchParams.get('txt') || ''
    const folder = searchParams.get('folder') || ''
    return {
        txt,
        folder
    }
}


function _createMails() {
    let mails = storageService.loadFromStorage(MAIL_KEY)
    if (!mails || !mails.length) {
        mails = getDemoEmails()
        storageService.saveToStorage(MAIL_KEY, mails)
    }
}

function _createMail(subject, body, from, to) {
    return {
        id: utilService.utilService.makeId(),
        createdAt: Date.now,
        subject,
        body,
        isRead: false,
        sentAt: null,
        removedAt: null,
        from,
        to
    }
}

function getEmptyMail(subject = '', body = '', from = '', to = '') {
    return {
        createdAt: Date.now,
        subject,
        body,
        isRead: false,
        sentAt: null,
        removedAt: null,
        from,
        to
    }
}

function _setNextPrevMailId(mail) {
    return asyncStorageService.query(MAIL_KEY).then((mails) => {
        const mailIdx = mails.findIndex((currMail) => currMail.id === mail.id)
        const nextMail = mails[mailIdx + 1] ? mails[mailIdx + 1] : mails[0]
        const prevMail = mails[mailIdx - 1] ? mails[mailIdx - 1] : mails[mails.length - 1]
        mail.nextMailId = nextMail.id
        mail.prevMailId = prevMail.id
        return mail
    })
}

function randomTimestamp() {
    const now = new Date();
    const randomDays = Math.floor(Math.random() * 365);
    const randomDate = new Date(now.setDate(now.getDate() - randomDays));
    return randomDate.getTime();
}

function getDemoEmails() {

    const subjects = [
        'Meeting Reminder', 'Project Update', 'Invoice', 'Greetings', 'Follow-up',
        'Invitation', 'Newsletter', 'Happy Birthday', 'Event Details', 'Job Application',
        'Sale Alert', 'Daily Report', 'Thank You', 'Survey', 'Appointment Confirmation',
        'Security Alert', 'Welcome', 'Service Notice', 'Feedback Request', 'Payment Received',
        'Password Reset', 'Account Verification', 'Promotion', 'System Update', 'Support Ticket',
        'Travel Itinerary', 'Order Confirmation', 'Delivery Notification', 'New Message', 'Subscription Confirmation'
    ]

    const bodies = [
        'Please see the attached files.', 'Looking forward to your response.', 'Thank you for your prompt attention.',
        'Best regards,', 'We are pleased to inform you that...', 'Your request has been processed.', 'We hope to see you there.',
        'Your feedback is important to us.', 'This is a reminder for your upcoming appointment.', 'Congratulations!',
        'Don’t miss out on our latest offers!', 'Please review the following details.', 'Your account has been updated.',
        'We appreciate your business.', 'Let us know if you need further assistance.', 'Your package has been shipped.',
        'Your order is confirmed.', 'Thank you for choosing our service.', 'Your invoice is attached.', 'Please reset your password using the link below.',
        'Your subscription has been confirmed.', 'Welcome to our community!', 'You have a new message.', 'Please verify your email address.',
        'We have received your payment.', 'Your ticket has been created.', 'Please find your itinerary attached.', 'Your delivery is on the way.',
        'We value your feedback.', 'Your report is ready.'
    ]

    const names = [
        "Alex", "Taylor", "Jordan", "Morgan", "Casey", "Riley", "Avery", "Jamie",
        "Cameron", "Drew", "Quinn", "Blake", "Harper", "Reese", "Finley", "Rowan",
        "Peyton", "Dakota", "Hayden", "Skyler", "Emerson", "Logan", "Sawyer", "Parker",
        "Sage", "Tanner", "Ellis", "Kai", "Arden", "Jules"
    ]

    const emails = []
    for (let i = 0; i < 30; i++) {
        let from
        let to
        let sentAt
        if (i <= 20) {
            from = `${names[i]}@gmail.com`
            to = loggedinUser.email
            sentAt = null
        } else {
            from = loggedinUser.email
            to = `${names[i]}@gmail.com`
            sentAt =randomTimestamp()
        }

        const email = {
            id: utilService.makeId(),
            createdAt: Date.now(),
            subject: subjects[Math.floor(Math.random() * subjects.length)],
            body: bodies[Math.floor(Math.random() * bodies.length)],
            isRead: Math.random() < 0.5,
            isBookmarked: Math.random() < 0.2,
            sentAt,
            removedAt: Math.random() < 0.3 ? randomTimestamp() : null,
            from,
            to
        }
        emails.push(email)
    }

    return emails
}

