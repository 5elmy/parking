


import React, { useContext, useEffect, useLayoutEffect, useMemo, useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Spinner, getKeyValue, DropdownMenu, DropdownItem, DropdownTrigger, Dropdown, Button, Input, Autocomplete } from "@nextui-org/react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assests/مركز التاهيل.jpg"
import GeneralTable from "../../utils/GeneralTable/GeneralTable";
export default function Userschedule() {

let [ data , setData] = useState([])


let [color , setColor] = useState(false)
  
console.log({"color":color});

 const BlockUser = async(id)=>{
  console.log(id);
  await axios.put(`http://128.16.66.98:9090/api/users/block/${id}`).then(res=>{
    console.log(res);
    setColor(!color)

  }).catch(err=>{
    console.log(err);
  })
}
 
console.log({color});


  const renderCell = React.useCallback((user, columnKey, id) => {
    console.log(user);
    const cellValue = user[columnKey];
    console.log(cellValue);
    switch (columnKey) {
      case "username":
          return (
            <p className="text-bold text-small capitalize">{cellValue}</p>
          );

      case "role":
    

          return (
            <p className="text-bold text-small capitalize">{cellValue}</p>
          );
      
    
      case "id":
    

          return (
            <Button className={`text-bold text-small ${user.block ===true ? "bg-red-500" :"bg-green-500"} capitalize text-white`} onClick={()=>{
              BlockUser(cellValue);
              setColor(!color)
              
            }}>Block</Button>
          );
      
    

 
      default:
        return cellValue;
    }
  }, [ color ,  BlockUser  , data]);
  useEffect(() => {

  }, [ data , color ])
  
  
  async function getUserSchedule (){
    await axios.get(`http://128.16.66.98:9090/api/Users`).then(res=>{
      console.log(res.data);
      setData(res.data)
      setColor(!color)
    }).catch(err=>{
      console.log(err);
    })
  }
 console.log(data);
  useEffect(()=>{
    getUserSchedule()
  },[])




  const INITIAL_VISIBLE_COLUMNS = ["username", "role", "password" ,"id" , "departure_time"];
  const columns = [
    
    {name: "User Name", uid: "username", sortable: true},
    {name: "Role", uid: "role", sortable: true},
    {name: "Password", uid: "password", sortable: true},
     {name: "User Id", uid: "id",sortable: true},
   

  
  ];
  console.log(data);

  let modifiedData = data.map(item => {
   
       const {username , role , password , id} = item;
      
       return {
          
           ['User Name']:username,
           ['Password']: password,
          ['Role']: role,
           ['UserId']: id ,
       };
     })
  

  return (
    <>

    <GeneralTable data={data} name={"Users"} SearchValue ={"username"} renderCell ={renderCell } INITIAL_VISIBLE_COLUMNS={INITIAL_VISIBLE_COLUMNS}  modifiedData={modifiedData} columns={columns}/>
    
    
    
    </>

  );
}

