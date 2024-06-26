
// note service
import { utilService } from '../../../services/util.service.js'
import { asyncStorageService } from '../../../services/async-storage.service.js'
import { storageService } from '../../../services/storage.service.js'
import { eventBusService, showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'


export const noteService = {
    query,
    get,
    remove,
    save,
    getEmptyNote,
    getPinnedNotes,
    getUnPinnedNotes,
    duplicateNote,
    toggleNotePin,
    changeNoteColor,
    getDefaultFilter
}

const NOTE_KEY = 'notesDB'

let gNotes = [
    {
        id: utilService.makeId(),
        createdAt: 1112222,
        type: 'NoteTxt',
        isPinned: true,
        style: {
            backgroundColor: '#fff'
        },
        info: {
            title: 'Get my stuff together',
            txt: 'Fullstack Me Baby!'
        }
    },
    {
        id: utilService.makeId(),
        type: 'NoteImg',
        isPinned: false,
        info: {
            url: 'http://some-img/me',
            title: 'Bobi and Me'
        },
        style: {
            backgroundColor: '#00d'
        }
    },
    {
        id: utilService.makeId(),
        type: 'NoteTodos',
        isPinned: false,
        info: {
            title: 'Get my stuff together',
            todos: [
                { txt: 'Driving license', doneAt: null },
                { txt: 'Coding power', doneAt: 187111111 }
            ]
        }
    }
]
_createNotes()

function getPinnedNotes(notes) {
    return notes.filter(note => note.isPinned)
}

function getUnPinnedNotes(notes) {
    return notes.filter(note => !note.isPinned)
}

function getDefaultFilter() {
    return {
        title: "",
        txt: "",
        type: ""
    }
}

function getEmptyNote() {
    return {
        type: 'NoteTxt',
        createdAt: new Date().getDate(),
        isPinned: false,
        style: {
            backgroundColor: utilService.getRandomNoteColor()
        },
        info: {
            txt: '',
            title: '',
            todos: [],
            url: '',
        }
    }
}

function duplicateNote(noteId) {
    return asyncStorageService.get(NOTE_KEY, noteId)
        .then(noteToDuplicate => {
            if (!noteToDuplicate) {
                showErrorMsg('Note not found...')
            }
            console.log(noteToDuplicate)
            const newNote = { ...noteToDuplicate }
            newNote.id = utilService.makeId()
            newNote.isPinned = false
            return asyncStorageService.post(NOTE_KEY, newNote)
        })
}

function toggleNotePin(noteId) {
    return asyncStorageService.get(NOTE_KEY, noteId)
        .then(noteToToggle => {
            if (!noteToToggle) {
                showErrorMsg('Note not found')
            }
            console.log(noteToToggle)
            noteToToggle.isPinned = !noteToToggle.isPinned
            return asyncStorageService.put(NOTE_KEY, noteToToggle)
        })
}

function changeNoteColor(noteId, newColor) {
    return asyncStorageService.get(NOTE_KEY, noteId)
        .then(noteColor => {
            if (!noteColor) {
                showErrorMsg('Note not found')
            }
            noteColor.style.backgroundColor = newColor
            return asyncStorageService.put(NOTE_KEY, noteColor)
        })
}

function query(filterBy) {
    return asyncStorageService.query(NOTE_KEY)
        .then(notes => {
            console.log(notes)
            if (!notes || !notes.length) {
                notes = gNotes
                asyncStorageService.put(NOTE_KEY, gNotes)
            }
            // if (!filterBy.text) {
            //     return notes
            // }
            // const regex = new RegExp(filterBy.text, 'i')
            // return notes.filter(note => {
            //     regex.test(note.info.title) || 
            //     regex.test(noto.info.txt) ||
            //     regex.test(note.type)
            // })
            return notes
        })
}

function get(noteId) {
    return asyncStorageService.get(NOTE_KEY, noteId)
}

function remove(noteId) {
    return asyncStorageService.remove(NOTE_KEY, noteId)
}

function save(note) {
    if (note.id) {
        return asyncStorageService.put(NOTE_KEY, note)
    } else {
        return asyncStorageService.post(NOTE_KEY, note)
    }
}

function _createNotes() {
    let notes = storageService.loadFromStorage()
    if (!notes || !notes.length) notes = gNotes
    storageService.saveToStorage(NOTE_KEY, notes)
}
