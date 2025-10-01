import React, { useRef, useState, useEffect } from 'react';
import * as faceapi from 'face-api.js';

export default function FaceDetection() {
  const [imageUrl, setImageUrl] = useState(null);
  const imageRef = useRef();
  const canvasRef = useRef();

  // Load models when component mounts
  useEffect(() => {
    const loadModels = async () => {
      await faceapi.nets.ssdMobilenetv1.loadFromUri('/models');
      console.log('Model Loaded');
    };
    loadModels();
  }, []);

  // Run detection when image is uploaded
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageUrl(URL.createObjectURL(file));
    }
  };

  const handleImageLoad = async () => {
    const detections = await faceapi.detectAllFaces(
      imageRef.current,
      new faceapi.SsdMobilenetv1Options({ minConfidence: 0.2 })
    );
    console.log('detections>>>>>', detections);
    // Resize canvas to match image
    const canvas = canvasRef.current;
    const displaySize = {
      width: imageRef.current.width,
      height: imageRef.current.height,
    };
    faceapi.matchDimensions(canvas, displaySize);

    // Draw detections
    const resized = faceapi.resizeResults(detections, displaySize);
    faceapi.draw.drawDetections(canvas, resized);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <input type="file" accept="image/*" onChange={handleImageChange} />

      {imageUrl && (
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <img
            ref={imageRef}
            src={imageUrl}
            alt="uploaded"
            onLoad={handleImageLoad}
            style={{ maxWidth: '500px', borderRadius: '8px' }}
          />
          <canvas
            ref={canvasRef}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
            }}
          />
        </div>
      )}
    </div>
  );
}
