import { useEffect, useState } from 'react';
import './style/App.css';
import SortButton from './components/SortButton';
import {
  latestObject,
  perseveranceCameras,
  solObject,
  roverNames,
  marsPhoto
} from './types';
import DisplayPhotoGroup from './components/DisplayPhotoGroup';

// const marsApi = `https://api.nasa.gov/mars-photos/api/v1/rovers/Perseverance/latest_photos?api_key=DEMO_KEY`;
let marsApi = `https://mars-photos.herokuapp.com/api/v1/rovers/Perseverance/latest_photos`;

function App() {
  const [marsData, setMarsData] = useState<marsPhoto[] | null>(null);

  /** Current camera to display */
  const [currentCamera, setCurrentCamera] =
    useState<perseveranceCameras | 'all'>('all');
  /** Current sol, -1 is latest_photos endpoint */
  const [sol, setSol] = useState(-1);
  /** Current rover to display */
  const [rover, setRover] = useState<roverNames>('Perseverance');

  async function fetchData() {
    try {
      const currentQuery = `https://mars-photos.herokuapp.com/api/v1/rovers/${rover}/${
        sol === -1 ? 'latest_photos' : 'photos'
      }${sol === -1 ? '' : `?sol=${sol}`}`;
      if (sol === -1) {
        const response: latestObject = await (await fetch(currentQuery)).json();
        setMarsData(response.latest_photos);
      } else {
        const response: solObject = await (await fetch(currentQuery)).json();
        setMarsData(response.photos);
      }
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

  const displayGroup =
    currentCamera === 'all'
      ? marsData
      : marsData?.filter((obj) => obj.camera.name === currentCamera);

  return (
    <div className='App'>
      <h1>Latest photos from Mars 🚀</h1>
      <div className='sortByCamera'>
        <h3>Sort by Camera</h3>
        <ul>
          <SortButton camera='MCZ_LEFT' setCamera={toggleCamera} />
          <SortButton camera='MCZ_RIGHT' setCamera={toggleCamera} />
          <SortButton camera='NAVCAM_LEFT' setCamera={toggleCamera} />
          <SortButton camera='NAVCAM_RIGHT' setCamera={toggleCamera} />
          <SortButton camera='SUPERCAM_RMI' setCamera={toggleCamera} />
          <SortButton camera='all' setCamera={toggleCamera} />
        </ul>
      </div>
      {displayGroup && <DisplayPhotoGroup photoGroup={displayGroup} />}
    </div>
  );
}

export default App;
