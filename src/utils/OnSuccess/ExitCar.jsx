import { Button, Input, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react';
import React, { useRef , useState } from 'react';

import ReactDOM from 'react-dom';


export const Modal = ({ isOpen, onClose, children }) => {
  const modalRef = useRef(null);

  const handleCloseModal = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  return isOpen
    ? ReactDOM.createPortal(
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-wrapper">
            <div className="modal-content" ref={modalRef}>
              {children}
            </div>
          </div>
        </div>,
        document.body
      )
    : null;
};

 


const YourComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <div className='flex justify-center items-center h-[100vh]'>
      <div className=''>
      <button onClick={handleOpenModal}>Open Modal</button>
      <Modal isOpen={isOpen} onClose={handleCloseModal}>
       
    

       
       <div className='bg-red-500 h-100vh' >
       <div className=" flex flex-col gap-3">
            <label>Car Number</label>
            <Input disabled placeholder="Car Number" endContent={<span></span>} />
            <label>Number of Hours</label>
            <Input disabled placeholder="Number of hours" endContent={<span>hours</span>} />
            <label>Price</label>
            <Input disabled  placeholder="Total price" endContent={<span>pounds</span>} />
          </div>
          <label className="text-blue">Arrival time</label>
          <Input disabled  placeholder="Entrance Date" />
          <label className="text-blue">Departure time</label>
          <Input disabled  placeholder="Departure time" />
       </div>

 
      </Modal>
    </div>
    </div>
  );
};

export default YourComponent;


// import React, { useEffect, useState } from "react";
// import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input } from "@nextui-org/react";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";

// export default function ExitCar() {
//   const { isOpen, onOpen, onOpenChange } = useDisclosure();
//  let navigate = useNavigate()
//   let {id} = useParams()
//   console.log(id);
//   let [data,setData] = useState({})
//   let getSpecificData = async(id)=>{
//     await axios.get(`http://128.16.66.98:9090/api/CarTransactions/${id}`).then(res=>{
//       console.log(res.data);
//       setData(res.data)
//     }).catch(err=>{
//       console.log(err);
//     })
//   }
//   console.log(data?.car_plate);
//   // Use useEffect to open the modal automatically when the component mounts
//   useEffect(() => {
//     onOpen();
   
//     if( Object.keys(data).length === 0){

//       getSpecificData(id)

//     }
    
//   }, [data]);

//   return (
//     <>
//         {/* <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
//         <ModalContent>
//           {(onClose) => (
//             <>
//               <ModalHeader className="flex flex-col gap-1">Invoice</ModalHeader>
//               <ModalBody>
//                 <div className=" flex flex-col gap-3">
   
//                     <Input disabled defaultValue={data.car_plate}  endContent={<>
//                     <span></span>
//                     </>}/>
//                     <Input disabled  placeholder=" number of hours" endContent={<>
//                     <span>hours</span>
//                     </>}/>
//                      <Input disabled defaultValue={data.payment} placeholder="Total price" endContent={<>
//                     <span>pounds</span>
//                     </>}/>
//                 </div>
//                 <div className="flex justify-between items-center gap-5">
//                     <Input disabled defaultValue={data.arrival_time} placeholder="enterence Date"/>
//                     <Input disabled defaultValue={data.departure_time} placeholder=" Existance Date"/>
//                     </div>
//               </ModalBody>
//               <ModalFooter>
//                 <Button color="danger" variant="light" onPress={onClose}>
//                   Close
//                 </Button>
//                 <Button color="primary" onClick={()=>{
//                   navigate("/exitCar")
//                 }}  onPress={onClose}>
//                   Print
//                 </Button>
//               </ModalFooter>
//             </>
//           )}
//         </ModalContent>
//       </Modal>   */}

      
//     </>
//   );
// }
