// import React, { useRef, useState } from 'react';
// import Webcam from 'react-webcam';
// import axios from 'axios';

// export const Patient = () => {
//   const webcamRef = useRef(null);
//   const [image, setImage] = useState(null);

//   const captureImage = () => {
//     const imageSrc = webcamRef.current.getScreenshot();
//     setImage(imageSrc);
//   };

//   const convertImageToBits = (imageSrc) => {
//     const base64String = imageSrc.split(',')[1];
//     const binaryString = atob(base64String);
//     let bits = '';
//     for (let i = 0; i < binaryString.length; i++) {
//       const binaryChar = binaryString.charCodeAt(i).toString(2).padStart(8, '0');
//       bits += binaryChar;
//     }
//     return bits;
//   };

//   const sendDataToAPI = async (imageData) => {
//     try {
//       // Convert image data to bits
//       const bits = convertImageToBits(imageData);
//       console.log(bits);
//       // Example: Sending the bits to an API endpoint using Axios
//       const response = await axios.post('http://128.16.66.98:9090/api/PersonTransactions', {
//         imageData: bits,
//         user_id: localStorage.getItem("userId"),
//         national_id:inputValue2 
//         // Add other data you want to send along with the image
//       });

//       // Handle the API response as needed
//       console.log('API Response:', response.data);
//     } catch (error) {
//       console.error('Error sending data to API:', error);
//     }
//   };

//   const handleSendData = () => {
//     if (image) {
//       sendDataToAPI(image);
//     } else {
//       console.log('No image captured.');
//     }
//   };

//   return (
//     <div>
//       <Webcam
//         audio={false}
//         ref={webcamRef}
//         screenshotFormat="image/jpeg"
//       />
//       <button onClick={captureImage}>Capture Image</button>
//       <button onClick={handleSendData}>Send Data to API</button>
//     </div>
//   );
// };

import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';
import { Button, Input } from '@nextui-org/react';

export const Patient = () => {
  const webcamRef = useRef(null);
  const [image, setImage] = useState(null);
  const [input1Value, setInput1Value] = useState('');
  const [input2Value, setInput2Value] = useState('');
  const [radioValue, setRadioValue] = useState('option1');

  const captureImage = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
  };
  console.log(image);

  const convertImageToBits = (imageSrc) => {
    const base64String = imageSrc.split(',')[1];
    const binaryString = atob(base64String);
    let bits = '';
    for (let i = 0; i < binaryString.length; i++) {
      const binaryChar = binaryString.charCodeAt(i).toString(2).padStart(8, '0');
      bits += binaryChar;
    }
    return bits;
  };

  const sendDataToAPI = async () => {
    try {
      if (!image) {
        console.log('No image captured.');
        return;
      }

      // Convert image data to bits
      const bits = convertImageToBits(image);
console.log(bits);
console.log({
  image: bits,
  national_id:  input1Value,
  // input2: input2Value,
  user_id: localStorage.getItem("userId")

});
      // Sending the bits and input values to an API endpoint using Axios
      const response = await axios.post('http://128.16.66.98:9090/api/PersonTransactions', {
        image: bits,
        national_id:  input1Value,
        name: input2Value,
        type_of_entrance: radioValue,
        user_id: localStorage.getItem("userId")

      });

      // Handle the API response as needed
      console.log('API Response:', response.data);
    } catch (error) {
      console.error('Error sending data to API:', error);
    }
  };

  return (
  <div className='flex justify-center items-center h-[100vh] '>

<div className='p-5 shadow-2xl bg-gray-300 md:w-[50%] rounded-[20px]'> 
    
    <div className='flex gap-5 justify-center items-center mx-10'>
  
    

    <Webcam
      audio={false}
      ref={webcamRef}
      screenshotFormat="image/jpeg"
      width={400}
      className='rounded-[20px]'
    />

  
    {image && <img src={image} alt="Captured"  className='rounded-[20px]'/>} 
    </div>
 
<div className='flex justify-center items-center my-5'>   <Button onClick={captureImage} className='bg-blue-500 text-white px-10'>Capture</Button></div>
<div className='flex justify-between items-center gap-5'>

<Input
      type="text"
      placeholder="الاسم"
      value={input2Value}
      onChange={(e) => setInput2Value(e.target.value)}
      dir='rtl'
    />
    <Input
      type="text"
      placeholder="الرقم القومي"
      value={input1Value}
      onChange={(e) => setInput1Value(e.target.value)}
      dir='rtl'
    />

</div>

    <br/>
 
         <div className=" flex justify-center items-center gap-5">
    <label className='mb-4 text-[20px]'>
        زيارة
        <input
          type="radio"
          value="زيارة"
          checked={radioValue === 'زيارة'}
          onChange={() => setRadioValue('زيارة')}
          className='mx-2'
        />
      </label>
      <label className="mb-4 text-[20px]">
        كشف
        <input
          type="radio"
          value="كشف"
        
          checked={radioValue === 'كشف'}
          onChange={() => setRadioValue('كشف')}
          className='mx-2'
        />
      </label>
     
    </div>
  
    <div className='flex justify-center items-center'>
    <Button onClick={sendDataToAPI} className='bg-blue-500 text-white px-12'>Send</Button>



    </div>
  </div>
  </div>
  );
};



