import React from 'react';


export default class Navigation extends React.Component{
    render(){
        return(
            <nav  style={{display:'flex',justifyContent:'flex-end'}}>
                <p className="pointer f3 dim black link pa3 underline">Sign Out </p>
                {/* <p>Register</p> */}
            </nav>
        
        );
    }
}