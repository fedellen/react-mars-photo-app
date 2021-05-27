import { useQuery } from "react-query";
import { useStateValue } from "../state/state";
import { isLatest, latestObject, solObject } from "../types";
import fetchFrom from "../utils/fetchFrom";

const baseMarsApi = "https://mars-photos.herokuapp.com/api/v1/";

export default function useMarsQuery() {
  const [{ apiQuery }, dispatch] = useStateValue();
  const { rover, sol } = apiQuery;
  const latestPhotos = sol === -1;

  const currentQuery = `
  ${baseMarsApi}/rovers/${rover}/${latestPhotos ? "latest_photos" : "photos"}${
    latestPhotos ? "" : `?sol=${sol}`
  }
`;

  function setData(data: latestObject | solObject) {
    if (isLatest(data)) {
      dispatch({ type: "setData", payload: data.latest_photos });
    } else {
      dispatch({ type: "setData", payload: data.photos });
    }
  }
  const { error } = useQuery<latestObject | solObject>(
    `marsPhotos-${rover}-sol`,
    () => fetchFrom(currentQuery),
    { onSuccess: (data) => setData(data) }
  );
  if (error) console.error("Error on photo query", error);
}
