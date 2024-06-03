import "./sidebar.css"

import { useEffect ,useState } from 'react';
import  axios from "axios"; 
import { Link } from 'react-router-dom';
export default function SideBar() {

  const[cats,setCat] = useState([]);
  // cats -- Array state varibale 
  // set cat -- function 
  // initially empty array 
  useEffect( () =>{
       const getCats = async() =>{
        const res = await axios.get("http://localhost:5000/api/categories/");
        setCat(res.data);
      //  console.log(cats);
       }
       getCats();
  },[]);
  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>
        <img
          src="https://img.freepik.com/free-vector/illustration-people-working-office_23-2148251208.jpg?t=st=1715160881~exp=1715164481~hmac=fdea7716f5c91f4887b9f9a0dc09ab50c6395ce9c3508d92e4c49b24ddd843f0&w=740"
          alt=""
        />
        <p>
         
As a blogger, I strive to create engaging and informative content that resonates with my audience.
 Through my writing, I aim to share valuable insights, spark meaningful discussions,
 and inspire others to explore new ideas and perspectives. With each blog post, I endeavor to
  connect with readers on a personal level, 
fostering a sense of community and collaboration in the online sphere.
        </p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList">
         
          {cats.map((c)=>(
               <Link to ={`/?cat=${c.name}`} className="link">  
                    <li className="sidebarListItem">{c.name}</li>
                </Link>
             
          ))}
          
          
        </ul>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US</span>
        <div className="sidebarSocial">
          <i className="sidebarIcon fab fa-facebook-square"></i>
          <i className="sidebarIcon fab fa-instagram-square"></i>
          <i className="sidebarIcon fab fa-pinterest-square"></i>
          <i className="sidebarIcon fab fa-twitter-square"></i>
        </div>
      </div>
    </div>
  )
}

