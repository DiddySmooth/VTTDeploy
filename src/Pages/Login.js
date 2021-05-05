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
    
    const loginSubmit = async (e) => {
        e.preventDefault()
        
        let res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/login`, {
            email: email,
            password: password,
            
        })
        localStorage.setItem('userId', res.data.encryptedId)
        setUser(res.data.user)
    }

    return (
        <div className="loginContainer">
            <div className="loginFormContainer">
                <h1>Login</h1>
                <form className="loginForm" onSubmit={loginSubmit}>
                    <input className="loginFormInput" type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input className="loginFormInput" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <input className="loginFormButton" type="submit" value="submit" />
                </form>
            </div>
        </div>
    )
}

export default Login 