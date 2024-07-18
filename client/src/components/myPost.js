// import {formatISO9075} from "date-fns"
import { format, formatDistance, formatRelative, subDays } from 'date-fns'
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';


export default function MyPost({_id, title,summary,cover,content,createdAt,author}){
    const postDate = format(new Date(createdAt), "MM/dd/yyyy");

    // const [coverHeight, setCoverHeight] = useState(0);
    // const summaryRef = useRef(null);
  
    // useEffect(() => {
    //   if (summaryRef.current) {
    //     const imageHeight = summaryRef.current.previousSibling.clientHeight;
    //     setCoverHeight(imageHeight);
    //   }
    // }, []);
    
    return (
        <div className="post">
                <div className="image">
                    <Link to={`/post/${_id}`}>
                        <img src={'http://localhost:4000/'+cover}/>
                    </Link>
                </div>

                <div className="texts">
                    <Link to={`/post/${_id}`}>
                        <h2>{title}</h2>
                    </Link>
                <p className="info">
                    <a className="author">{author.username}</a>
                    <time>{format(new Date(createdAt),'d MMM y, HH:mm')}</time>
                    <Link to={`/edit/${_id}`}><span>Edit Post</span></Link>
                </p>
                    {/* <time>{createdAt}</time> */}
                    {/* <ReactTimeAgo date={createdAt} /> */}
                    {/* <time>postDate</time> */}
                <p className="summary">{summary}</p>
                </div>
            
            </div>
    );
} 