
const { useState, useEffect } = React

export function MailFilterFolder({ filterBy, onSetFilter }) {


    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ currentTarget }) {
        const value = currentTarget.name
        setFilterByToEdit(prevFilter => ({ ...prevFilter, folder: value }))
    }
    

    return (
        <React.Fragment>

            <button
                name="inbox"
                className="side-menu-btn"
                onClick={handleChange}>
                <i className="fa-solid fa-inbox"></i>
                <span>Inbox</span>
            </button>

            <button
                name="trash"
                className="side-menu-btn"
                onClick={handleChange}>
                <i className="fa-regular fa-trash-can" ></i>
                <span>Trash</span>
            </button>

            <button
                name="sent"
                className="side-menu-btn"
                onClick={handleChange}>
                <i className="fa-regular fa-paper-plane"></i>
                <span>Sent</span>
            </button>

            <button
                name="starred"
                className="side-menu-btn"
                onClick={handleChange}>
                <i className="fa-regular fa-star"></i>
                <span>Starred</span>
            </button>

        </React.Fragment>
    )
}