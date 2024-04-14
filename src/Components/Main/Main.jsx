import React, { useEffect } from 'react'
import { Outlet, useNavigate } from "react-router-dom";
export function Main() {
  let navigate = useNavigate()
  useEffect(()=>{
    if(!localStorage.getItem("userId")){
      navigate("/")
    }
  },[])
  return (<>
  <Outlet/>
  
  
  </>);
}
