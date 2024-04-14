
import React from 'react';
import image from "../assests/مركز التاهيل.jpg"
export const ThermalPrinterComponent = ({ receipt}) => {
  const printContent = () => {

    const content = `
    <div style="text-align: center;  margin-bottom: 10px;">
    
    <p>----- مركز تأهيل العجوزة ق.م -------</p>
    <p>دخول</p>
    <p>رقم السيارة : $eceipt.car_plate</p>
    <p>سبب الدخول : سياره + $receipt.type</p>
    <p>--------------شكراً لكم-----------------</p>
    <p >receipt.arrivalTime</p>
  </div>
  `;

    
    // Create a new window with the content to print
    const printWindow = window.open('', '_self');
    printWindow.document.write(content);
    printWindow.document.close();

    // Call the print function
    printWindow.print();
  };

  return (
    <div>
      <button onClick={printContent}>Print</button>
   
    </div>
  );
};


