import React, { useEffect, useState } from 'react';
import './App.css';
import SortButton from './components/SortButton';
import { marsObject, perseveranceCameras } from './types';
import { keyGen } from './utils/keyGen';

const marsApi = `https://api.nasa.gov/mars-photos/api/v1/rovers/Perseverance/latest_photos?api_key=DEMO_KEY`;

function App() {
  const [marsData, setMarsData] = useState<marsObject | null>(null);
  const [currentCamera, setCurrentCamera] =
    useState<perseveranceCameras | 'all'>('all');

  async function fetchData() {
    try {
      const response: marsObject = await (await fetch(marsApi)).json();
      setMarsData(response);
    } catch (err) {
      console.error('Failed to fetch Mars API ', err);
    }
  }

  function toggleCamera(camera: perseveranceCameras | 'all') {
    setCurrentCamera(camera);
  }

  console.log(marsData);
  console.log(currentCamera);
  useEffect(() => {
    fetchData();
  }, []);

  const cameraSorted = marsData?.latest_photos.filter(
    (obj) => obj.camera.name === currentCamera
  );

  const displayedImageUri: string[] = marsData
    ? currentCamera === 'all'
      ? marsData.latest_photos.map((data) => data.img_src)
      : cameraSorted
      ? cameraSorted.map((data) => data.img_src)
      : []
    : [];

  return (
    <div className='App'>
      <h1 style={{ fontSize: '4em', marginLeft: '2em' }}>
        Latest photos from Mars 🚀
      </h1>
      <div>
        <h3>Sort by Camera</h3>
        <ul
          style={{
            display: 'flex',
            flexDirection: 'row',
            listStyle: 'none',
            // alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <SortButton camera='MCZ_LEFT' setCamera={toggleCamera} />
          <SortButton camera='MCZ_RIGHT' setCamera={toggleCamera} />
          <SortButton camera='NAVCAM_LEFT' setCamera={toggleCamera} />
          <SortButton camera='NAVCAM_RIGHT' setCamera={toggleCamera} />
          <SortButton camera='SUPERCAM_RMI' setCamera={toggleCamera} />
          <SortButton camera='all' setCamera={toggleCamera} />
        </ul>
      </div>
      {displayedImageUri.map((url) => (
        <img className='photo' src={url} key={keyGen()} alt='Mars photos' />
      ))}
    </div>
  );
}

export default App;
