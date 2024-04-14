


import { NatOutlined } from "@mui/icons-material";
import { Button, Input, Radio, RadioGroup, Spinner } from "@nextui-org/react";
import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { notify } from "../../utils/OnSuccess/notify";
import { useNavigate } from "react-router-dom";
import CarsNumber from "../CarsNumber/CarsNumber";
import moment from "moment";
import 'moment/locale/ar'; 
import { BarcodeComponent } from "../Barcode/Barcode";

import ReactDOM from 'react-dom';


export function Home() {
  const [selected, setSelected] = React.useState("");
  let [car_plate,setCar_plate] = useState('')
 let [Loading , setLoading] = useState(false)
 let [slotsNumberBlocked, SetSlotsNumberBlocked] = useState(0)
 let [slotsNumberFree, SetSlotsNumberFree] = useState(0)
 const [printer, setPrinter] = useState(null);
  console.log({slotsNumberBlocked});
  console.log({slotsNumberFree});
  let navigate = useNavigate()
let Block = [];
let Free = [];

if(slotsNumberBlocked>0){
  for (let i = 1; i <= slotsNumberBlocked; i++) {
    Block.push(i);
  }
  console.log({Block});
}
if(slotsNumberFree>0){
  for (let i = 1; i <= slotsNumberFree; i++) {
    Free.push(i);
  }
  console.log({Free});
}

// console.log(arr);

// console.log( localStorage.getItem("userId"));
let validate = (values) => {
  let errors = {}
  if (!values.email) {
    errors.email = 'email is required ';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'invalid email';
  }

  if (!values.password) {
    errors.password = 'password is required ';
  } else if (!/^[a-zA-Z0-9@]{3,30}$/i.test(values.password)) {
    errors.password = 'invalid password ';
  }


  return errors

}

// const handlePrint = (receipt) => {

//   moment.locale('ar');
//   const content = `
//     <div style="text-align: center; margin-bottom: 10px;">
//       <p>----مركز تأهيل العجوزة ق.م ----</p>
//       <p>  رقم الدخول:${receipt.id}</p>
//       <p> </p>
//       <p>رقم السيارة : ${receipt.car_plate}</p>
//       <p>سبب الدخول:${receipt.type_of_entrance}</p>
//       <p>-----------شكراً لكم--------------</p>
//       <p>${moment(receipt.arrival_time).format('MMMM Do YYYY, h:mm:ss a')}</p>
//       <br/>
//       <p> </p>
//       <p> .</p>
//     </div>
//   `;

//   // Create a new window with the content to print
//   const printWindow = window.open('', '_self');
//   printWindow.document.write(content);
//   printWindow.document.close();

//   // Call the print function
//   printWindow.print();
// };


// const handlePrint = (receipt) => {
//   moment.locale('ar');
//   const content = `
//     <div style="text-align: center; margin-bottom: 10px;">
//       <p>----مركز تأهيل العجوزة ق.م ----</p>
//       <p>  رقم الدخول:${receipt.id}</p>
//       <p> </p>
//       <p>رقم السيارة : ${receipt.car_plate}</p>
//       <p>سبب الدخول:${receipt.type_of_entrance}+ سيارة</p>
//       <p>-----------شكراً لكم--------------</p>
//       <p>${moment(receipt.arrival_time).format('MMMM Do YYYY, h:mm:ss a')}</p>
//       <br/>
//       <BarcodeComponent value={receipt.car_plate} />
//       <p> </p>
//       <p> .</p>
//     </div>
//   `;

//   // Create a hidden iframe
//   const iframe = document.createElement('iframe');
//   iframe.style.display = 'none';
//   document.body.appendChild(iframe);

//   // Write content to the iframe
//   const iframeDoc = iframe.contentWindow.document;
//   iframeDoc.open();
//   iframeDoc.write(content);
//   iframeDoc.close();

//   // Call the print function
//   iframe.contentWindow.print();

//   // Remove the iframe after printing
//   setTimeout(() => {
//     document.body.removeChild(iframe);
//   }, 1000); // You can adjust the delay as needed
// };

const handlePrint = (receipt) => {
  moment.locale('ar');
  const content = `
  <div style="text-align: center; margin-bottom: 10px; ">
    <p style = "font-size:16px ; font-weight: bold;">----مركز تأهيل العجوزة ق.م ----</p>
     <p style = "font-size:15px ;">دخول</p>
    <p style = "font-size:16px ;">رقم السيارة : ${receipt.car_plate}</p>
    <p style = "font-size:15px ;">سبب الدخول:${receipt.type_of_entrance}+ سيارة</p>
    <div id="barcode"></div> <!-- Container for the BarcodeComponent -->
    <p style = "font-size:16px ; font-weight: bold;">--------شكراً لكم----------</p>
    <p style = "font-size:14px ;">${moment(receipt.arrival_time).format('MMMM Do YYYY, h:mm:ss a')}</p>
    <br/>
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

  // Render the BarcodeComponent inside the container in the iframe
  ReactDOM.render(
    <BarcodeComponent value={receipt.id} />,
    iframeDoc.getElementById('barcode')
  );

  // Call the print function
  iframe.contentWindow.print();

  // Remove the iframe after printing
  setTimeout(() => {
    document.body.removeChild(iframe);
  }, 1000); // You can adjust the delay as needed
};




let addCar = useFormik({
  initialValues:{
    car_plate: "",
      owner_name: "",
      owner_phone: "",
      type_of_entrance: "",
      user_id: localStorage.getItem("userId")
  },
  onSubmit:async(values)=>{
    values.type_of_entrance= selected
    values.car_plate=car_plate
    console.log(values);
    setLoading(true)
    await axios.post(`http://128.16.66.98:9090/api/CarTransactions`,values).then(res=>{
      console.log(res);
      if(res.status==201 ){
        notify({msg:"تم اضافة السيارة بنجاح", type:"success" })
        setLoading(false)
           handlePrint(res.data)
      
        getAllConfig()
        // GenerateEscPosCommand2(values)
     
      }
      

    }).catch(err=>{
      console.log(err);
      setLoading(false)

    })


  }
})

// let getAllCars =async()=>{
//   await axios.get(`http://128.16.66.98:9090/api/CarTransactions`).then(res=>{
//     console.log(res.data);
//     SetSlotsNumberBlocked(res?.data)

//   }).then(err=>{
//     console.log(err);
//   })
// }
let getAllConfig =async()=>{
  await axios.get(`http://128.16.66.98:9090/api/configs`).then(res=>{
    console.log(res.data);
    SetSlotsNumberBlocked(res?.data[0].busy_slots)
    SetSlotsNumberFree(res?.data[0].free_slots)
  }).catch(err=>{
    console.log(err);
    
  })
}

const connectToPrinter = async () => {
  console.log( await navigator.usb.requestDevice())
  try {
    alert("connected printer")
    const usbDevice = await navigator.usb.requestDevice();
    console.log({usbDevice});
    await usbDevice.open();
    await usbDevice.selectConfiguration(1);
    await usbDevice.claimInterface(0);
    setPrinter(usbDevice);
    console.log('Printer connected:', usbDevice);
  } catch (error) {
    console.log('Error connecting to printer:', error);
  }
};
// useEffect(()=>{
//   // if ('usb' in navigator) {
//   //   // alert("usb")
//   //   navigator.usb.requestDevice({ filters: [{ vendorId: 0x1504 }] })
//   //     .then(selectedPrinter => {
//   //       console.log(selectedPrinter);
//   //       setPrinter(selectedPrinter);
//   //     })
//   //     .catch(error => {
//   //       console.log('Error selecting printer:', error);
//   //     });
//   // } else {
//   //   console.log('WebUSB not supported in this browser');
//   // }
//   connectToPrinter()
// },[printer])
// useEffect(() => {
//   const connectToPrinter = async () => {
//     try {
//       const usbDevice = await navigator.usb.requestDevice({ filters: [{ vendorId: 0x1504 }] });
//       await usbDevice.open();
//       await usbDevice.selectConfiguration(1);
//       await usbDevice.claimInterface(0);
//       setPrinter(usbDevice);
//       console.log('Printer connected:', usbDevice);
//     } catch (error) {
//       console.error('Error connecting to printer:', error);
//     }
//   };

//   connectToPrinter();

//   // Clean up function
//   return () => {
//     if (printer) {
//       printer.close();
//     }
//   };
// }, []);
console.log({printer});

// const printReceipt = async () => {
//   // alert("print 23")
//   if (printer) {

//     try {
//   alert("print try")

//       await printer.open();
//       await printer.claimInterface(0);
//       const text = "Your receipt content goes here...";
//       await printer.transferOut(1, new TextEncoder().encode(text));
//       console.log('Receipt printed successfully');
//     } catch (error) {
//       console.error('Error printing receipt:', error);
//     } finally {
//       await printer.releaseInterface(0);
//       await printer.close();
//     }
//   } else {
//     console.error('Printer not selected');
//   }
// };



const GenerateEscPosCommand2 = (receipt) => {
  const totalWidth = 40; // Adjust as needed
  // Create a simple JSX structure for the receipt (replace with your actual formatting)
  return (
    <>
      <div className="text-[70px]">----- مركز تأهيل العجوزة ق.م -------</div>
      <div>دخول</div>
      <div>رقم السيارة : {receipt.car_plate}</div>
      <div>سبب الدخول : سياره + {receipt.type}</div>
      <div>--------------شكراً لكم-----------------</div>
      <div>{receipt.arrivalTime}</div>
      <div></div>
      <div></div>
      <div>.</div>
    </>
  );
};

useEffect(()=>{ 
  getAllConfig()
},[])





  return (<>
  
  <div className="">
      <form action="" onSubmit={addCar.handleSubmit}>
      <div className="grid grid-cols-12 bg-[#e2e8f0]  ">
        <div className="col-span-4  flex justify-center items-center h-[100vh] ">

            <div className=" bg-white w-[90%]  flex justify-center items-center rounded-[20px] shadow-2xl">
            <div className="w-full px-3  py-5">
              <div className=" flex justify-between items-center gap-3 ">
                <div><p className="text-center">  عدد الاماكن الممتلئة</p> <p className="text-center"> {slotsNumberBlocked}</p> </div>
                <div><p className="text-center"> عدد الاماكن الفارغة</p><p className="text-center"> {slotsNumberFree}</p></div>
              </div>
              <p className="text-center my-3">ادخل البيانات</p>
            {/* <Input className="my-3" onChange={addCar.handleChange} onBlur={addCar.handleBlur} name="car_plate"  classNames={{
              base:"bg-[#fff]"
            }} placeholder="رقم السيارة"/>
             */}
             <div className="flex gap-3 items-center justify-center"><CarsNumber setCar_plate={setCar_plate}/> <span className="text-gray-500 pt-4">رقم السيارة</span></div>
            <Input className="my-3" dir="rtl"  onChange={addCar.handleChange} onBlur={addCar.handleBlur}  name="owner_name" classNames={{
              base:"bg-[#fff]"
            }} placeholder="الاسم"/>
            
            <Input className="my-3"   dir="rtl" onChange={addCar.handleChange} onBlur={addCar.handleBlur}  name="owner_phone"  classNames={{
              base:"bg-[#fff]"
            }} placeholder="رقم التليفون"/>

           <div className="flex justify-center items-center py-3">

           <RadioGroup
           label=""
           value={selected}
           onValueChange={setSelected}
           orientation="horizontal"
       >
       <Radio value="زيارة" className="px-2" dir="rtl" classNames={{
           label:"px-3"
       }}>زيارة</Radio>
       <div className="px-2"></div>
       <Radio value= "كشف" dir="rtl" classNames={{
           label:"px-3"
       }}>كشف </Radio>
       </RadioGroup>
           </div>

            
          <div className="flex justify-center items-center mt-[20px]">
          <Button  type="submit" className="bg-[#60a5fa] md:w-[200px] text-white"  >  {Loading ?  <Spinner color="current" className="w-[30px] h-[30px]" /> :"دخول السيارة"} </Button>
          </div>

    <div className="flex justify-between item-center"> 
    <Button onClick={()=>{navigate("/user/type")}} className="bg-blue-500 text-white">الصفحة الرئيسية</Button>
    <Button onClick={()=>{navigate("/exitCar")}} className="bg-blue-500 text-white">صفحةالخروج</Button>
    </div>

       
            </div>
            </div>
        </div>
       <div className="col-span-8 py-10 "> 
    
       <div className=" ">
          <div className="flex justify-end items-center  px-5">
            <Button className="bg-red-500 text-white" onClick={()=>{
              localStorage.removeItem("userId")
              navigate("/")
            }} >خروج </Button>
            </div>
       
              <div className=" flex justify-between items-center gap-3  mt-3  px-14 ">
                <div><p className="text-center">  عدد الاماكن الممتلئة</p> <p className="text-center"> {slotsNumberBlocked}</p> </div>
                <div><p className="text-center"> عدد الاماكن الفارغة</p><p className="text-center"> {slotsNumberFree}</p></div>
              </div>
          <div className=" p-2 grid grid-cols-12 gap-2 mt-1">
          {Block?.map((ele ,index)=>{
            return (<>
            
            <div  key={index+1} className="col-span-1 bg-red-500 h-[50px] flex justify-center items-center text-white">{index+1}</div>
  
            </>)
          })}
          {Free.map((ele ,index)=>{
            return (<>
            
            <div  key={slotsNumberBlocked+index+1} className="col-span-1 bg-green-500 h-[50px] flex justify-center items-center text-white">{slotsNumberBlocked+index+1}</div>
            
            </>)
          })}


          </div>
        </div>
        
        </div>
    </div>


      </form>

   
  </div>
  
  </>);
}


  