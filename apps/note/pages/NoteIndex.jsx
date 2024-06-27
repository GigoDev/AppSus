
import { AddNote } from '../cmps/AddNote.jsx'
import { NoteHeader } from '../cmps/NoteHeader.jsx'
import { NoteList } from '../cmps/NoteList.jsx'
import { noteService } from '../services/note.service.js'

const { useState, useEffect } = React

export function NoteIndex() {
    const [notes, setNotes] = useState(null)
    // const [filterBy, setFilterBy] = useState(noteService.getDefaultFilter())

    useEffect(() => {
        loadNotes()
    }, [])

    function loadNotes() {
        noteService.query(notes)
            .then(setNotes)
            .catch(err => console.log('err:', err))
    }

    // function onSetFilterBy(updateFields) {
    //     setFilterBy(prevFilter => ({ ...prevFilter, ...updateFields }))
    // }

    function onSaveNote(note) {
        console.log(note)
        noteService.save(note)
            .then(loadNotes)
    }

    function onRemoveNote(noteId) {
        console.log(noteId)
        noteService.remove(noteId)
            .then(loadNotes)
    }

    function onDuplicateNote(noteId) {
        console.log(noteId)
        noteService.duplicateNote(noteId)
            .then(loadNotes)
    }

    function onToggleNotePin(noteId) {
        console.log(noteId)
        noteService.toggleNotePin(noteId)
            .then(loadNotes)
    }

    function onChangeNoteColor(noteId, newColor) {
        console.log(noteId)
        noteService.changeNoteColor(noteId, newColor)
            .then(loadNotes)
    }

    if (!notes) return <div>Loading...</div>
    console.log(notes)
    return (
        <section className="note-main-container">
            {/* <NoteHeader onSetFilterBy={onSetFilterBy} filterBy={{ filterBy }} /> */}
            <AddNote onSaveNote={onSaveNote}/>
            <NoteList
                notes={notes}
                onSaveNote={onSaveNote}
                onRemoveNote={onRemoveNote}
                onDuplicateNote={onDuplicateNote}
                onToggleNotePin={onToggleNotePin}
                onChangeNoteColor={onChangeNoteColor}
            />
        </section>
    )
}
