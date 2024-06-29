import { utilService } from "../../../services/util.service.js"

const { useState, useEffect, useRef } = React

export function MailFilterTxt({ filterBy, onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    const onSetFilterDebounce = useRef(utilService.debounce(onSetFilter, 700))

    useEffect(() => {
        onSetFilterDebounce.current(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }

    const { txt } = filterByToEdit

    return (
        <form className="mail-search" onSubmit={onSubmitFilter}>
            <label className="search-label" htmlFor="txt">
                <i className="fa-solid fa-magnifying-glass"></i>
                <input value={txt}
                    onChange={handleChange}
                    name="txt"
                    type="text"
                    id="txt"
                    placeholder="Search mail" />

            </label>

        </form>
    )
}