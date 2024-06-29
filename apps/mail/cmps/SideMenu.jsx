import { MailFilterFolder } from "./MailFilterFolder.jsx"

const { Link } = ReactRouterDOM

export function SideMenu({ filterBy, onSetFilter,foldersCountMap }) {

    return (

        <React.Fragment>
            <div className="gmail-logo"><img src="assets/img/Gmail_icon.png" /></div>
            <section className="folders-container">

                <Link to="/mail/compose/"
                    className="compose-btn">
                    <i className="fa-solid fa-pencil"></i>Compose</Link>

                <MailFilterFolder
                    filterBy={filterBy}
                    onSetFilter={onSetFilter}
                    foldersCountMap={foldersCountMap}
                />

            </section>
        </React.Fragment>
    )
}