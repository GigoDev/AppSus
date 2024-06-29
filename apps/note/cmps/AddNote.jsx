import { showSuccessMsg } from "../../../services/event-bus.service.js";
import { noteService } from "../services/note.service.js";


const { useState, useEffect, useRef } = React


export function AddNote({ onSaveNote }) {
    const [note, setNote] = useState(noteService.getEmptyNote())
    const [cmpType, setCmpType] = useState('')
    const inputRef = useRef(null)

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus()
        }
    }, [cmpType])

    function onSetCmpType(cmpType) {
        setCmpType(cmpType)
        setNote(prevNote => ({
            ...prevNote,
            type: cmpType,
            info: getEmptyInfo(cmpType)
        }))
    }

    function getEmptyInfo(cmpType) {
        switch (cmpType) {
            case 'NoteImg':
            case 'NoteVideo':
                return { url: '' }
            case 'NoteTodos':
                return { todos: [] }
            case 'NoteTxt':
                return { txt: '' }
            default:
                return { txt: '' }
        }
    }

    function handleChangeTitle({ target }) {
        const { value } = target
        setNote(prevNote => ({
            ...prevNote,
            info: { ...prevNote.info, title: value }
        }))
    }

    function handleChangeInfo({ target }) {
        const { value } = target
        if (cmpType === 'NoteImg' || cmpType === 'NoteVideo') {
            setNote(prevNote => ({
                ...prevNote,
                info: { ...prevNote.info, url: value }
            }))

        } else if (cmpType === 'NoteTodos') {
            const todosArray = value.split(',').map(todo => todo.trim()).filter(todo => todo !== ' ')
            const todosObjects = todosArray.map(todo => ({ txt: todo, checked: false }))
            setNote(prevNote => ({
                ...prevNote,
                info: { ...prevNote.info, todos: todosObjects }
            }))

        } else if (cmpType === 'NoteTxt') {
            setNote(prevNote => ({
                ...prevNote,
                info: { ...prevNote.info, txt: value }
            }))
        }
    }

    function onAddNote(ev) {
        ev.preventDefault()
        if (!cmpType) return
        note.type = cmpType
        console.log(note)
        onSaveNote(note)
            .then(() => setNote(noteService.getEmptyNote()))
            .then(showSuccessMsg('Note added'))
            .catch(err => console.error('Error adding note:', err))
    }
    // console.log(note)

    return (
        <form className="main-input-container" onSubmit={onAddNote}>
            <input
                ref={inputRef}
                className="google-keep-input"
                type="text"
                placeholder="Title"
                name="title"
                onChange={handleChangeTitle}
                value={note.info.title}
                onClick={(ev => ev.preventDefault())}
            />

            <DynamicCmp cmpType={cmpType} value={note.info} onChange={handleChangeInfo} />

            <section className="note-input-container">

                <label htmlFor="NoteTxt">
                    <span><i className="fa-solid fa-font"></i></span>
                </label>

                <input
                    type="radio"
                    id="NoteTxt"
                    name="cmpType"
                    value="NoteTxt"
                    checked={cmpType === 'NoteTxt'}
                    hidden
                    onChange={() => onSetCmpType('NoteTxt')}
                />

                <label htmlFor="NoteImg">
                    <span><i className="fa-regular fa-image"></i></span>
                </label>

                <input
                    type="radio"
                    id="NoteImg"
                    name="cmpType"
                    value="NoteImg"
                    checked={cmpType === 'NoteImg'}
                    hidden
                    onChange={() => onSetCmpType('NoteImg')}
                />

                <label htmlFor="NoteVideo">
                    <span><i className="fa-brands fa-youtube"></i></span>
                </label>

                <input
                    type="radio"
                    id="NoteVideo"
                    name="cmpType"
                    value="NoteVideo"
                    checked={cmpType === 'NoteVideo'}
                    hidden
                    onChange={() => onSetCmpType('NoteVideo')}
                />

                <label htmlFor="NoteTodos">
                    <span><i className="fa-solid fa-list-check"></i></span>
                </label>

                <input
                    type="radio"
                    id="NoteTodos"
                    name="cmpType"
                    value="NoteTodos"
                    checked={cmpType === 'NoteTodos'}
                    hidden
                    onChange={() => onSetCmpType('NoteTodos')}
                />

                <button className="note-submit" type="submit">
                    <span><i className="fa-solid fa-check"></i></span>
                </button>
            </section>


        </form>
    )
}

function DynamicCmp({ cmpType, value, onChange }) {
    switch (cmpType) {
        case 'NoteImg':
            return (
                <input
                    type="text"
                    placeholder="Enter image URL..."
                    onInput={onChange}
                    value={value.url || ''}
                    className="google-keep-input"
                />
            )
        case 'NoteVideo':
            return (
                <input
                    type="text"
                    placeholder="Youtube Video URL"
                    onInput={onChange}
                    value={value.url || ''}
                    className="google-keep-input"
                />
            )
        case 'NoteTodos':
            return (
                <textarea
                    placeholder="TodoList: (Seperate with commas)"
                    value={value.todos.map(todo => todo.txt).join(' , ') || ''}
                    onInput={onChange}
                    className="google-keep-input"
                />
            )
        case 'NoteTxt':
            return (
                <input
                    type="text"
                    placeholder="Enter a note..."
                    onInput={onChange}
                    value={value.txt || ''}
                    className="google-keep-input"
                />
            )
        default:
            return null
    }
}