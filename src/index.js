
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

// Prefer camera resolution nearest to 1280x720.
var constraints = { video: { width: 1280, height: 720 } }; 

navigator.mediaDevices.getUserMedia(constraints)
  .then(function(mediaStream) {
    var video = document.querySelector('video');
    video.srcObject = mediaStream;
    video.onloadedmetadata = function(e) {
    video.play();
  };
})
.catch(function(err) { console.log(err.name + ": " + err.message); }); // always check for errors at the end.

class App extends Component {

  handleClick() {
    const canvas = document.createElement('canvas');
    canvas.setAttribute('width', 1280);
    canvas.setAttribute('height', 720);
    const video = document.getElementById('video');
    document.body.innerHTML = '';
    document.body.appendChild(canvas);
    var context = canvas.getContext('2d');
    const height = 720;
    const width = 1280;
    canvas.width = width;
    canvas.height = height;
    context.drawImage(video, 0, 0, width, height);

    var data = canvas.toDataURL('image/png');
    photo.setAttribute('src', data);
  }

  handleChange(e) {
    console.log(e.target.files);
    let reader = new FileReader();

    reader.onload = function (e) {
      const canvas = document.createElement('canvas');
      const img = document.createElement('img');
      canvas.setAttribute('width', 1280);
      canvas.setAttribute('height', 720);
      document.body.innerHTML = '';
      document.body.appendChild(canvas);
      var context = canvas.getContext('2d');
      const height = 720;
      const width = 1280;
      canvas.width = width;
      canvas.height = height;
      img.onload = function() {
        context.drawImage(img, 0, 0, width, height);
      }
      img.src = e.target.result;
    }

    reader.readAsDataURL(e.target.files[0]);
  }

  render() {
    return (
      <div style={{ height: '100vh', width: '100vw', display: 'flex' }}>
        <div id='parent' style={{ display: 'flex', flexGrow: '1', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
          <video ref='video' id='video' />
          <button onClick={() => this.handleClick()}>
            Capture
          </button>
        </div>
        <div style={{ display: 'flex', flexGrow: '1', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
          <input type='file' accept='image/*' capture='camera'
            onChange={(e) => this.handleChange(e)}
           />
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

