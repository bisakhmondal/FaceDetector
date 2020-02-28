import React from 'react';
import './App.css';
import Navigation from './components/Navigation';
import Logo from './components/logo/logo' ;
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
  apiKey: 'e31c08df8a38427fa1c737613de07da1'
 });
 
 class App extends React.Component {
  constructor(){
    super();
    this.state={
      input:'',
      image_url:'',
      box:{}
    }
  }
  onChange=(event)=>{
    this.setState({input:event.target.value});
  }
  calcFacebox=(data)=>{
    const b_box=data.outputs[0].data.regions[0].region_info.bounding_box;
    const image=document.getElementById('inputImage');
    const height=Number(image.height);
    const width=Number(image.width);
    return {
        top:height*b_box.top_row,
        bottom:height*(1-b_box.bottom_row),
        left:width*b_box.left_col,
        right:width*(1-b_box.right_col)
      };
  }
  drawFacebox=(box)=>{
    console.log(box);
    this.setState({box:box});
  }

  onButtonSubmit=(event) =>{
    this.setState({image_url:this.state.input})
    app.models.predict("a403429f2ddf4b49b307e318f00e528b", this.state.image_url).then((response) =>{
      this.drawFacebox(this.calcFacebox(response))
    }).catch(err => console.log(err));
  }
  render(){
  return (
    <div className="App">
    <Particles className='particles'
    params={particleoptions} />

      <Navigation /> 
      <Logo/>
      <Rank />
      <ImageLinkForm onInputChange={this.onChange} onButtonSubmit={this.onButtonSubmit}/>
      <FaceRecognition box={this.state.box} imageURL={this.state.image_url}/>
    </div>
  );
  }
}

export default App;
