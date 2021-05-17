import { useState } from "react";
import { useStateValue } from "../state/state";
import { marsPhoto } from "../types";
import { keyGen } from "../utils/keyGen";

type PhotoProps = {
  photo: marsPhoto;
  currentlySelected: boolean;
  selectPhoto: () => void;
};

function Photo({ photo, currentlySelected, selectPhoto }: PhotoProps) {
  const [zoom, setZoom] = useState(false);

  return (
    <div className={currentlySelected ? `active ${zoom ? "zoom" : ""}` : ""}>
      <img
        className={`photo`}
        src={photo.img_src}
        key={keyGen()}
        alt="Photograph from a Mars rover"
        loading="lazy"
        onClick={() => (currentlySelected ? setZoom(!zoom) : selectPhoto())}
      />
      {currentlySelected && (
        <ul>
          <li>Rover: {photo.rover.name}</li>
          <li>Mars Sol: {photo.sol}</li>
          <li>Earth Date: {photo.earth_date}</li>
          <li>
            <a href={photo.img_src}>Link to Raw Image</a>
          </li>
        </ul>
      )}
    </div>
  );
}

type DisplayPhotoGroupProps = {
  photoGroup: marsPhoto[];
};

export default function DisplayPhotoGroup({
  photoGroup,
}: DisplayPhotoGroupProps) {
  const [{ selectedPhoto }, dispatch] = useStateValue();
  return (
    <section className="photoGroup">
      {" "}
      {photoGroup.map((photo) => (
        <Photo
          key={keyGen()}
          photo={photo}
          currentlySelected={selectedPhoto?.id === photo.id}
          selectPhoto={() => dispatch({ type: "selectPhoto", payload: photo })}
        />
        // <div>
        //   <img
        //     className="photo"
        //     src={photo.img_src}
        //     key={keyGen()}
        //     alt="Photograph from a Mars rover"
        //     loading="lazy"
        //     onClick={() => dispatch({ type: "selectPhoto", payload: photo })}
        //   />
        //   {selectedPhoto?.id === photo.id && (
        //     <ul>
        //       <li>Rover: {photo.rover.name}</li>
        //       <li>Mars Sol-{photo.sol}</li>
        //       <li>Earth Date: {photo.earth_date}</li>
        //       <li>
        //         <a href={photo.img_src}>Link to Raw Image</a>
        //       </li>
        //     </ul>
        //   )}
        // </div>
      ))}
    </section>
  );
}
