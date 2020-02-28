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
 });class App extends React.Component {
  constructor(){
    super();
    this.state={
      input:'',
      image_url:''
    }
  }
  onChange=(event)=>{
    this.setState({input:event.target.value});
  }
  onButtonSubmit=(event) =>{
    this.setState({image_url:this.state.input})
    app.models.predict("a403429f2ddf4b49b307e318f00e528b", this.state.image_url).then(
    function(response) {
      console.log(response.outputs[0].data.regions[0].region_info.bounding_box)
    },
    function(err) {
      // there was an error
    }
  );
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
      <FaceRecognition imageURL={this.state.image_url}/>
    </div>
  );
  }
}

export default App;
