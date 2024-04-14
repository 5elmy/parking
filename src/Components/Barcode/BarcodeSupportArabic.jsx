
import React from 'react';
import BarcodeComponent from './Barcode87';

const MyComponent = () => {
  return (
    <div>
      <h1>Barcode Example</h1>
      {/* Example with Arabic text */}
      <BarcodeComponent value="مركز تأهيل العجوزة Rehabilitation Center" />
    </div>
  );
};

export default MyComponent;


