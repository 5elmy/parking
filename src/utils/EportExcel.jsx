import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import moment from 'moment/moment.js';


export const exportAsExcel = ({ filteredData,fileName, modifiedData }) => {
  console.log({modifiedData});
  // let modifiedData = filteredData
  
    
  const fileType ="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";
    const ws = XLSX.utils.json_to_sheet(modifiedData)
    const keys = modifiedData.reduce((acc, obj) => [...acc, ...Object.keys(obj)], []);
    const uniqueKeys = [...new Set(keys)];
    const cols = uniqueKeys.map(key => ({wch: key.length + 1})); 
    ws['!cols'] = cols;
    // const wb = { Sheets: { data: ws }, SheetNames: ['data'],Workbook: { Views: [true]}};//sheet rtl
    const wb = { Sheets: { data: ws }, SheetNames: ['data'],Workbook: { Views: [{RTL:false}]}};
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data,fileName +' '+moment().format('DD-MM-YYYY , h.mm.ss a') + fileExtension);
    // alert("excel ready")
  };