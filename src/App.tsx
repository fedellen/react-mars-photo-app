import { useEffect, useState } from 'react';
import './App.css';

const marsApi = `https://api.nasa.gov/mars-photos/api/v1/rovers/Perseverance/latest_photos?api_key=DEMO_KEY`;

type marsObject = {
  latest_photos: [
    {
      id: number;
      sol: number;
      img_src: string;
      earth_date: string;
      rover: {
        id: number;
        landing_date: string;
        launch_date: string;
        name: string;
        status: string;
      };
    }
  ];
};

function App() {
  const [marsData, setMarsData] = useState<marsObject | null>(null);

  async function fetchData() {
    try {
      const response: marsObject = await (await fetch(marsApi)).json();
      setMarsData(response);
    } catch (err) {
      console.error('Failed to fetch Mars API ', err);
    }
  }

  console.log(marsData);

  useEffect(() => {
    fetchData();
  }, []);

  // const trimmedData = marsData?.photos.slice(0, 20);

  // console.log(trimmedData);

  const displayUrls: string[] = marsData
    ? marsData.latest_photos.slice(0, 20).map((data) => data.img_src)
    : [];

  let key = 0;
  const keyGen = () => {
    key++;
    return key;
  };

  return (
    <div className='App'>
      <h1>Latest photos from Mars</h1>
      {displayUrls.map((url) => (
        <img className='photo' src={url} key={keyGen()} alt='Mars photos' />
      ))}
    </div>
  );
}

export default App;
