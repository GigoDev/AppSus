const { Link } = ReactRouterDOM


export function Home() {
    return (
        <section className="home">

            <div className="home-container">

                <Link to="note" class="home-card">
                    <img src="../assets/img/Keep_icon.png" />
                    <h4><b>Google Keep</b></h4>
                    <p>Keep calm and carry on </p>
                </Link>

                <Link to="/mail" class="home-card">
                    <img src="../assets/img/Gmail_icon.png" />
                    <h4><b>Gmail</b></h4>
                    <p>Ignoring your credit bills made easy </p>
                </Link>
            </div>
        </section>
    )
}
