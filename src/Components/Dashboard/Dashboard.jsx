import { Outlet, useNavigate } from "react-router-dom";
import { DashboardBody } from "./DashboardBody";
import { SideNav } from "./SideNav";
import { useEffect } from "react";
import logo from "../assests/مركز التاهيل.jpg"
export function Dashboard() {
  let navigate = useNavigate()
  useEffect(()=>{
    // if(!localStorage.getItem("userId")){
    //   navigate("/")
    // }
  },[])
  return (<>
  <div className="grid grid-cols-12 h-[100vh]">
    <div className="col-span-2 ">
    <SideNav/>
    </div >
    <div className="col-span-10">
    {/* <DashboardBody/> */}
   
    
      <Outlet/>
    </div>
    
  </div>
  
  </>);
}
