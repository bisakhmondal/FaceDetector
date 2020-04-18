import React,{useState} from 'react';
import axios from 'axios';
const Register= ({manualSetState})=>{
  const [email,setEmail] =useState('');  
  const [name,setName] =useState('');  
  const [passwd,setPasswd] =useState('');  
  const Authenticate=()=>{
    const route='https://faceb-backend.herokuapp.com/register';
    const info={
      name:name,
      email:email,
      password:passwd
    };
    axios.post(route,info)
    .then(res=>{
      if(res.data.message!==undefined && Object.keys(res.data.message).length!==0){
        alert(res.data.message);
        return;
      }
      if(res.data._id===undefined){
        alert('Invalid Credentials');
        return;
      }
      manualSetState('id',res.data._id);
      manualSetState('name',name);
      manualSetState('route','home');
      localStorage.setItem('_id',res.data._id);
    })
    .catch(err=>{
      alert(err);
    })
  }
    return(
        <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Register</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6">Name</label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="text"
                  name="name"
                  id="name"
                  required
                  onChange={e=>setName(e.target.value)}
                />
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                  required
                  onChange={e=>setEmail(e.target.value)}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  name="password"
                  id="password"
                  required
                  onChange={e=>setPasswd(e.target.value)}
                />
              </div>
            </fieldset>
            <div className="">
              <input
                onClick={()=>Authenticate()}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Register"
              />
            </div>
            <div className="lh-copy mt3">
              <p onClick={()=>manualSetState('route','signin')}  className="f6 link dim black db pointer">Sign In</p>
            </div>
          </div>
        </main>
      </article>
    
    );
}



export default Register;

// onClick={() => onRouteChange('register')}