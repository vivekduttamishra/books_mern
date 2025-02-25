import Membership from "../../users/components/Membership";
import {Link} from 'react-router-dom'

const Header = ({ title}) => {

    return (<nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
            <Link className="navbar-brand" to="/">{title}</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link active"  aria-current="page" to="/books">Books</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link"  to="/authors">Authors</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link"  to="/authors/manage">Manage Authors</Link>
                    </li>

                </ul>
                <Membership/>
            </div>
        </div>
    </nav>)
}

export default Header;