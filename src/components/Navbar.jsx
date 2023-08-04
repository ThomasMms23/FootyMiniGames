import { Link } from "react-router-dom";
import "./navbar";

export default function Navbar() {
    return (
        <nav className="navigation">
            <div className="nav-link">
                <Link className="link" to="/">
                    Accueil
                </Link>
                <Link className="link" to="/Flagrank">
                    Guess The Rank
                </Link>
            </div>
        </nav>
    );
}
