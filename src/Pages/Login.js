import {useState, useContext} from 'react'
import {UserContext} from '../Context/UserContext'
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import '../Styles/LoginRegisterForm.css'

const Login = () => {
    const {userState} = useContext(UserContext)
    const [user,setUser] = userState
    
    // form input states 
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [showError, setShowError] = useState(false)
    
    const loginSubmit = async (e) => {
        e.preventDefault()
        try {
            let res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/login`, {
                email: email,
                password: password,
                
            })
            localStorage.setItem('userId', res.data.encryptedId)
            setUser(res.data.user)
        } catch (error) {
            setShowError(true)
        }
    }

    return (
        <div className="loginPage">
            <div className="loginPicContainer">
                <img className="loginPicture" src="https://i.imgur.com/vu48Uxp.jpg" />
            </div>
            <div className="loginFormContainer">
                <img className="loginPageLogo" src="https://i.imgur.com/93RgaYU.jpg"/>
                <h1>Login</h1>
                <form className="loginForm" onSubmit={loginSubmit}>
                    { showError &&
                        <label className="loginError">Invalid Username or Password</label>
                    }
                    <input className="loginFormInput" type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input className="loginFormInput" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <div className="loginFormDiv">
                        <span className="forgotPassword">Forgot Password?</span>
                        <span className="loginFormLink">Don't have an account? Sign Up</span>
                    </div>
                    <input className="loginFormButton" type="submit" value="Log In" />
                </form>
            </div>
            
        </div>
    )
}

export default Login 