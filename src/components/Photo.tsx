import { marsPhoto } from "../types";
import PhotoInfo from "./PhotoInfo";

type PhotoProps = {
  photo: marsPhoto;
  currentlySelected: boolean;
  selectPhoto: (photo: marsPhoto) => void;
};

export default function Photo({
  photo,
  currentlySelected,
  selectPhoto,
}: PhotoProps) {
  return (
    <div
      className={`w-full sm:w-1/2 md:w-1/3 p-2   ${
        currentlySelected ? "sm:w-full md:w-full" : ""
      }`}
    >
      <img
        className="rounded-xl w-full shadow-md"
        src={photo.img_src}
        alt={`Photograph from Mars rover ${photo.rover.name}`}
        loading="lazy"
        onClick={() => selectPhoto(photo)}
      />
      {currentlySelected && (
        <div className="mt-3  text-xs sm:text-base lg:text-2xl  translate-y-[-2.65rem] sm:translate-y-[-3.1rem] lg:translate-y-[-4.1rem] transform flex  font-semibold justify-between">
          <PhotoInfo className="rounded-l-none">
            <span>{photo.rover.name} Rover</span>
            <a
              className="underline hover:text-red-600 text-xs lg:text-base"
              href={photo.img_src}
              target="_blank"
              rel="noreferrer"
            >
              Link to Raw Image
            </a>
          </PhotoInfo>
          <PhotoInfo className="rounded-r-none right-[0.005rem]">
            <span>Mars Sol: {photo.sol}</span>
            <span className="text-xs lg:text-base">
              Earth: {photo.earth_date}
            </span>
          </PhotoInfo>
        </div>
      )}
    </div>
  );
}
