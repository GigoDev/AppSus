const { Link, useNavigate } = ReactRouterDOM


export function SideMenu() {
    const navigate = useNavigate()

    return (

        <React.Fragment>
            <div className="gmail-logo"><img src="assets/img/Gmail_icon.png" /></div>
            <section className="folders-container">

            <Link to="/mail/compose/" className="compose-btn"><i className="fa-solid fa-pencil"></i>Compose</Link>

                <button className="side-menu-btn" onClick={() => navigate(`/mail/inbox`)}>
                    <i className="fa-solid fa-inbox"></i>
                    <span>Inbox</span>
                </button>
                <button className="side-menu-btn" onClick={() => navigate(`/mail/trash`)}>
                    <i className="fa-regular fa-trash-can" ></i>
                    <span>Trash</span>
                </button>
                <button className="side-menu-btn" onClick={() => navigate(`/mail/sent`)}>
                    <i className="fa-regular fa-paper-plane"></i>
                    <span>Sent</span>
                </button>
                <button className="side-menu-btn" onClick={() => navigate(`/mail/starred`)}>
                    <i className="fa-regular fa-star"></i>
                    <span>Starred</span>
                </button>
            </section>
            </React.Fragment>
    )
}