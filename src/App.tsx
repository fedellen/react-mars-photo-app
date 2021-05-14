import { useEffect, useState } from "react";
import "./style/App.css";
import SortButton from "./components/SortButton";
import {
  latestObject,
  perseveranceCameras,
  solObject,
  roverNames,
  marsPhoto,
} from "./types";
import DisplayPhotoGroup from "./components/DisplayPhotoGroup";
import { useStateValue } from "./state/state";
import useMarsQuery from "./hooks/useMarsQuery";

function App() {
  const [{ apiData }] = useStateValue();
  useMarsQuery();

  /** Current camera to display */
  const [currentCamera, setCurrentCamera] =
    useState<perseveranceCameras | "all">("all");

  // /** Current sol, -1 is latest_photos endpoint */
  // const [sol, setSol] = useState(-1);
  // /** Current rover to display */
  // const [rover, setRover] = useState<roverNames>("Perseverance");

  function toggleCamera(camera: perseveranceCameras | "all") {
    setCurrentCamera(camera);
  }

  const displayGroup =
    currentCamera === "all"
      ? apiData
      : apiData?.filter((obj) => obj.camera.name === currentCamera);

  return (
    <div className="App">
      <h1>Latest photos from Mars 🚀</h1>
      <div className="sortByCamera">
        <h3>Sort by Camera</h3>
        <ul>
          <SortButton camera="MCZ_LEFT" setCamera={toggleCamera} />
          <SortButton camera="MCZ_RIGHT" setCamera={toggleCamera} />
          <SortButton camera="NAVCAM_LEFT" setCamera={toggleCamera} />
          <SortButton camera="NAVCAM_RIGHT" setCamera={toggleCamera} />
          <SortButton camera="SUPERCAM_RMI" setCamera={toggleCamera} />
          <SortButton camera="all" setCamera={toggleCamera} />
        </ul>
      </div>
      {displayGroup && <DisplayPhotoGroup photoGroup={displayGroup} />}
    </div>
  );
}

export default App;
