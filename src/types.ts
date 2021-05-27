export type perseveranceCameras =
  | "EDL_RUCAM"
  | "EDL_RDCAM"
  | "EDL_DDCAM"
  | "EDL_PUCAM1"
  | "EDL_PUCAM2"
  | "NAVCAM_LEFT"
  | "NAVCAM_RIGHT"
  | "MCZ_RIGHT"
  | "MCZ_LEFT"
  | "FRONT_HAZCAM_LEFT_A"
  | "FRONT_HAZCAM_RIGHT_A"
  | "REAR_HAZCAM_LEFT"
  | "REAR_HAZCAM_RIGHT"
  | "SKYCAM"
  | "SHERLOC_WATSON"
  | "SUPERCAM_RMI";

export type curiosityCameras =
  | "FHAZ"
  | "RHAZ"
  | "MAST"
  | "CHEMCAM"
  | "MAHLI"
  | "MARDI"
  | "NAVCAM";

export type opportunitySpiritCameras =
  | "FHAZ"
  | "RHAZ"
  | "NAVCAM"
  | "PANCAM"
  | "MINITES";

/** All rover names in a readonly array */
export const rovers = [
  "Curiosity",
  "Opportunity",
  "Perseverance",
  "Spirit",
] as const;

/** Union type of rover name array */
export type roverNames = typeof rovers[number];

type roverStatus = "active" | "complete";

export interface roverManifest extends marsRover {
  max_sol: number;
  max_date: string;
  total_photos: number;
  photos: {
    sol: number;
    earth_date: string;
    total_photos: 3702;
    cameras: perseveranceCameras | curiosityCameras | opportunitySpiritCameras;
  };
}

/** Types for mars rover  /Perseverance/ endpoint */
export type latestObject = {
  latest_photos: marsPhoto[];
};

export type solObject = {
  photos: marsPhoto[];
};

/** Type-guard for returned marsObject */
export function isLatest(
  marsObject: latestObject | solObject
): marsObject is latestObject {
  return (marsObject as latestObject).latest_photos !== undefined;
}

export type marsPhoto = {
  id: number;
  sol: number;
  img_src: string;
  earth_date: string;
  rover: marsRover;
  camera: roverCamera;
};

interface marsRover {
  landing_date: string;
  launch_date: string;
  name: roverNames;
  status: roverStatus;
}

type roverCamera = {
  full_name: string;
  id: number;
  rover_id: number;
  name: perseveranceCameras;
};
