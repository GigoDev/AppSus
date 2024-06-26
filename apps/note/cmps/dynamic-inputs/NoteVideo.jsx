export function NoteVideo({ videoId }) {
    <div className="video-container"> 
        <iframe
        width="100px"
        height="350px"
        src={`https://www.youtube.com/embed/${videoId}`}
        frameBorder="0"
        > </iframe>
    </div>
}