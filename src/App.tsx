import { useState } from "react";
import SortCamera from "./components/SortCamera";
import { perseveranceCameras } from "./types";
import DisplayPhotoGroup from "./components/DisplayPhotoGroup";
import { useStateValue } from "./state/state";
import useMarsQuery from "./hooks/useMarsQuery";
import SortRover from "./components/SortRover";
import Footer from "./components/Footer";
import SortSol from "./components/SortSol";

function App() {
  const [{ apiData }] = useStateValue();
  useMarsQuery();

  /** Current camera to display */
  const [currentCamera, setCurrentCamera] =
    useState<perseveranceCameras | "all">("all");

  function toggleCamera(camera: perseveranceCameras | "all") {
    setCurrentCamera(camera);
  }

  const displayGroup =
    currentCamera === "all"
      ? apiData
      : apiData?.filter((obj) => obj.camera.name === currentCamera);

  return (
    <div>
      <h1 className="text-4xl">Latest photos from Mars 🚀</h1>
      <SortRover />
      <SortSol />
      <div className="sortByCamera">
        <h3>Sort by Camera</h3>
        <ul>
          <SortCamera camera="MCZ_LEFT" setCamera={toggleCamera} />
          <SortCamera camera="MCZ_RIGHT" setCamera={toggleCamera} />
          <SortCamera camera="NAVCAM_LEFT" setCamera={toggleCamera} />
          <SortCamera camera="NAVCAM_RIGHT" setCamera={toggleCamera} />
          <SortCamera camera="SUPERCAM_RMI" setCamera={toggleCamera} />
          <SortCamera camera="all" setCamera={toggleCamera} />
        </ul>
      </div>
      {displayGroup && <DisplayPhotoGroup photoGroup={displayGroup} />}
      <Footer />
    </div>
  );
}

export default App;
