import React from 'react';


const Navigation =({manualSetState,id})=>{
    const deauthenticate=()=>{
        localStorage.removeItem('_id');
        manualSetState('id','');
        manualSetState('name','');
        manualSetState('count',0);
        manualSetState('route','signin');

    }
    // const id=localStorage.getItem('_id');
        if(id !==''){
            return(
            <nav  style={{display:'flex',justifyContent:'flex-end'}}>
                <p onClick={()=>deauthenticate()} className="pointer f3 dim black link pa3 underline">Sign Out </p>
            </nav>
        
        );
        } else{
            return(
            <nav  style={{display:'flex',justifyContent:'flex-end'}}>
                <p onClick={()=>manualSetState('route','signin')} className="pointer f3 dim black link pa3 underline">Sign In </p>
                <p onClick={()=>manualSetState('route','register')} className="pointer f3 dim black link pa3 underline">Register </p>
            </nav>
        
        );
        }
        
}
export default Navigation;