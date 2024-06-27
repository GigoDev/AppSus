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
            <label htmlFor="txt"></label>
            <input value={txt}
                onChange={handleChange}
                name="txt" type="text"
                id="txt"
                placeholder="Search mail" />

        </form>
    )
}