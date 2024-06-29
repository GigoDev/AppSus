
import { utilService } from "../../../services/util.service.js";
import { noteService } from "../services/note.service.js";
import { NoteColor } from "./dynamic-inputs/NoteColor.jsx";
import { NoteVideo } from "./dynamic-inputs/NoteVideo.jsx";


const { useState, useEffect, Fragment } = React

export function NotePreview({ note, onEditNote, onToggleNotePin, onRemoveNote, onDuplicateNote, isPinned, onChangeNoteColor }) {
    const [content, setContent] = useState('NoteTxt')
    const [showColorPicker, setShowColorPicker] = useState(false)

    useEffect(() => {
        updateContent(note)
    }, [note])

    const debouncedSaveNote = utilService.debounce(saveUpdatedNote, 500);

    function handleChangeTitle(ev) {
        const newTitle = ev.target.value
        const updatedNote = {
            ...note,
            info: { ...note.info, title: newTitle }
        }
        onEditNote(updatedNote)
        debouncedSaveNote(updatedNote)
    }

    function handleChangeInfo(ev) {
        const newText = ev.target.value
        const updatedNote = {
            ...note,
            info: { ...note.info, txt: newText }
        }
        onEditNote(updatedNote);
        debouncedSaveNote(updatedNote);
    }

    function handleChangeTodos({ target }, todoIdx) {
        const value = target.checked
        const updatedTodos = note.info.todos.map((todo, idx) => (
            idx === todoIdx ? { ...todo, doneAt: value ? Date.now() : null } : todo
        ))
        const updatedNote = {
            ...note,
            info: { ...note.info, todos: updatedTodos }
        }
        onEditNote(updatedNote)
        debouncedSaveNote(updatedNote)
    }

    function saveUpdatedNote(updatedNote) {
        // Save to local storage
        noteService.save(updatedNote)
    }

    function getVideoFromUrl(value) {
        const videoId = value.match(/(?:youtu\.be\/|youtube\.com\/(?:.*[\?&]v=|.*\/embed\/|.*\/v\/))([\w-]{11})/)
        return videoId ? videoId[1] : null
    }

    function updateContent(note) {
        let updatedContent
        switch (note.type) {
            case 'NoteTxt':
                updatedContent =
                    <textarea
                        contentEditable
                        suppressContentEditableWarning
                        onInput={handleChangeInfo}
                        value={note.info.txt}
                    />
                break

            case 'NoteImg':
                updatedContent =
                    <img src={note.info.url}
                        alt={note.info.title} />
                break

            case 'NoteVideo':
                const videoId = getVideoFromUrl(note.info.url)
                // console.log('videoId',videoId)
                updatedContent = videoId ? <NoteVideo videoId={videoId} /> : 'invalid ID'
                break

            case 'NoteTodos':
                updatedContent = (
                    <ul className="clean-list">
                        {
                            note.info.todos.map((todo, idx) => (

                                <li key={idx}>
                                    <input
                                        name="todos"
                                        type="checkbox"
                                        checked={Boolean(todo.doneAt)}
                                        onChange={(ev) => handleChangeTodos(ev, idx)}
                                    />
                                    {todo.txt}
                                </li>
                            ))
                        }
                    </ul>
                )
                break

            default:
                updatedContent = 'Not supported type'
                break
        }
        setContent(updatedContent)
    }
    const noteCardClass = `${isPinned ? 'active-pin' : ''}`
    return (
        <Fragment>
            <div onClick={() => { onToggleNotePin(note.id) }}>
                <span className={noteCardClass}><i className="fa-solid fa-thumbtack"></i></span>
            </div>

            <textarea
                className="note-card-title"
                contentEditable
                suppressContentEditableWarning
                onInput={handleChangeTitle}
                value={note.info.title}
            />

            <blockquote>
                {content}
            </blockquote>

            <section className="actions-btn flex">
                <span onClick={() => setShowColorPicker(showColor => !showColor)}><i className="fa-solid fa-palette"></i></span>

                {showColorPicker &&
                    <NoteColor
                        selectedColor={note.style.backgroundColor}
                        handleColorChange={color => { onChangeNoteColor(note.id, color) }}
                        onClose={() => setShowColorPicker(false)}
                    />}

                <div onClick={() => { onRemoveNote(note.id) }}>
                    <span><i className="fa-regular fa-trash-can"></i></span>
                </div>

                <div onClick={() => { onDuplicateNote(note.id) }}>
                    <span><i className="fa-regular fa-copy"></i></span>
                </div>

            </section>
        </Fragment>
    )
}