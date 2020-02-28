import React from 'react';


export default class Navigation extends React.Component{
    render(){
        if(this.props.isSigned){
            return(
            <nav  style={{display:'flex',justifyContent:'flex-end'}}>
                <p onClick={()=>this.props.onRouteChange('signin')} className="pointer f3 dim black link pa3 underline">Sign Out </p>
            </nav>
        
        );
        } else{
            return(
            <nav  style={{display:'flex',justifyContent:'flex-end'}}>
                <p onClick={()=>this.props.onRouteChange('signin')} className="pointer f3 dim black link pa3 underline">Sign In </p>
                <p onClick={()=>this.props.onRouteChange('register')} className="pointer f3 dim black link pa3 underline">Register </p>
            </nav>
        
        );
        }
        
    }
}