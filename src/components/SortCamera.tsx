import { perseveranceCameras } from "../types";

type SortCameraProps = {
  camera: perseveranceCameras | "all";
  setCamera: (camera: perseveranceCameras | "all") => void;
};

export default function SortCamera({ camera, setCamera }: SortCameraProps) {
  return (
    <li>
      <button
        onClick={() => setCamera(camera)}
        aria-label={`Show latest photos from ${camera}`}
      >
        {camera}
      </button>
    </li>
  );
}
