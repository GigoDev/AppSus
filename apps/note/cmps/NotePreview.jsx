import { noteService } from "../services/note.service.js";

import { NoteColor } from "./dynamic-inputs/NoteColor.jsx";
import { NoteVideo } from "./dynamic-inputs/NoteVideo.jsx";

const { useState, useEffect, Fragment, useRef } = React

export function NotePreview({ note, onToggleNotePin, onRemoveNote, onDuplicateNote, isPinned, onChangeNoteColor }) {
    const [content, setContent] = useState('NoteTxt')
    const [showColorPicker, setShowColorPicker] = useState(false)
    const [editedNote, setEditedNote] = useState(note)
    const noteCardClass = `${isPinned ? 'active-pin' : ''}`


    function handleChangeTitle(ev) {
        const newTitle = ev.target.innerText
        setEditedNote(prevEditedNote => ({
            ...prevEditedNote,
            info: { ...prevEditedNote.info, title: newTitle }
        }))
        saveUpdatedNote()
    }

    function handleChangeInfo() {
        setEditedNote(prevEditedNote => ({
            ...prevEditedNote,
            info: { txt: target.innerText }
        }))
    }

    function saveUpdatedNote() {
        noteService.save(editedNote)
    }

    function getVideoFromUrl(value){
        const videoId = value.match(/(?:youtu\.be\/|youtube\.com\/(?:.*[\?&]v=|.*\/embed\/|.*\/v\/))([\w-]{11})/)
        return videoId ? videoId[1] : null
    }

    function handleChange(){

    }

    return (
        <Fragment>
            <div onClick={() => { onToggleNotePin(note.id) }}>
                <span className={noteCardClass}></span>
            </div>

            <h1 className="note-card-title">
                {/* {handleChangeTitle} */}
                {note.info.title}
            </h1>

            <blockquote onInput={ev => handleChangeInfo(ev)}>
            
            </blockquote>

            <section className="actions-btn flex">
                <span onClick={() => setShowColorPicker(showColor => !showColor)}>color pallete</span>

                {showColorPicker &&
                    <NoteColor
                        selectedColor={note.style.backgroundColor}
                        handleColorChange={color => { onChangeNoteColor(note.id, color) }}
                        onClose={() => setShowColorPicker(false)}
                    />}

                <div onClick={() => { onRemoveNote(note.id) }}>
                    <span>Delete</span>
                </div>

                <div onClick={() => { onDuplicateNote(note.id) }}>
                    <span>Copy</span>
                </div>
            </section>
        </Fragment>
    )
}