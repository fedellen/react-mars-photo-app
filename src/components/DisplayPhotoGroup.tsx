import { useStateValue } from "../state/state";
import { marsPhoto } from "../types";
import { keyGen } from "../utils/keyGen";
import Photo from "./Photo";

type DisplayPhotoGroupProps = {
  photoGroup: marsPhoto[];
};

export default function DisplayPhotoGroup({
  photoGroup,
}: DisplayPhotoGroupProps) {
  const [{ selectedPhoto }, dispatch] = useStateValue();
  const photoGroupSection = document.getElementById("photoGroup");

  function selectPhoto(photo: marsPhoto) {
    if (selectedPhoto?.id === photo.id) {
      dispatch({ type: "clearPhoto" });
    } else {
      dispatch({ type: "selectPhoto", payload: photo });
      setTimeout(() => {
        const photoDiv = photoGroupSection?.children[photoGroup.indexOf(photo)];
        photoDiv?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 10);
    }
  }

  return (
    <section id="photoGroup" className="flex flex-wrap w-full">
      {" "}
      {photoGroup.map((photo) => (
        <Photo
          key={keyGen()}
          photo={photo}
          currentlySelected={selectedPhoto?.id === photo.id}
          selectPhoto={() => selectPhoto(photo)}
        />
      ))}
    </section>
  );
}
