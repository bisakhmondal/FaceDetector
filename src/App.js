import React from 'react';
import './App.css';
import Navigation from './components/Navigation';
import Logo from './components/logo/logo' ;
import Register from './components/Register/Register' ;
import SignIn from './components/SignIn/Signin' ;
import FaceRecognition from './components/FaceRecognition/FaceRecognition' ;
import Rank from './components/Rank/Rank' ;
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm' ;
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import axios from 'axios';
require('dotenv/config')
const particleoptions={
  "particles": {
      "number": {
          "value": 80
      },
      "size": {
          "value": 3
      }
  },
  "interactivity": {
      "events": {
          "onhover": {
              "enable": true,
              "mode": "repulse"
          }
      }
  }
}
const app = new Clarifai.App({
  apiKey: 'e31c08df8a38427fa1c737613de07da1'
 });
 
 class App extends React.Component {
  constructor(){
    super();
    this.state={
      id:'',
      name:'',
      box:[],
      count:0,
      route:'signin',
      image_url:''
    }
  }
  componentDidMount(){
    const _id=localStorage.getItem('_id');
    if(_id!==null){
      const route='https://faceb-backend.herokuapp.com/auth/'+String(_id);

      axios.get(route)
      .then(res=>{
        // this.setState()
        // if(res.)
        this.setState({id:_id,isSigned:true,route:"home"
        ,name:res.data.name,count:res.data.count});
      })
      .catch(err=>{
        console.log(err);
      })
    }
  }
  // onChange=(event)=>{
  //   this.setState({input:event.target.value});
  // }

  manualSetState=(ke,val)=>{
    this.setState({[ke]:val});
  }

  SetId=(ids)=> this.setState({id:ids});
  calcFacebox=(data)=>{
    let b_boxes=data.outputs[0].data.regions.map(i=>i.region_info.bounding_box);
    const image=document.getElementById('inputImage');
    const height=Number(image.height);
    const width=Number(image.width);
    const box_list= b_boxes.map(b_box=> ({
        top:height*b_box.top_row,
        bottom:height*(1-b_box.bottom_row),
        left:width*b_box.left_col,
        right:width*(1-b_box.right_col)
      }));
      return box_list;
  }

  onButtonSubmit=(url) =>{
    // if(url===this.state.image_url){
    //   alert('Already Detected');
    //   return;
    // }
    if(this.state.count>=20){
      alert('Quota exhausted');
      return;
    }
    this.setState({image_url:url});
    this.setState({box:[]});
    app.models.predict("a403429f2ddf4b49b307e318f00e528b", this.state.image_url).then((response) =>{
      this.setState({box:this.calcFacebox(response)});
      this.setState({count:this.state.count+1});
      const route='https://faceb-backend.herokuapp.com/predict/'+String(this.state.id);
      const info={
        url:url,
        count:this.state.count
      }
      axios.put(route,info)
      .then(res=>{})
    }).catch(err=>{});
  }

  render(){
  return (
    <div className="App">
    <Particles className='particles'
    params={particleoptions} />

      <Navigation id={this.state.id} manualSetState={this.manualSetState} /> 
      {(this.state.route==='home')?
      <div>
      <Logo/>
      <Rank name={this.state.name} count={this.state.count} />
      <ImageLinkForm onButtonSubmit={this.onButtonSubmit}/>
      <FaceRecognition boxes={this.state.box} imageURL={this.state.image_url}/>
      </div>
      :( (this.state.route==='signin')?
      <SignIn  manualSetState={this.manualSetState} /> :
      <Register manualSetState={this.manualSetState}/>
      )
      }
    </div>
  );
  }
}

export default App;
