import { noteService } from "../services/note.service.js"
import { NotePreview } from "./NotePreview.jsx"

const { useState, useEffect, Fragment } = React

export function NoteList({ notes, onRemoveNote, onSaveNote, onDuplicateNote, onToggleNotePin, onChangeNoteColor }) {
    const [pinnedNotes, setPinnedNotes] = useState([])
    const [unPinnedNotes, setUnPinnedNotes] = useState([])

    useEffect(() => {
        setPinnedNotes(noteService.getPinnedNotes(notes))
        setUnPinnedNotes(noteService.getUnPinnedNotes(notes))
    }, [notes])
    // console.log(notes)
    return (
        <section className="note-list-container">
            {pinnedNotes.length !== 0 && (
                <Fragment>
                    <h1>Pinned Notes</h1>
                    <section className="pinned-notes">
                        {pinnedNotes.map(note => (
                            <div className="note-card" key={note.id}>
                                <NotePreview note={note}
                                onSaveNote={onSaveNote}
                                onToggleNotePin={onToggleNotePin}
                                onRemoveNote={onRemoveNote}
                                onDuplicateNote={onDuplicateNote}
                                isPinned={note.isPinned}
                                onChangeNoteColor={onChangeNoteColor}
                                />
                            </div>
                        ))}
                    </section>
                </Fragment>
            )}

            {unPinnedNotes.length !== 0 && (
                <Fragment>
                    <h1>Notes</h1>
                    <section className="unPinned-notes">
                        {unPinnedNotes.map(note => (
                            <div className="note-card" key={note.id} >
                            <NotePreview note={note}
                            onSaveNote={onSaveNote}
                            onToggleNotePin={onToggleNotePin}
                            onRemoveNote={onRemoveNote}
                            onDuplicateNote={onDuplicateNote}
                            isPinned={note.isPinned}
                            onChangeNoteColor={onChangeNoteColor}
                            />
                        </div>
                        ))}
                    </section>
                </Fragment>
            )}
        </section>
    )
}
