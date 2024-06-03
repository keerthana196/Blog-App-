import "./single.css"
import SinglePost   from "../../components/singlePost/SinglePost";
import SideBar from "../../components/sidebar/SideBar"

export default function Single() {
  return (
    <div className="single">
        <SinglePost/>
        <SideBar/> 
    </div>
  )
}
