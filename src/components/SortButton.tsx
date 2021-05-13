import { perseveranceCameras } from '../types';

type SortButtonProps = {
  camera: perseveranceCameras | 'all';
  setCamera: (camera: perseveranceCameras | 'all') => void;
};

export default function SortButton({ camera, setCamera }: SortButtonProps) {
  return (
    <li style={{ padding: '.4em' }}>
      <button
        onClick={() => setCamera(camera)}
        aria-label={`Show latest photos from ${camera}`}
        style={{
          borderRadius: '999em',
          padding: '.6em',
          fontSize: '1em',
          fontWeight: 600,
          backgroundColor: 'orangered',
          boxShadow: '2px 2px 3px black'
        }}
      >
        {camera}
      </button>
    </li>
  );
}
