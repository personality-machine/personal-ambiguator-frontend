import React from 'react';
import domtoimage from 'dom-to-image';
import Button from '@mui/material/Button';

const Display = ({contrast,brightness,saturate,imgSrc,videoSrc, recordVideo, capturePhoto}) => {
    const filters = {
        filter: `contrast(${contrast}%) brightness(${brightness}%) saturate(${saturate}%)`
    };

    const convertToJpeg = () => {
      let node = document.getElementById('image-node');
      domtoimage.toJpeg(node).then(function (imgSrc){
        var link = document.createElement('a');
        link.download = 'image.jpeg';
        link.href = imgSrc;
        // send to the backend
        link.click();
      }).catch (function (error) {
        console.error(error);
      })
    }

    return (
        <div>
          {imgSrc && capturePhoto &&
          ([<div id="image-node">
            <img src={imgSrc} alt="" style={filters} width="100%"/>
            </div>, <Button onClick={convertToJpeg}>Download Image</Button>])}
          
          {videoSrc && recordVideo &&
          ([<div id="video-node">
            <video controls width="100%" style={filters}>
            <source src={videoSrc} type="video/webm"></source></video>
            </div>, <Button onClick={convertToJpeg}>Download Video</Button>]
            )
          }
        </div>
    );
}

export default Display
