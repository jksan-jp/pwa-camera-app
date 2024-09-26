import React, { useRef, useState } from 'react';

function App() {
  const videoRef = useRef(null);
  const photoRef = useRef(null);
  const [hasPhoto, setHasPhoto] = useState(false);

  const getVideo = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch(err => {
        console.error("Error accessing camera: ", err);
      });
  };

  const takePhoto = () => {
    const width = 320;
    const height = 240;

    let video = videoRef.current;
    let photo = photoRef.current;

    photo.width = width;
    photo.height = height;

    let ctx = photo.getContext('2d');
    ctx.drawImage(video, 0, 0, width, height);
    setHasPhoto(true);
  };

  const clearPhoto = () => {
    let photo = photoRef.current;
    let ctx = photo.getContext('2d');
    ctx.clearRect(0, 0, photo.width, photo.height);
    setHasPhoto(false);
  };

  return (
    <div className="App">
      <div className="camera">
        <video ref={videoRef}></video>
        <button onClick={getVideo}>Start Camera</button>
        <button onClick={takePhoto}>Take Photo</button>
      </div>

      <div className={'result ' + (hasPhoto ? 'hasPhoto' : '')}>
        <canvas ref={photoRef}></canvas>
        {hasPhoto && <button onClick={clearPhoto}>Clear Photo</button>}
      </div>
    </div>
  );
}

export default App;
