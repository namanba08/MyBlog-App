import { useState, useEffect, useContext } from "react";
import {Link} from "react-router-dom"
import { UserContext } from "../userContext";

function Header(){
    const {setUserInfo, userInfo} = useContext(UserContext)

    useEffect(() => {
        fetch('http://localhost:4000/profile',{
            credentials: 'include',
        }).then(
             
            response => {
            // if(response.json().username) 
                response.json().then(userInfo => {setUserInfo(userInfo)})
            }
        )
    }, [setUserInfo]);

    function logout(){
        fetch('http://localhost:4000/logout',{
            method:'POST',
            credentials: 'include',
        })
        setUserInfo(null)
    }
    const username = userInfo?.username
    return (
        <header>
                <Link to="/" className="logo">MyBlog</Link>

                <nav>
                    {username && (
                        <>
                            
                            <Link to="/create">Create new post</Link>
                            <Link to="/myPosts">My Posts</Link>
                            <Link onClick={logout}>Logout</Link>
                        </>
                    )}
                    {!username && (
                    <>
                    <Link to="/login" className="nav-button" title="login!:)">Login</Link>
                    <Link to="/register" className="nav-button">Register</Link>
                    </>
                    )}
                </nav>
            </header>
    );
}

export default Header;