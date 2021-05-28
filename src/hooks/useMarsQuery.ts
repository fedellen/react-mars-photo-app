import { useEffect } from "react";
import { useQuery } from "react-query";
import { useStateValue } from "../state/state";
import { isLatest, latestObject, solObject } from "../types";
import fetchFrom from "../utils/fetchFrom";

// Top secret API key
const baseMarsApi = "https://mars-photos.herokuapp.com/api/v1/";

export default function useMarsQuery() {
  const [{ apiQuery }, dispatch] = useStateValue();
  const { rover, sol } = apiQuery;
  const latestPhotos = sol === -1;

  // Create query from state value
  const currentQuery = `
  ${baseMarsApi}/rovers/${rover}/${latestPhotos ? "latest_photos" : "photos"}${
    latestPhotos ? "" : `?sol=${sol}`
  }
`;

  const { error, data } = useQuery<latestObject | solObject>(
    ["marsPhotos", rover, sol],
    () => fetchFrom(currentQuery),
    {
      // Cache is stale and dropped after 30 minutes
      staleTime: 1000 * 60 * 30,
      cacheTime: 1000 * 60 * 30,
    }
  );
  if (error) console.error("Error on photo query", error);

  function setData(data: latestObject | solObject) {
    // Use type guard to check shape
    if (isLatest(data)) {
      dispatch({ type: "setData", payload: data.latest_photos });
    } else {
      dispatch({ type: "setData", payload: data.photos });
    }
  }

  // When data changes, dispatch the data
  useEffect(() => {
    if (data) setData(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
}
