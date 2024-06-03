import  axios from "axios";
import "./singlePost.css"
import { useLocation } from 'react-router-dom';
import { Context } from "../../context/Context";
import { useContext } from "react";
import { useEffect ,useState } from 'react';

import { Link } from 'react-router-dom';
export default function SinglePost() {
  const { user } = useContext(Context);
  const [title,setTitle] = useState("");
  const [desc,setDesc] = useState("");
  const [updateMode,setupdateMode] = useState(false);

  const location = useLocation();
  const path = location.pathname.split("/")[2];  // id post id
  const[post,setPost] = useState({}) // empty object 
  useEffect(() =>{
    const getPost = async() =>{
      const res = await axios.get("http://localhost:5000/api/post/" + path);
      console.log(res);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
    }
    getPost();
  },[path]);

  const PF = "http://localhost:5000/images/";

  const handelDelete = async ()=>{
    try{
      await axios.delete(`http://localhost:5000/api/post/${post._id}`,{data : {username:user.username}});
      window.location.replace("http://localhost:5000/api/");
    } catch(err){
        console.log(err);
    }
  }

  const handleUpdate = async() =>{
    try{
      await axios.put(`http://localhost:5000/api/post/${post._id}`, {
        username:user.username,
        title,
        desc}
      );
      window.location.replace("/");
      updateMode(false);
    } catch(err){
        console.log(err);
    }
  }

  return (
    <div className="singlePost">
    <div className="singlePostWrapper">
      {post.photo && 
      <img
        className="singlePostImg"
        src={PF+post.photo} 
        alt=""
      /> } {
        updateMode ? (<input type="text" 
        value = {title} 
        className="singlePostTitleInput" 
        autoFocus 
         onChange={(e)=>setTitle(e.target.value)}/> ) : (
     
      <h1 className="singlePostTitle">
        {title} 
        {post.username === user?.username && (<div className="singlePostEdit">
         <i className ="singlePostIcon fa-solid fa-pen-to-square" onClick={()=>setupdateMode(true)}></i>
         <i className="singlePostIcon  fa-solid fa-trash" onClick={handelDelete}></i>
        </div>)}
       
      </h1>) 
       } 
      <div className="singlePostInfo">
          <span className="singlePostAuthor">
          Author:
            <Link to ={`/?user=${post.username}`} className="link">
              {post.username}
              </Link>
          </span>
        <span>{new Date(post.createdAt).toDateString()}</span>
      </div>
      {updateMode ? (<textarea className="singlePostDescInput" value = {desc} onChange={(e)=>setDesc(e.target.value)}/>) :(
      <p className="singlePostDesc">
         {desc} 
      </p> ) }
      {updateMode && (
        <button className="singlepostButton" onClick={handleUpdate}>
        Update
    </button>
      )}
      
    </div>
  </div>
  )
}
