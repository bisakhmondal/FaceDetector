import React from 'react';
const Rank= ({name,count})=>{
    return(
    <div>
       <div className='white f3'>
       {`Hi! ${name}, your current submission is...`}
       </div>
       <div className='white f1'>
       {`${count} out of 20`}.
       </div> 
    </div>

    )
}



export default Rank;