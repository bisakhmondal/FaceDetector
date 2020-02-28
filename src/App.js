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
  apiKey: ''
 });
 
 class App extends React.Component {
  constructor(){
    super();
    this.state={
      input:'',
      image_url:'',
      box:[],
      route:'signin',
      isSigned:false
    }
  }
  onChange=(event)=>{
    this.setState({input:event.target.value});
  }
  calcFacebox=(data)=>{
    let b_boxes=data.outputs[0].data.regions.map(i=>i.region_info.bounding_box);
    // console.log(b_boxes);
    // // b_box=b_box[0];
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
  drawFacebox=(box)=>{
    // console.log(box);
    this.setState({box:box});
  }

  onButtonSubmit=(event) =>{
    this.setState({image_url:this.state.input})
    app.models.predict("a403429f2ddf4b49b307e318f00e528b", this.state.image_url).then((response) =>{
      this.drawFacebox(this.calcFacebox(response))
    }).catch(err => console.log(err));
  }
  onRouteChange=(route)=>{
    if(route==='home'){
      this.setState({isSigned:true});
    }
    else{
      this.setState({isSigned:false});
    }
    this.setState({route:route})
  }

  render(){
  return (
    <div className="App">
    <Particles className='particles'
    params={particleoptions} />

      <Navigation onRouteChange={this.onRouteChange} isSigned={this.state.isSigned} /> 
      {(this.state.route==='home')?
      <div>
      <Logo/>
      <Rank />
      <ImageLinkForm onInputChange={this.onChange} onButtonSubmit={this.onButtonSubmit}/>
      <FaceRecognition boxes={this.state.box} imageURL={this.state.image_url}/>
      </div>
      :( (this.state.route==='signin')?
      <SignIn onRouteChange={this.onRouteChange} /> :
      <Register onRouteChange={this.onRouteChange}/>
      )
      }
    </div>
  );
  }
}

export default App;
