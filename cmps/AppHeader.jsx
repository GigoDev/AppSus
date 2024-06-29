
const { useState } = React
const { Link, NavLink } = ReactRouterDOM

export function AppHeader() {
    const [menuOpen, setMenuOpen] = useState(false);

    function toggleMenu() {
        setMenuOpen(!menuOpen)
    }

    return <header className="app-header">
        <Link to="/">
            <img className="logo" src="./assets/img/logo.svg" />
        </Link>
        <div className={`hamburger-menu ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
        </div>
        <nav className={`nav-links ${menuOpen ? 'open' : ''}`}>
            <NavLink to="/"><span className="icon"><i className="fa-solid fa-house"></i></span></NavLink>
            <NavLink to="/about"><span className="icon"><i className="fa-regular fa-address-card"></i></span></NavLink>
            <NavLink to="/mail"><span className="icon"><i className="fa-regular fa-envelope"></i></span></NavLink>
            <NavLink to="/note"><span className="icon"><i className="fa-regular fa-note-sticky"></i></span></NavLink>
        </nav>
    </header>
}
