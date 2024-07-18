import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function PostPage(){
    const [postDoc,setPostDoc] = useState(null)
    const {id} = useParams()
    
    useEffect(() => {
        fetch(`http://localhost:4000/post/${id}`).then(response =>
        response.json().then(info => 
            setPostDoc(info)
        ))
    },[])
    if(!postDoc) return ''
    return(
        <>
        <h2>{postDoc?.title}</h2>
        <div className="image">
            <img src={`http://localhost:4000/${postDoc.cover}`} alt="" />
        </div>
        <div dangerouslySetInnerHTML={{__html:postDoc.content}} />
        </>
    );
}