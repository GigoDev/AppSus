
import { NoteList } from '../cmps/NoteList.jsx'
import { noteService } from '../services/note.service.js'

const { useState, useEffect } = React

export function NoteIndex() {

    const [notes, setNotes] = useState(null)

    useEffect(() => {
        loadNotes()
    }, [])

    function loadNotes() {
        noteService.query()
        .then(notes => setNotes(notes))
        .catch(err => console.log('err:', err))
    }

    if (!notes) return <div>Loading...</div>
    console.log(notes)
    return (
        <section className="note-main-container">
            <NoteList 
            notes={notes}
            />
        </section>
    )
}
