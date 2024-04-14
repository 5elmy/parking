import React from 'react';
import { BarcodeComponent } from '../Barcode/Barcode';

const Bar = ({ value }) => {
  return (
    <div>
     <BarcodeComponent value={value} />
    </div>
  );
};

export default Bar;


