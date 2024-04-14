



import React, { useContext, useEffect, useLayoutEffect, useMemo, useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Spinner, getKeyValue, DropdownMenu, DropdownItem, DropdownTrigger, Dropdown, Button, Input, Autocomplete } from "@nextui-org/react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assests/مركز التاهيل.jpg"
import GeneralTable from "../../utils/GeneralTable/GeneralTable";
import moment from "moment";
export default function AddPersons() {

  let [ data , setData] = useState([])


  async function getUserSchedule (){
   
    await axios.get(`http://128.16.66.98:9090/api/PersonTransactions`).then(res=>{
      console.log(res);
      setData(res.data)
    }).catch(err=>{
      console.log(err);
    })
  }
  console.log(data);
  useEffect(()=>{
 
  
      getUserSchedule()
  
  },[])




  const renderCell = React.useCallback((user, columnKey, id) => {

    const cellValue = user[columnKey];
    switch (columnKey) {
      case "name":
  
    
  
          return (
            <p className="text-bold text-small capitalize">{cellValue}</p>
          );
  
      case "national_id":
    
  
          return (
            <p className="text-bold text-small capitalize">{cellValue}</p>
          );
      case "payment":
    
  
          return (
            <p className="text-bold text-small capitalize">{cellValue}</p>
          );
      
    
      case "type_of_entrance":
    
  
          return (
            <p className="text-bold text-small capitalize">{cellValue}</p>
          );
      
    
    
      case "arrival_time":
    
  
          return (
            <p className="text-bold text-small capitalize">{cellValue}</p>
          );
      
    
      case "departure_time":
    
  
          return (
            <p className="text-bold text-small capitalize">{cellValue}</p>
          );
      
    

        default:
        return cellValue;
    }
  }, []);

  useEffect(() => {

  }, [ data])
  console.log({ data });


  
 

  const INITIAL_VISIBLE_COLUMNS = ["name", "national_id", "type_of_entrance" ,"id" ,"payment", "departure_time"];
  const columns = [
    
    {name: "User Name", uid: "name", sortable: true},
    {name: "National Id", uid: "national_id", sortable: true},
    {name: "Payment", uid: "payment", sortable: true},
    {name: "Type Of Entrance", uid: "type_of_entrance", sortable: true},
    {name: "Arrive Time", uid: "arrival_time", sortable: true},
    {name: "Departure Time", uid: "departure_time", sortable: true},
     {name: "User Id", uid: "id",sortable: true},

  
  ];

  let modifiedData = data.map(item => {
   
       const {name ,national_id ,type_of_entrance, arrival_time, departure_time, payment,id} = item;
      
       return {
          
           ['User Name']:name,
           ['National Id']: national_id,
           ['Type Of Entrance']: type_of_entrance,
           ['Payment']: payment,
           ['Arrive Time ']:  moment(arrival_time).format('YYYY-MM-DD'),
          ['Departure Time']: departure_time,
           ['UserId']: id ,
       };
     })
  

  return (
    <>

    <GeneralTable data={data} name={"Persons"} SearchValue ={"national_id"} renderCell ={renderCell } INITIAL_VISIBLE_COLUMNS={INITIAL_VISIBLE_COLUMNS}  modifiedData={modifiedData} columns={columns}/>
    
    
    
    </>

  );
}

