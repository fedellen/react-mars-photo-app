import { useEffect } from "react";
import { useQuery } from "react-query";
import { useStateValue } from "../state/state";
import { isLatest, latestObject, manifestObject, solObject } from "../types";
import fetchFrom from "../utils/fetchFrom";

// Top secret API key
const baseMarsApi = "https://mars-photos.herokuapp.com/api/v1/";

/** Sets cache to be stale and dropped after 30 minutes to limit API calls */
const queryOptions = { staleTime: 1000 * 60 * 30, cacheTime: 1000 * 60 * 30 }; // 30 minutes

/**
 * Fetches the current marsPhoto[] and roverManifest
 * from the mars-photo-api and updates the state
 */
export default function useMarsQuery() {
  const [{ apiQuery }, dispatch] = useStateValue();
  const { rover, sol } = apiQuery;
  const latestPhotos = sol === -1;

  /** Determines object shape and dispatches photo data to state */
  function setData(data: latestObject | solObject) {
    // Use type guard to check shape:
    if (isLatest(data)) {
      dispatch({ type: "setData", payload: data.latest_photos });
    } else {
      dispatch({ type: "setData", payload: data.photos });
    }
  }

  // Create query from state value
  const currentQuery = `
  ${baseMarsApi}/rovers/${rover}/${latestPhotos ? "latest_photos" : "photos"}${
    latestPhotos ? "" : `?sol=${sol}`
  }
`;

  // Get current query, from cache if available.
  // Will re-fire when `rover` or `sol` change
  const { error, data } = useQuery<latestObject | solObject>(
    ["marsPhotos", rover, sol],
    () => fetchFrom(currentQuery),
    queryOptions
  );
  if (error) console.error("Error on photo query", error);

  // When photo data changes, dispatch the new data
  useEffect(() => {
    if (data) setData(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  // And do these same steps for the current manifest:
  const manifestQuery = `${baseMarsApi}/manifests/${rover}`;
  const { error: manifestError, data: manifestData } = useQuery<manifestObject>(
    ["roverManifest", rover],
    () => fetchFrom(manifestQuery),
    queryOptions
  );
  if (manifestError) console.error("Error on manifest query", manifestError);
  useEffect(() => {
    if (manifestData)
      dispatch({ type: "setManifest", payload: manifestData.photo_manifest });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [manifestData]);
}
