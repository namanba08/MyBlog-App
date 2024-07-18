import React, { useEffect, useState } from 'react'
import Post from '../components/post.js'
import MyPost from '../components/myPost.js'

export default function MyPostsPage(){

    const [posts, setPosts] = useState([])
    useEffect(() => {
        fetch('http://localhost:4000/myPosts',{
            credentials:'include',
        })
        .then(
            response => {
                response.json().then((posts => {
                    setPosts(posts)
                }))
            })
    },[])
  return (
    <>
        {
            posts.length > 0 && posts.map(post => (
                <MyPost {...post} />
            ))
        }
    </>
  );
}


