import {Link} from 'react-router-dom';

const Membership = () => {
    return (<ul className="navbar-nav ms-auto ">
        <li className="nav-item dropdown d-flex">
            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Membership
            </a>
            <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to="/user/login">Login</Link></li>
                <li><Link className="dropdown-item" to="/user/register">Register</Link></li>
                <li><Link className="dropdown-item" to="/pricing">Pricing</Link></li>
            </ul>
        </li>
    </ul>)
}

export default Membership;