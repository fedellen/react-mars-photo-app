import { perseveranceCameras } from "../types";
import Button from "./shared/Button";

type SortCameraProps = {
  camera: perseveranceCameras | "all";
  setCamera: (camera: perseveranceCameras | "all") => void;
};

export default function SortCamera({ camera, setCamera }: SortCameraProps) {
  return (
    <li>
      <Button
        onClick={() => setCamera(camera)}
        aria-label={`Show latest photos from ${camera}`}
      >
        {camera}
      </Button>
    </li>
  );
}
