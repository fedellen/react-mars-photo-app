import { ReactNode, useState } from "react";
import { useStateValue } from "../state/state";
import { marsPhoto } from "../types";
import { keyGen } from "../utils/keyGen";

type PhotoProps = {
  photo: marsPhoto;
  currentlySelected: boolean;
  selectPhoto: (photo: marsPhoto) => void;
};

function Photo({ photo, currentlySelected, selectPhoto }: PhotoProps) {
  return (
    <div>
      <img
        className="rounded-xl"
        src={photo.img_src}
        key={keyGen()}
        alt="Photograph from a Mars rover"
        loading="lazy"
        onClick={() => selectPhoto(photo)}
      />
      {currentlySelected && (
        <div className="mt-3 text-2xl translate-y-[-4.1rem] transform flex justify-between font-semibold ">
          <PhotoInfo className="rounded-l-none">
            <span>From the {photo.rover.name} Rover</span>
            <a
              className="underline hover:text-red-600 text-base"
              href={photo.img_src}
            >
              Link to Raw Image
            </a>
          </PhotoInfo>
          <PhotoInfo className="rounded-r-none">
            <span>Mars Sol: {photo.sol}</span>
            <span className="text-base">Earth Date: {photo.earth_date}</span>
          </PhotoInfo>
        </div>
      )}
    </div>
  );
}

type PhotoInfoProps = { children?: ReactNode; className?: string };

function PhotoInfo({ children, className }: PhotoInfoProps) {
  return (
    <div
      className={`flex flex-col bg-bg bg-opacity-80 px-4 rounded-xl rounded-b-none ${className}`}
    >
      {children}
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
    <section className="flex flex-wrap">
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
