import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../userContext";

export default function LoginPage(){

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [redirect, setRedirect] = useState(false)
    const {setUserInfo} = useContext(UserContext)
    
    async function login(ev){
        ev.preventDefault();

        const response = await fetch('http://localhost:4000/login',{
            method:'POST',
            body: JSON.stringify({username,password}),
            headers:{'Content-Type':'application/json'},
            credentials: 'include'
        })
        if(response.ok){
            // if login successful, then redirect to home page
            response.json().then(userInfo => {
                setUserInfo(userInfo)
                setRedirect(true)
            })
        }else{
            alert("wrong credentials")
        }
    }
    if(redirect){
        return <Navigate to={'/'}/>
    }
    return (
        <form className="login" onSubmit={login} action="">
            <h1 className="nav-button">Login</h1>
            
            <input type="text" 
            placeholder="Username" 
            value={username}
            onChange={ev => setUsername(ev.target.value)} />
            
            <input type="password" 
            placeholder="Password" 
            value={password}
            onChange={ev => setPassword(ev.target.value)}/>
            <button type="submit">Login</button>
        </form>
    );
}