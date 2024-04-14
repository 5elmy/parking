import React from 'react';
import Barcode from 'react-barcode';

export const BarcodeComponent = ({value}) => {
  return (
    <div>
    
      
      <Barcode value={value}  height={40}   />

    </div>
  );
};


