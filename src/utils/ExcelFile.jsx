import React, { useEffect, useState } from "react";
import * as  FileSaver from "file-saver"
import * as XSLX from  "xlsx"
import { Button } from "@nextui-org/react";
import axios from "axios";
import { exportAsExcel } from "./EportExcel";

export function ExcelFile({data , name , modifiedData}){
    let [excel,setExcel] = useState([])
    const fileType = "xlsx"
    // let [carreport,setCarReport] = useState('')
    // console.log({carreport});







    return(<>
    <Button  onClick={()=>{exportAsExcel({fileName:name ,filteredData:data ,modifiedData:modifiedData }) } } > Download Excel </Button>
    
    
    </>)
}