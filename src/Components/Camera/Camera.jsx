import React, { useEffect, useRef, useState } from 'react'

export default function Camera({setImage}) {
  
    const videoRef = useRef(null);
    const buttonRef = useRef(null);
    const photoRef = useRef(null);
   
    setImage(photoRef)
    const [hasPhoto , setHasPhoto] = useState(false);
    const getVideo =()=>{
    navigator.mediaDevices
    .getUserMedia({
        video:{width:500 , height:300}
    }) 
    .then((stream)=>{
        console.log(stream);
        let video = videoRef.current;
        console.log(video);
        video.srcObject = stream;
        video.play();
    }).catch(err=>{
        console.error(err)
    })
    }

   
    

    const TakePhoto=()=>{
        const width=414;
        const height = width /(16/9);
        let video = videoRef.current;
        console.log(video);
        let photo =photoRef.current;
        console.log(photo);
        photo.width = width
        photo.height=height
        let ctx =photo.getContext("2d")
        console.log(ctx);
        ctx.drawImage(video,0,0,width,height)
        setHasPhoto(true)

    }
    const closePhoto =()=>{
        let photo = photoRef.current ;
        let ctx =photo.getContext("2d")
        ctx.clearRect(0,0,photo.width,photo.height )
        setHasPhoto(false)
       

    }
  

    useEffect(()=>{
        getVideo()
    },[videoRef])
    return (
    <div>
      <div className='camera'>
        <div>
            <video ref={videoRef}></video>
            <button  onClick={()=>{
               TakePhoto()
            }}  className='bbtn'>SNAP!</button>
        </div>
        <div className={ 'my-2 result' +(hasPhoto?"hasPhoto":"")}>
            {console.log({photoRef})}
            <canvas ref={photoRef}></canvas>
            <button onClick={closePhoto} className='bbtn'>Close</button>

        </div>
      </div>
    </div>
  )
}

