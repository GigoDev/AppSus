import { noteService } from "../services/note.service.js"

const { useState, useEffect, Fragment } = React

export function NoteList({ notes }) {
    const [pinnedNotes, setPinnedNotes] = useState([])
    const [unPinnedNotes, setUnPinnedNotes] = useState([])

    useEffect(() => {
        setPinnedNotes(noteService.getPinnedNotes(notes))
        setUnPinnedNotes(noteService.getUnPinnedNotes(notes))
    }, [notes])

    return (
        <section className="note-list-container">
            {/* {pinnedNotes.length !== 0 && (
                <Fragment>
                    <h1>Pinned Notes</h1>
                    <section className="pinned-notes">
                        {pinnedNotes.map(note => (
                            <div className="note-card" key={note.id}>
                                <p> hi </p>
                            </div>
                        ))}
                    </section>
                </Fragment>
            )} */}

            {/* {unPinnedNotes.length !== 0(
                <Fragment>
                    <h1>Notes</h1>
                    <section className="unPinned-notes">
                        {unPinnedNotes.map(note => (
                            <div className="note-card" key={note}>
                                <p>hi</p>
                            </div>
                        ))}
                    </section>
                </Fragment>
            )} */}
        </section>
    )
}
