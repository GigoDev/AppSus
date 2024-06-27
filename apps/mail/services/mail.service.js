import { asyncStorageService } from '../../../services/async-storage.service.js'
import { storageService } from '../../../services/storage.service.js'
import { utilService } from '../../../services/util.service.js'

const MAIL_KEY = 'mailDB'

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
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                mails = mails.filter(mail => regExp.test(mail.from) || regExp.test(mail.subject))
            }
            return mails
        })
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
    // return Object.fromEntries(searchParams)
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
        id: utilService.makeId(),
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


function getDemoEmails() {
    return [
        {
            id: utilService.makeId(),
            createdAt: Date.now(),
            subject: 'billing information',
            body: 'vol vol vol',
            isRead: false,
            sentAt: Date.now() - 1000 * 60 * 60 * 24,
            removedAt: null,
            from: `puki@gmail.com`,
            to: 'me@gmail.com'
        },

        {
            id: utilService.makeId(),
            createdAt: Date.now(),
            subject: 'got milk?',
            body: 'dli dli dli',
            isRead: false,
            sentAt: Date.now() - 1000 * 60 * 60 * 24 * 2,
            removedAt: null,
            from: 'alex@gamil.com',
            to: 'me@gmail.com'
        },

        {
            id: utilService.makeId(),
            createdAt: Date.now(),
            subject: 'lets talk abou brunu',
            body: 'bla bla bla',
            isRead: false,
            sentAt: Date.now() - 1000 * 60 * 60 * 24 * 7,
            removedAt: null,
            from: 'me@gmail.com',
            to: 'alex@gamil.com'
        },

        {
            id: utilService.makeId(),
            createdAt: Date.now(),
            subject: ' to be or not to be',
            body: 'glu glu glu',
            isRead: false,
            sentAt: Date.now() - 1000 * 60 * 60,
            removedAt: null,
            from: 'me@gmail.com',
            to: `puki@gmail.com`
        },
    ]
}

