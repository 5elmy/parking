import React, { useState } from "react";
import {Autocomplete, AutocompleteItem} from "@nextui-org/react";
import {animals} from "./Data";
import { TextField } from "@mui/material";

export default function AutoComplete({cars ,setValue , value}) {


// const handleSelectionChange = async(event, newValue) => {
//     setValue(newValue);

//     // Call your API here with the selected value
//     if (newValue) {
//       // Example API call using fetch
//     //   fetch('your-api-endpoint', {
//     //     method: 'POST',
//     //     headers: {
//     //       'Content-Type': 'application/json',
//     //       // Add any additional headers as needed
//     //     },
//     //     body: JSON.stringify({ selectedValue: newValue }),
//     //   })
//     //     .then(response => {
//     //       // Handle response as needed
//     //     })
//     //     .catch(error => {
//     //       console.error('Error:', error);
//     //     });
// await axios.
//     }
//   }; 
  
  return (
    <div className="flex w-full justify-center items-center">
       
      <Autocomplete
        label="Select Car Number "
        placeholder="Search Car Number"
        className="w-[400px]"
        defaultItems={cars}
        selectedKey={value}
        onSelectionChange={setValue}
        // onChange={handleSelectionChange}
      >
        {(item) => <AutocompleteItem  key={item.car_plate}>{item.car_plate}</AutocompleteItem>}
      </Autocomplete>
    </div>
  );
}
