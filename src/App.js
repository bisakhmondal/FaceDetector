import React from 'react';
import './App.css';
import Navigation from './components/Navigation';
import Logo from './components/logo/logo' ;
import Rank from './components/Rank/Rank' ;
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm' ;
import Particles from 'react-particles-js';
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
class App extends React.Component {
  constructor(){
    super();
    this.state={
      input:'',
    }
  }
  onChange=(event)=>{
    console.log(event.target.value)
  }
  render(){
  return (
    <div className="App">
    <Particles className='particles'
    params={particleoptions} />

      <Navigation /> 
      <Logo/>
      <Rank />
      <ImageLinkForm onInputChange={this.onChange}/>
      {/* <FaceRecognition /> */}
    </div>
  );
  }
}

export default App;
