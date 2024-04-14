import React, { useEffect } from 'react'
import { RouterProvider, createBrowserRouter, createHashRouter} from 'react-router-dom'
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { Login } from './Components/Login/Login'
import { Home } from './Components/Home/Home'
import { Dashboard } from './Components/Dashboard/Dashboard'
import { SideNav } from './Components/Dashboard/SideNav'
import { DashboardBody } from './Components/Dashboard/DashboardBody'
import { AddUser } from './Components/AddUser/AddUser.jsx'



import { Main } from './Components/Main/Main.jsx'
import ExitCar from './utils/OnSuccess/ExitCar.jsx';
import { AddSlots } from './Components/AddSlots/AddSlots.jsx';
import Userschedule from './Components/Userschedule/Userschedule.jsx';
import Carsschedule from './Components/Carsschedule/Carsschedule.jsx';
import { DefaultUser } from './Components/defaultUsers/defaultUser.jsx';
import { DefaultUser2 } from './Components/defaultUsers/defaultuser2.jsx';
import { Patient } from './Components/patients/patient.jsx';
import { Provider } from 'react-redux';
import store from './Redux/Store.js';
import { CarOut } from './Components/Home/CarOut.jsx';
import AddPersons from './Components/AddPersons/AddPersons.jsx';
import Camera from './Components/Camera/Camera.jsx';
import Revenueschedule from './Components/Revenueschedule/Revenueschedule.jsx';
import { ExcelFile } from './utils/ExcelFile.jsx';

import CameraOCR from './Components/Test/Test.jsx';
import PrinterComponent, { PrinterTest } from './Components/printertest/PrinterTest.jsx';
import Bar, { USBComponent }from './Components/printertest/PrinterTest.jsx';
import {ThermalPrinterComponent }from './Components/printertest/printPaper.jsx';

import MyComponent from './Components/Barcode/BarcodeSupportArabic';









export default function App() {

  const router = createHashRouter([
   {path:"", element:<Main/> ,children:[
    {index:true ,  element:<Login/>},
    {path:"/print" ,  element:<Bar/>},
    {path:"/pri" ,  element:<ThermalPrinterComponent/>},
    {path:"/p" ,  element:<MyComponent/>},

    {path:"/home" ,  element:<Home/>},
    {path:"/exitCar" ,  element:<CarOut/>},
    {path:"/excel" ,  element:<ExcelFile/>},
    {path:"/user/type" ,  element:<DefaultUser/>},
    // {path:"/user/type/spesific" ,  element:<DefaultUser2/>},
    {path:"/user/type/spesific" ,  element:<Patient/>},
    {path:"/home/exitcar/payment" ,  element:<ExitCar/>},
    
    {path:"/file" ,  element:<CameraOCR/>},
    {path:"/camera" ,  element:<Camera/>},
    
    {path:"/" ,  element:<Dashboard/> ,children:[
      {path:"sidenav" ,  element:<SideNav/>},
    // {path:"dashboard" ,  element:<DashboardBody/>},
    {path:"addUser" ,  element:<AddUser/>},
    {path:"revenueschedule" ,  element:<Revenueschedule/>},
    {path:"carsschedule" ,  element:<Carsschedule/>},
    {path:"userschedule" ,  element:<Userschedule/>},
    {path:"addSlots" ,  element:<AddSlots/>},
    {path:"addPersons" ,  element:<AddPersons/>},

  ]},  
   ]}
  ])

   useEffect(()=>{
    if(!localStorage.getItem("theme") ){
      localStorage.setItem("theme","light")
    }
   },[])
  return (
    <>
   <Provider store={store}>
   <ToastContainer  theme='colored'/>
   <RouterProvider router={router} />
   
   </Provider>

    </>
  )
}
