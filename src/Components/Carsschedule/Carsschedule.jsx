import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import GeneralTable from "../../utils/GeneralTable/GeneralTable";

export default function Carsschedule() {
  let [data , setData] = useState([])
  const INITIAL_VISIBLE_COLUMNS = ["car_plate", "type_of_entrance", "payment" ,"arrival_time" , "departure_time"];
  const columns = [
    {name: "ID", uid: "id", sortable: true},
    {name: "Car Number", uid: "car_plate", sortable: true},
    {name: "Owner Name", uid: "owner_name", sortable: true},
    {name: "Owner phone", uid: "owner_phone", sortable: true},
    {name: "Type Of Entrance", uid: "type_of_entrance",sortable: true},
    {name: "Payment", uid: "payment",sortable: true},
    {name: "Arrival Time", uid: "arrival_time",sortable: true},
    {name: "Departure Time", uid: "departure_time", sortable: true},
    
  ];

  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "name":
        return (
          <p className="text-bold text-small capitalize">{cellValue}</p>
        );
      case "role":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{cellValue}</p>
          
          </div>
        );
      default:
        return cellValue;
    }
  }, []);
 



  async function getCarsSchedule (){
    
   
    await axios.get(`http://128.16.66.98:9090/api/CarTransactions`).then(res=>{
     
      setData(res.data)
    }).catch(err=>{
      console.log(err);
    })
  }
 console.log({data});
  useEffect(()=>{
    // if(data.length =0){

      getCarsSchedule()
    //  }
  },[])


  let modifiedData = data.map(item => {
   
       const {car_plate, payment ,type_of_entrance , arrival_time  ,departure_time} = item;
     
       return {
         
           ['Car Number']:car_plate,
           ['Payment']: payment,
          ['Type of Entrance']: type_of_entrance,
          ['Arrival Time']:  moment(arrival_time).format('YYYY-MM-DD') ,
          ['Departure Time']:  moment(departure_time).format('YYYY-MM-DD') ,
        //  ['createdAt']: createdAt,
       };
     })
     console.log({modifiedData});


  return(
    <div className="">

    
      
    <GeneralTable data={data} name={"Cars"} SearchValue ={"car_plate"} renderCell ={renderCell } INITIAL_VISIBLE_COLUMNS={INITIAL_VISIBLE_COLUMNS}  modifiedData={modifiedData} columns={columns}/>
    </div>
  );
}

