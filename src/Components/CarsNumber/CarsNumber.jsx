import React, { useContext, useEffect, useRef, useState } from 'react'







export default function CarsNumber({setCar_plate}) {



const [inputs,setInputs]=useState(['','','','','',''])

const inputRefs = [useRef(),useRef(),useRef(),useRef(),useRef(),useRef()]

const handleInputChange = (index,value)=>{
  setInputs(prevInputs=>{
    const newInputs = [...prevInputs];
    newInputs[index] = value;
    return newInputs
  })
}
const handleSendOtp = (index,value)=>{
  if(value.length === 1 && index < inputRefs.length - 1)
  {
    inputRefs[index+1].current.focus()
  }
  if (index === inputRefs.length - 1 && value !== '') {
    let data = inputs.join(' ')
    console.log(data);
     setCar_plate(data)
    // let verificationCode =data
    //  console.log(verificationCode);
    
    // VerifyOtp({data:{verificationCode},navigate})
  } 
  if(value.length === 0 && index <= inputRefs.length - 1)
  {
    inputRefs[index-1].current.focus()
  }
}


  return (
<>
 


  
   
      <div className=" ">
          <form action="" >
        <div style={{
        }} className=' flex flex-col  justify-between   '>
             <div className='flex justify-center items-center  '>
                {inputs.map((value,index)=>{
       return <input dir='rtl'
          className="border-b-2 mx-2 w-[40px] text-center"
          key={index}
          ref={inputRefs[index]}
          value={value}
          maxLength={1}
          onChange={(e)=>handleInputChange(index,e.target.value)}
          onKeyUp={(e)=>handleSendOtp(index,e.target.value)}
        />
      })}
                </div>
         
           
           
        </div>
          </form>
      </div>
   

    
   
    </>
  )
}
