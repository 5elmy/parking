import { Button, Input, Radio, RadioGroup } from "@nextui-org/react";
import { FormForPricePerHour } from "./formForPriceperHour";
import { FormForVisitPrice } from "./FormForVisitPrice";
import { FormForFine } from "./FormForFine";
import { FormForSlotsNumber } from "./FormForSlotsNumber";
import axios from "axios";
import { useLayoutEffect, useState } from "react";
import logo from "../assests/مركز التاهيل.jpg"
export function AddSlots() {

  let[slots ,setSlots] = useState([])
  async function getSlots() {
    await axios.get(`http://128.16.66.98:9090/api/Configs`).then(res=>{
      console.log(res);
      setSlots(res.data)
    }).catch(err=>{
      console.log(err);
    })
  }
  console.log(slots);
  useLayoutEffect(()=>{
    getSlots()
  },[])
  return (<>
  

<div className="bg-white flex justify-center items-center h-[100vh]">
    <div className="py-5 w-[70%] shadow-2xl  rounded-[20px] px-5">
<div className="flex justify-end items-center">
      <img src={logo} className="w-[90px] h-[90px]" alt="" />
    </div>
        <h1 className="text-center font-sans font-bold text-[50px] my-5 ">Configration</h1>
      {slots?.map((ele , index)=>{
            return(<>
    <label className="text-[20px] font-[500]  px-12 ">Price Per Hour  </label>

            <div className="flex  justify-center items-center">
            <FormForPricePerHour ele={ele}/>
            </div>
    <label className="text-[20px] font-[500] px-12 ">Price Per Visit  </label>

            <div className="flex  justify-center items-center">
              
            <FormForVisitPrice ele={ele}/>

              </div>


              <label className="text-[20px] font-[500]  px-12">Slots Number </label>
            <div className="flex  justify-center items-center">
            <FormForSlotsNumber ele={ele}/>
</div>
<label className="text-[20px] font-[500] px-12">Fine </label>


<div className="flex  justify-center items-center">

            <FormForFine ele={ele}/>
  </div>

            
            </>)
      })}

       
        
        
     
    </div>
  </div>


  
  </>);
}