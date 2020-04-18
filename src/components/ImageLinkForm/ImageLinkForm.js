import React,{useState} from 'react';
import './Imagelink.css'
const ImageLinkForm= (props)=>{
    const [url,setUrl]=useState('');
    return(
        <div>
       <p className='f3'>
           {`I am Good at face detection, give me faces`}
       </p>
       <div className='center'>
       <div className='center linker pa4 br3 shadow-5'>
           <input className='w-70 f4 center pa2 ' type='text' placeholder='Image url' onChange={e=>setUrl(e.target.value)}/>
           <button className='grow pa2 br3 w-30 link ph3 pv2 dib btn btn-primary' onClick={()=>props.onButtonSubmit(url)}>Detect</button>
        </div>
       </div>
       </div>
    )
}



export default ImageLinkForm;