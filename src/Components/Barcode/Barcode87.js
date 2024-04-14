import React, { useEffect, useRef } from 'react';
import JsBarcode from 'jsbarcode';

const BarcodeComponent = ({ value }) => {
  const barcodeRef = useRef(null);

  useEffect(() => {
    if (barcodeRef.current) {
      JsBarcode(barcodeRef.current, value, {
        format: 'CODE128', // Choose the format of the barcode as per your requirement
        displayValue: true,
        text: value, // Display the text below the barcode
      });
    }
  }, [value]);

  return <svg ref={barcodeRef}></svg>; // This is where the barcode will be rendered
};

export default BarcodeComponent;
