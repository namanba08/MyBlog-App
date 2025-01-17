import { useEffect, useState } from "react";
import Post from "../components/post";

export default function IndexPage(){
    const [posts, setPosts] = useState([])
    useEffect(() => {
        //fetch(url,function)

        fetch('http://localhost:4000/post').then(response => {
            response.json().then((posts => {
                // console.log(posts)
                setPosts(posts)
            }))
        })
    },[])
    return (
    <>
        {posts.length > 0 && posts.map(post =>(
            <Post {...post}/>
        ))
        }
        
    </>
    );
}