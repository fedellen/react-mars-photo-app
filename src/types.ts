export type perseveranceCameras =
  | 'EDL_RUCAM'
  | 'EDL_RDCAM'
  | 'EDL_DDCAM'
  | 'EDL_PUCAM1'
  | 'EDL_PUCAM2'
  | 'NAVCAM_LEFT'
  | 'NAVCAM_RIGHT'
  | 'MCZ_RIGHT'
  | 'MCZ_LEFT'
  | 'FRONT_HAZCAM_LEFT_A'
  | 'FRONT_HAZCAM_RIGHT_A'
  | 'REAR_HAZCAM_LEFT'
  | 'REAR_HAZCAM_RIGHT'
  | 'SKYCAM'
  | 'SHERLOC_WATSON'
  | 'SUPERCAM_RMI';

/** Type for /Perseverance/latest_photos endpoint */
export type marsObject = {
  latest_photos: [
    {
      id: number;
      sol: number;
      img_src: string;
      earth_date: string;
      rover: {
        id: number;
        landing_date: string;
        launch_date: string;
        name: string;
        status: string;
      };
      camera: {
        full_name: string;
        id: number;
        rover_id: number;
        name: perseveranceCameras;
      };
    }
  ];
};
