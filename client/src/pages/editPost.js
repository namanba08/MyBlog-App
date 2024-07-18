import { useEffect, useState } from "react";
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css'
import { Navigate, useLocation, useParams } from "react-router-dom";


const modules = {
    toolbar: [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],
        ['link', 'image', 'video', 'formula'],
      
        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
        [{ 'direction': 'rtl' }],                         // text direction
      
        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      
        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'font': [] }],
        [{ 'align': [] }],
      
        ['clean']                                         // remove formatting button
      ]
}



const EditPost = () => {
    const location = useLocation()
    useEffect(() => {
        fetch(`http://localhost:4000/edit/${id}`).then((response) =>
          response.json().then((post) => {
            setPostDoc(post);
            setNewTitle(postDoc?.title)
            setNewSummary(postDoc?.summary)
            console.log(post);
          })
        );
    },[])
    const [content,setContent] = useState('')
    const [newTitle,setNewTitle] = useState('')
    const [newSummary, setNewSummary] = useState('')
    const [newContent, setNewContent] = useState('')
    const [postDoc,setPostDoc] = useState(null)
    const time = new Date()

    // useParams()
    const {id} = useParams()
    
    async function editPost(ev){
    }
    return (
    <div>
      <form onSubmit={editPost}>
        <input
          type="title"
          placeholder="Title"
          value={newTitle}
          onInput={ev => setNewTitle(ev.target.value)}
          
        />

        <textarea
          type="summary"
          placeholder="Summary"
          value={newSummary}
          onChange={ev => setNewSummary(ev.target.value)}
          rows={6}
          cols={84}
          color="blue"
          
        />
        <span><label htmlFor="cover">Choose your cover photo:</label></span>
        <input type="file"  id="cover"/>

        <ReactQuill
          value={content}
          modules={modules}
          onChange={(newValue) => setContent(newValue)}
        />

        <button style={{ marginTop: "5px" }}>confirm edit</button>
      </form>
    </div>
  );
};

export default EditPost;
