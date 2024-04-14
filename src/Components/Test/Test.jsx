import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import Tesseract from 'tesseract.js';

const CameraOCR = () => {
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [result, setResult] = useState('');

  const capturePhoto = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);

    // Extract text and numbers from the image using Tesseract.js OCR
    const { data } = await Tesseract.recognize(
      imageSrc,
      'ara',// Language code for English
      { logger: info => console.log(info) }
    );

    setResult(data.text);
  };

  return (
    <div>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
      />
      <button onClick={capturePhoto}>Capture Photo</button>

      {capturedImage && (
        <div>
          <img src={capturedImage} alt="Captured" />
          <p>Extracted Data: {result}</p>
        </div>
      )}
    </div>
  );
};

export default CameraOCR;


// import React, { useRef, useState } from 'react';
// import Webcam from 'react-webcam';
// import Tesseract from 'tesseract.js';

// const CameraOCR = () => {
//   const webcamRef = useRef(null);
//   const [capturedImage, setCapturedImage] = useState(null);
//   const [result, setResult] = useState('');

//   const capturePhoto = () => {
//     const imageSrc = webcamRef.current.getScreenshot();
//     setCapturedImage(imageSrc);

//     // Extract data from the image using Tesseract.js OCR
//     Tesseract.recognize(
//       imageSrc,
//       'eng', // Language code for English
//       { logger: info => console.log(info) }
//     ).then(({ data: { text } }) => {
//       setResult(text);
//     });
//   };

//   return (
//     <div>
//       <Webcam
//         audio={false}
//         ref={webcamRef}
//         screenshotFormat="image/jpeg"
//       />
//       <button onClick={capturePhoto}>Capture Photo</button>

//       {capturedImage && (
//         <div>
//           <img src={capturedImage} alt="Captured" />
//           <p>Extracted Data: {result}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CameraOCR;
