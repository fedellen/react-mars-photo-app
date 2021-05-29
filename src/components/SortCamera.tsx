import { useStateValue } from "../state/state";
import { keyGen } from "../utils/keyGen";
import Button from "./shared/Button";
import SortHeading from "./shared/SortHeading";

export default function SortCamera() {
  const [{ roverManifest, apiQuery }, dispatch] = useStateValue();

  // Manifest must be fetched to filter by camera
  if (!roverManifest) return null;

  const { photos, max_sol } = roverManifest;
  const { sol } = apiQuery;
  const filterBySol = sol === -1 ? max_sol : sol;

  const availableCameras = photos.find((p) => p.sol === filterBySol)?.cameras;
  if (!availableCameras) return null;

  const displayCameras = [...availableCameras, "all"] as const;

  return (
    <div>
      <SortHeading heading="Filter by camera:" />
      <div className="flex flex-wrap ">
        {displayCameras.map((camera) => (
          <Button
            onClick={() => dispatch({ type: "setCamera", payload: camera })}
            aria-label={`Show latest photos from ${camera}`}
            className="m-1"
            key={keyGen()}
          >
            {camera}
          </Button>
        ))}
      </div>
    </div>
  );
}
