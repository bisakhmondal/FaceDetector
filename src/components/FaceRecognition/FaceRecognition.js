import React from 'react';
import './FaceRecognition.css'
const FaceRecognition= ({imageURL,boxes})=>{
    return(
    <div className='center'>
    <div className='absolute mt4'>
       <img id='inputImage' src={imageURL} alt='' width='500px' height='auto' />
      {boxes.map(box=><div className='bounding-box' style={{right: box.right,top: box.top,bottom: box.bottom,left: box.left}} />)}
       
    </div>
    </div>

    )
}



export default FaceRecognition;