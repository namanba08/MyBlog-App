// import {formatISO9075} from "date-fns"
import { format, formatDistance, formatRelative, subDays } from 'date-fns'
import React from 'react';
import { Link } from 'react-router-dom';
import ReactTimeAgo from 'react-time-ago'


export default function Post({_id, title,summary,cover,content,createdAt,author}){
    // const postDate = format(new Date(createdAt), "MM/dd/yyyy");

    
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
                    <a href='/' className="author">{author.username}</a>
                    {/* <time>{createdAt}</time> */}
                    {/* <ReactTimeAgo date={createdAt} /> */}
                    <time>{format(new Date(createdAt),'d MMM y, HH:mm')}</time>
                    {/* <time>postDate</time> */}
                </p>
                <p className="summary">{summary}</p>
                </div>
            
            </div>
    );
} 