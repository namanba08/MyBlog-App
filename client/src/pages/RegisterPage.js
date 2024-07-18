import { useState } from "react";
import { Navigate } from "react-router-dom";

export default function RegisterPage(){
    
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    

    async function register(ev){
        // console.log('Before fetch');
        ev.preventDefault();
        const response = await fetch('http://localhost:4000/register',{
            method: 'POST',
            body: JSON.stringify({username,password}),
            headers: {'Content-Type':'application/json'},
        })
        if(response.status !== 200){
            alert("registration failed")
        }else{
            alert("Registration Success!")
        }
        <Navigate to={'/'}/>
        
        // console.log('After fetch');
        
    }
    
    return (
        <form className="register" onSubmit={register}>
            <h1 className="nav-button">Register</h1>
            
            <input type="text" 
            placeholder="Username" 
            value={username} 
            onChange={ev => setUsername(ev.target.value)}/>
            
            <input type="password" 
            placeholder="Password" 
            value={password}
            onChange={ev => setPassword(ev.target.value)}/>
            
            <button type="submit">Register</button>
            
        </form>
    );
}