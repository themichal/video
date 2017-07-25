
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import CamOff from 'react-icons/lib/md/videocam-off';
import File from 'react-icons/lib/md/cloud-upload';
import Photo from 'react-icons/lib/md/photo-camera';

const width = 1280;
const height = 720;

// Prefer camera resolution nearest to 1280x720.
var constraints = { video: { width: 1280, height: 720, facingMode: { exact: "environment" } } }; 

import 'style.css';

const support = !!navigator.mediaDevices;

if (support) {
  navigator.mediaDevices.getUserMedia(constraints)
    .then(function(mediaStream) {
      var video = document.querySelector('video');
      video.srcObject = mediaStream;
      video.onloadedmetadata = function(e) {
      video.play();
    };
  })
  .catch(function(err) { console.log(err.name + ": " + err.message); }); // always check for errors at the end.
}

class App extends Component {

  constructor() {
    super();
    this.state = {};
  }

  handleClick() {
    const video = document.getElementById('video');
    const canvas = this.refs.canvas;
    var context = canvas.getContext('2d');
    canvas.width = 1280;
    canvas.height = 720;
    context.drawImage(video, 0, 0, width, height);
    this.setState({ taken: true });
    //var data = canvas.toDataURL('image/png');
    //photo.setAttribute('src', data);
  }

  handleChange(e) {
    let reader = new FileReader();
    const canvas = this.refs.canvas;
    const img = document.createElement('img');

    reader.onload = (e) => {
      var context = canvas.getContext('2d');
      canvas.width = width;
      canvas.height = height;
      img.onload = function() {
        context.drawImage(img, 0, 0, width, height);
      }
      img.src = e.target.result;
      this.setState({ taken: true });
    }

    reader.readAsDataURL(e.target.files[0]);
  }

  render() {
    return (
      <div style={{ height: '100vh', width: '100vw', display: 'flex' }}>
        <div style={{ display: 'flex', flexGrow: '1' }}>
          <div className='pane'>
            { support && !this.state.taken &&
              <div style={{ position: 'relative', width: '100%', cursor: 'pointer' }} onClick={this.handleClick.bind(this)}>
                <video
                  ref='video'
                  id='video'
                  style={{ width: '100%' }}
                />
                { false &&
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'inherit', opacity: '1', position: 'absolute', top: '0', left: '0', bottom: 0, right: 0, justifyContent: 'center'}}>
                  <Photo width='60px' height='60px' color='#888' />
                </div> }
              </div> }
            <canvas ref='canvas' style={{ width: '100%', display: this.state.taken ? 'block' : 'none'}} />
            { ! support && !this.state.taken &&
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <CamOff width='60px' height='60px' color='#888' />
                <p style={{ color: '#333'}}>We are sorry, Apple hardware is not supported :(</p>
              </div> }
          </div>
          <div className='pane'>
            <input
              type='file'
              accept='image/*' 
              id='file'
              style={{ display: 'none' }}
              onChange={this.handleChange.bind(this)}
            />
            <label htmlFor='file' style={{ cursor: 'pointer' }}>
              <File width='60px' height='60px' color='#888' />
            </label>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

