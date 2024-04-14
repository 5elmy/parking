import React, { useEffect } from "react";
import { Button, Radio, RadioGroup } from "@nextui-org/react";
import { Navigate, useNavigate } from "react-router-dom";



export function DefaultUser2() {
    let navigate  = useNavigate()

 
    return (
        <>
        <div className="h-[100vh]  flex justify-center items-center" >

        <div className="shadow-2xl p-12  rounded-[20px]">
        
        <p className="text-center  py-8 pb-8">Parking  System </p>

        <div className=" flex justify-center items-center gap-8  mb-5">


        <Button className="px-10 py-5 text-white bg-blue-500" onClick={()=>{
            // navigate("/home")

        }}>زيارة</Button>
        <Button onClick={()=>{
            navigate("/user/type/spesific/patient")
        }} className="px-10 py-5 text-white bg-blue-500">كشف</Button>








           



        </div>
        </div>
       </div>

        </>

    );
}
