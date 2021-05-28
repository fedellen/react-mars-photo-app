import { useEffect } from "react";
import { useQuery } from "react-query";
import { useStateValue } from "../state/state";
import {
  isLatest,
  latestObject,
  manifestObject,
  roverManifest,
  solObject,
} from "../types";
import fetchFrom from "../utils/fetchFrom";

// Top secret API key
const baseMarsApi = "https://mars-photos.herokuapp.com/api/v1/";
const thirtyMinutes = 1000 * 60 * 30;

export default function useMarsQuery() {
  const [{ apiQuery }, dispatch] = useStateValue();
  const { rover, sol } = apiQuery;
  const latestPhotos = sol === -1;

  /** Determines shape then dispatches photo data to state */
  function setData(data: latestObject | solObject) {
    // Use type guard to check shape
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

  // Get current query, from cache if available
  const { error, data } = useQuery<latestObject | solObject>(
    ["marsPhotos", rover, sol],
    () => fetchFrom(currentQuery),
    // Cache is stale and dropped after 30 minutes
    { staleTime: thirtyMinutes, cacheTime: thirtyMinutes }
  );
  if (error) console.error("Error on photo query", error);

  // When data changes, dispatch the data
  useEffect(() => {
    if (data) setData(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  // And do these same steps for the current manifest, but more verbose:
  const manifestQuery = `${baseMarsApi}/manifests/${rover}`;
  const { error: manifestError, data: manifestData } = useQuery<manifestObject>(
    ["roverManifest", rover],
    () => fetchFrom(manifestQuery),
    { staleTime: thirtyMinutes, cacheTime: thirtyMinutes }
  );
  if (manifestError) console.error("Error on manifest query", manifestError);
  useEffect(() => {
    if (manifestData)
      dispatch({ type: "setManifest", payload: manifestData.photo_manifest });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [manifestData]);
}
