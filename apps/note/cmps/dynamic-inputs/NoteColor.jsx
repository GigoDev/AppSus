

export function NoteColor({ selectedColor, handleColorChange, onClose }) {
    const colorOptions = [
        '#F44236',
        '#9C27B0',
        '#3F51B5',
        '#2196F3',
        '#4caf50',
        '#101010',]

    return (
        <div className="color-picker-modal">
            <div className="color-picker">
                {colorOptions.map(color => (
                    <button key={color}
                        style={{
                            backgroundColor: color,
                            width: '40px',
                            height: '40px',
                            margin: '10px',
                            borderRadius: '50%',
                            border: color === selectedColor ? '3px solid black' : '1px solid gray',
                            cursor: 'pointer'
                        }}
                        onClick={() => { handleColorChange(color) }} />
                ))}
            </div>
            <button onClick={onClose} className="close-btn">Close</button>
        </div>
    )
}