import React from 'react';
import Tilt from 'react-tilt'
import './logo.css'
import ll from './brain.png'
const Logo= ()=>{
    return(
       <div className='ma4 mt0' >
            <Tilt className="Tilt br2 shadow-2" options={{ max : 60 }} style={{ height: 150, width: 150 }} >
            <div className="Tilt-inner pa2"> 
                    <img src={ll} alt="logo" />
            </div>
            </Tilt>
       </div> 
    )
}



export default Logo;