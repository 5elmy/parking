


import { NatOutlined } from "@mui/icons-material";
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Radio, RadioGroup, Spinner, useDisclosure } from "@nextui-org/react";
import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { notify } from "../../utils/OnSuccess/notify";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import CarsNumber from "../CarsNumber/CarsNumber";
import AutoComplete from "../../utils/AutoComplete/AutoComplete";
import useScanDetection from "use-scan-detection-react18";



export function CarOut() {
  const [selected, setSelected] = React.useState("");
  let [car_plate,setCar_plate] = useState('')
  const [carPlate, setCarPlate] = useState('');
 let [Loading , setLoading] = useState(false)
 let [slotsNumberBlocked, SetSlotsNumberBlocked] = useState(0)
 let [slotsNumberFree, SetSlotsNumberFree] = useState(0)
 const [value, setValue] = React.useState("");
 const [isLoading, setIsLoading] = useState(false);

const [barcodeScan, setbarcodeScan] = useState("No BarCode Scanner...")
useScanDetection({
  onComplete: (code) => { console.log(code);  setbarcodeScan(code)},
  minLength:4  
});

 let navigate = useNavigate()
let Block = [];
let Free = [];
const { isOpen, onOpen, onOpenChange } = useDisclosure();
let [cars,setCars]= useState([])
  let [data,setData] = useState({})
  let getAllCarsInPArking= async()=>{
    // 
    await axios.get(`http://128.16.66.98:9090/api/CarTransactions/carsIn`).then(res=>{
      console.log({"AllCars":res.data});
      setCars(res.data)
    }).catch(err=>{
      console.log(err);
    })
  }
  let getSpecificData = async(id)=>{
    await axios.get(`http://128.16.66.98:9090/api/CarTransactions/${id}`).then(res=>{
      console.log(res.data);
      setData(res.data)
      onOpen();
    }).catch(err=>{
      console.log(err);
    })
  }
console.log(data);

if(slotsNumberBlocked>0){
  for (let i = 1; i <= slotsNumberBlocked; i++) {
    Block.push(i);
  }
  console.log(Block);
}
if(slotsNumberFree>0){
  for (let i = 1; i <= slotsNumberFree; i++) {
    Free.push(i);
  }
}
let addCar = useFormik({
  initialValues:{
      id: "",
      user_id: localStorage.getItem("userId")
  },
  onSubmit:async(values)=>{
    values.id = barcodeScan
    console.log({values});
    setLoading(true)
    await axios.put(`http://128.16.66.98:9090/api/CarTransactions/car/${values.id}`).then(res=>{
      setData(res.data)
       handlePrint(res.data)
      setLoading(false)
      getAllConfig()
    // getSpecificData(values.car_plate)
    onOpen();
  
      if(res.status){
        notify({msg:"تم خروج السيارة بنجاح", type:"success" })
        setLoading(false)
        getAllConfig() 
      }
    }).catch(err=>{
      console.log(err);
      setLoading(false);
    })
  }
})

const handlePrint = (receipt) => {
  moment.locale('ar');
  const content = `
    <div style="text-align: center; margin-bottom: 10px;  font-weight: bold;">
      <p>----مركز تأهيل العجوزة ق.م ----</p>
      <p> خروج</p>
      <p> ${receipt.id}</p>
      <p>رقم السيارة : ${receipt.car_plate}</p>
      <p>سبب الدخول:${receipt.type_of_entrance}+ سيارة</p>
   
      <p> المدفوعات: ${receipt.payment}</p>
    
      <p>-----------شكراً لكم--------------</p>
      <p>  ${moment(receipt.departure_time).format('MMMM Do YYYY, h:mm:ss a')}</p>
      <br/>
      <p> </p>
      <p> .</p>
    </div>
  `;


  
  // Create a hidden iframe
  const iframe = document.createElement('iframe');
  iframe.style.display = 'none';
  document.body.appendChild(iframe);

  // Write content to the iframe
  const iframeDoc = iframe.contentWindow.document;
  iframeDoc.open();
  iframeDoc.write(content);
  iframeDoc.close();

  // Call the print function
  iframe.contentWindow.print();

  // Remove the iframe after printing
  setTimeout(() => {
    document.body.removeChild(iframe);
  }, 1000); // You can adjust the delay as needed
};


let getAllConfig =async()=>{
  await axios.get(`http://128.16.66.98:9090/api/configs`).then(res=>{
    SetSlotsNumberBlocked(res?.data[0].busy_slots)
    SetSlotsNumberFree(res.data[0].free_slots)
    getAllCarsInPArking()
  }).then(err=>{
    console.log(err);
  })
}





useEffect(()=>{


     
    

},[barcodeScan])
useEffect(()=>{


     getAllConfig()
     getAllCarsInPArking()
    

},[])




  return (<>
  
  <div className="">
      <form action="" onSubmit={addCar.handleSubmit}>
      <div className="grid grid-cols-12 bg-[#e2e8f0] ">
        <div className="col-span-4  flex justify-center items-center h-[100vh]  ">

            <div className=" bg-white w-[90%]  flex justify-center items-center rounded-[20px] shadow-2xl">
            <div className="w-full px-3  py-5">
              <div className=" flex justify-between items-center gap-3 ">
                <div><p className="text-center">  عدد الاماكن الممتلئة</p> <p className="text-center"> {slotsNumberBlocked}</p> </div>
                <div><p className="text-center"> عدد الاماكن الفارغة</p><p className="text-center"> {slotsNumberFree}</p></div>
              </div>
              <p className="text-center my-3">ادخل البيانات</p>
              <p className="text-center my-3">{barcodeScan}</p>
            {/* <Input className="my-3" onChange={addCar.handleChange} onBlur={addCar.handleBlur} name="car_plate"  classNames={{
              base:"bg-[#fff]"
            }} placeholder="رقم السيارة"/>
             */}
             {/* <div className="flex gap-3 items-center justify-center"><CarsNumber setCar_plate={setCar_plate}/> <span className="text-gray-500 pt-4">رقم السيارة</span></div> */}
             {/* <AutoComplete cars={cars} setValue={setValue}  value={value}/> */}
           <div className="flex justify-center items-center py-3">
           </div>
          <div className="flex justify-center items-center mt-[20px]">
          <Button onClick={()=>{
          }} type="submit"  className="bg-[#60a5fa] md:w-[200px] text-white" >  {isLoading ?  <Spinner color="current" className="w-[30px] h-[30px]" /> :"خروج السيارة"} </Button>
          </div>
    <div className="flex justify-between item-center"> 
    <Button onClick={()=>{navigate("/user/type")}} className="bg-blue-500 text-white">الصفحة الرئيسية</Button>

    <Button onClick={()=>{navigate("/home")}} className="bg-blue-500 text-white">صفحةالدخول</Button>
    </div>
            </div>
            </div>
        </div>
       <div className="col-span-8 py-10 "> 
    
       <div className="">
          <div className="flex justify-end items-center  px-5">
          <Button className="bg-red-500 text-white" onClick={()=>{
              localStorage.removeItem("userId")
              navigate("/")
            }}>خروج</Button>
            </div>
       
              <div className=" flex justify-between items-center gap-3  mt-3  px-14 ">
                <div><p className="text-center">  عدد الاماكن الممتلئة</p> <p className="text-center"> {slotsNumberBlocked}</p> </div>
                <div><p className="text-center"> عدد الاماكن الفارغة</p><p className="text-center"> {slotsNumberFree}</p></div>
              </div>
          <div className=" p-2 grid grid-cols-12 gap-2 mt-1">
          {Block?.map((ele ,index)=>{
            return (<>
            
            <div  key={ele.id} className="col-span-1 bg-red-500 h-[50px] flex justify-center items-center text-white">{index+1}</div>
            
            </>)
          })}
          {Free.map((ele ,index)=>{
            return (<>
            
            <div  key={ele.id} className="col-span-1 bg-green-500 h-[50px] flex justify-center items-center text-white">{slotsNumberBlocked+index+1}</div>
            
            </>)
          })}


          </div>
        </div>
        
        </div>
    </div>


      </form>

   
  </div>
<div className="modal">
<Modal isOpen={isOpen} onOpenChange={onOpenChange} shouldCloseOnOverlayClick={false}>
  <ModalContent>
    {(onClose) => (
      <>
        <ModalHeader className="flex flex-col gap-1">Invoice</ModalHeader>
        <ModalBody>
          <div className=" flex flex-col gap-3">
            <label>Car Number</label>
            <Input disabled defaultValue={data.car_plate} placeholder="Car Number" endContent={<span></span>} />
            {/* <label>Number of Hours</label> 

                    <Input disabled  placeholder=" number of hours" endContent={<>
                    <span>hours</span>
                    </>}/> */}
            <label>Price</label>
            <Input disabled defaultValue={data.payment} placeholder="Total price" endContent={<span>pounds</span>} />
          </div>
          <label className="text-blue">Arrival time</label>
          <Input disabled defaultValue={moment(data.arrival_time).format('MMMM Do YYYY, h:mm:ss a')} placeholder="Entrance Date" />
          <label className="text-blue">Departure time</label>
          <Input disabled defaultValue={moment(data.departure_time).format('MMMM Do YYYY, h:mm:ss a')} placeholder="Exit Date" />
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={onClose}>
            Close
          </Button>
        </ModalFooter>
      </>
    )}
  </ModalContent>
</Modal>
</div>

 
  
  </>);
}


 