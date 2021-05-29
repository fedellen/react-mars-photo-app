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

  return (
    <section className="flex flex-wrap w-full">
      {" "}
      {photoGroup.map((photo) => (
        <Photo
          key={keyGen()}
          photo={photo}
          currentlySelected={selectedPhoto?.id === photo.id}
          selectPhoto={() =>
            selectedPhoto?.id === photo.id
              ? dispatch({ type: "clearPhoto" })
              : dispatch({ type: "selectPhoto", payload: photo })
          }
        />
      ))}
    </section>
  );
}
