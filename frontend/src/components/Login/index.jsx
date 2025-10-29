import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Login = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [status, setStatus] = useState(false)

    const formSubmitted = async event => {
        event.preventDefault()
        setStatus(false)
        const url = 'https://apis.ccbp.in/login'
        const userDetails = { username, password }
        const options = { method: 'POST', body: JSON.stringify(userDetails) }

        try {
            const response = await fetch(url, options)
            const loginData = await response.json()
            if (response.ok) {
                const jwtToken = loginData.jwt_token
                Cookies.set('jwt_token', jwtToken, { expires: 30 })
                navigate('/', { replace: true })
            } else {
                setError(loginData.error_msg)
                setStatus(true)
            }
        } catch (e) {
            setError('Something went wrong. Try again later.')
            setStatus(true)
        }
    }

    return (
        <div className="login-main-container">
            <div className="login-container">
                <div className="logo-container">
                    <img
                        src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
                        alt="website logo"
                    />
                </div>
                <form className="login-form" onSubmit={formSubmitted}>
                    <div className="username-container">
                        <label htmlFor="username" className="username-label">
                            USERNAME
                        </label>
                        <input
                            type="text"
                            id="username"
                            placeholder="rahul"
                            className="username-input input-box"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="password-container">
                        <label htmlFor="password" className="password-label">
                            PASSWORD
                        </label>
                        <input
                            type="password"
                            placeholder="rahul@2021"
                            id="password"
                            className="password-input input-box"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="login-btn btn">
                        Login
                    </button>
                    <p className="error-msg">{status ? `*${error}` : ''}</p>
                </form>
            </div>
        </div>
    )
}

export default Login
