import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Navbar = () => {
    const navigate = useNavigate()

    const logout = () => {
        Cookies.remove('jwt_token')
        navigate('/login', { replace: true })
    }

    return (
        <div className="main-navbar-container">
            <div className="navbar-container">
                <div className="navbar-logo-container">
                    <Link to="/">
                        <img
                            className="logo-img"
                            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
                            alt="website logo"
                        />
                    </Link>
                </div>
                <ul className="navbar-link-lists">
                    <li className="navbar-link">
                        <Link to="/" className='link'>Home</Link>
                    </li>
                    <li className="navbar-link">
                        <Link className='link' to="/jobs">Jobs</Link>
                    </li>
                </ul>
                <button className="logout-btn btn" type="button" onClick={logout}>
                    Logout
                </button>
            </div>
        </div>
    )
}

export default Navbar
