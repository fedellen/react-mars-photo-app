import { marsPhoto } from '../types';
import { keyGen } from '../utils/keyGen';

type DisplayPhotoGroupProps = {
  photoGroup: marsPhoto[];
};

export default function DisplayPhotoGroup({
  photoGroup
}: DisplayPhotoGroupProps) {
  return (
    <section className='photoGroup'>
      {' '}
      {photoGroup.map((photo) => (
        <img
          className='photo'
          src={photo.img_src}
          key={keyGen()}
          alt='Photograph from a Mars rover'
        />
      ))}
    </section>
  );
}
