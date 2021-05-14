import { perseveranceCameras } from "../types";

type SortButtonProps = {
  camera: perseveranceCameras | "all";
  setCamera: (camera: perseveranceCameras | "all") => void;
};

export default function SortButton({ camera, setCamera }: SortButtonProps) {
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
