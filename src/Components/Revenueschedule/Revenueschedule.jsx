import React, { useContext, useEffect, useLayoutEffect, useMemo, useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Spinner, getKeyValue, DropdownMenu, DropdownItem, DropdownTrigger, Dropdown, Button, Input, Autocomplete} from "@nextui-org/react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import logo from "../assests/مركز التاهيل.jpg"




export default function Revenueschedule() {
  let [data,setData]= useState({})
  let [carreport,setCarReport] = useState('')
  console.log(carreport);
  let carRevenueScedule = async()=>{
    await axios.get(`http://128.16.66.98:9090/api/Reports/CarsReporrt`).then(res=>{
      console.log({cars:res});
      console.log();
      setCarReport(res.data)
    }).catch(err=>{
      console.log(err);
    })
  }
  let getRevenueScedule =async()=>{
    await axios.get(`http://128.16.66.98:9090/api/Reports/GetReportInMonth`).then(res=>{
      console.log(res);
      setData(res.data)
    }).catch(err=>{
      console.log(err);
    })
  }
  useEffect(()=>{
    getRevenueScedule()
    // carRevenueScedule()
  },[])

  const topContent = React.useMemo(() => {

    return (

      <div className="bg-white p-3 rounded-md  ">
         <div className="flex justify-end items-center ">
      <img src={logo} className="w-[90px] h-[90px]" alt="" />
    </div>
        <p style={{
                color: "var(--dark-gray-dark-gray-2, #252C32)",
                "fontFamily": "Mulish",
                "fontSize": "40px",
                "fontStyle": "normal",
                "fontWeight": "700",
                "lineHeight": "48px",
                "letterSpacing": "-0.66px",
                "textTransform": "capitalize"
              }} className="text-center">Revenue Schedule </p>
        <div className="flex flex-col gap-4 ">
          <div className="flex justify-between gap-3 items-end">
            <div className=' flex gap-3'>
             


            </div>

            <div className="flex gap-3">



                                    {/* <Button  style={{
                                        "display": "inline-flex",
                                        padding: " 4px 12px 4px 8px",
                                        // "flex-direction": "column",
                                        "alignItems": "center",
                                        gap: "8px",
                                        "borderRadius": "6px",
                                        
                                        color: "var(--light-gray-light-gray-5, #F6F8F9)",
                                        "fontFamily": "Inter",
                                        "fontSize": "14px",
                                        "fontStyle": "normal",
                                        "fontWeight": "600",
                                        "lineHeight": "24px",
                                        "letterSpacing": "-0.084px"
                                    }} className='z-[10] bg-blue-500'>

                                        
                                       Add Cars
                                    </Button> */}
                                    {/* <a href={carreport}>yarb</a> */}
                                    {/* <DownloadButton/> */}
                               
            </div>
          </div>

        </div>


      </div>


    );
  }, [
   
  ]);
  return (
  <div className="flex justify-center items-center h-[100vh]">
      <Table  classNames={{
        th: "text-center text-white text-[20px] bg-blue-400 ",
        tr: "text-center text-[18px] ",
        wrapper: "max-h-[382px]",
      }}
    className="px-5 mt-10" topContent={topContent} aria-label="Example empty table">
      <TableHeader>
        <TableColumn>cars Number</TableColumn>
        <TableColumn>Visit Number</TableColumn>
        <TableColumn>consaluation Number</TableColumn>
        <TableColumn>All Revenue</TableColumn>
      </TableHeader>
      <TableBody emptyContent={"No rows to display."}>



      <TableRow key="1">
          <TableCell>{data.carsNum}</TableCell>
          <TableCell>{data.visitNum}</TableCell>
          <TableCell>{data.consaluationNum}</TableCell>
          <TableCell>{data.allRevenue}</TableCell>
        </TableRow>

      </TableBody>
    </Table>
  </div>
    )
}
