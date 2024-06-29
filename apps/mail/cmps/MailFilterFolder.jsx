
const { useState, useEffect } = React


export function MailFilterFolder({ filterBy, onSetFilter, foldersCountMap }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ currentTarget }) {
        const value = currentTarget.name
        setFilterByToEdit(prevFilter => ({ ...prevFilter, folder: value }))
    }

    const { folder } = filterBy
    const { inbox, sent, starred,trash } = foldersCountMap.current
   
    return (
        <React.Fragment>

            <button
                name="inbox"
                className={`side-menu-btn ${folder === 'inbox' ? 'chosen' : ''}`}
                onClick={handleChange}>
                <i className="fa-solid fa-inbox"></i>
                <span>Inbox</span>
                <span className="count">{inbox}</span>
            </button>

            <button
                name="trash"
                className={`side-menu-btn ${folder === 'trash' ? 'chosen' : ''}`}
                onClick={handleChange}>
                <i className="fa-regular fa-trash-can" ></i>
                <span>Trash</span>
                <span className="count">{trash}</span>


            </button>

            <button
                name="sent"
                className={`side-menu-btn ${folder === 'sent' ? 'chosen' : ''}`}
                onClick={handleChange}>
                <i className="fa-regular fa-paper-plane"></i>
                <span>Sent</span>
                <span className="count">{sent}</span>

            </button>

            <button
                name="starred"
                className={`side-menu-btn ${folder === 'starred' ? 'chosen' : ''}`}
                onClick={handleChange}>
                <i className="fa-regular fa-star"></i>
                <span>Starred</span>
                <span className="count">{starred}</span>

            </button>

        </React.Fragment>
    )
}