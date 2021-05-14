import { useEffect } from "react";
import { useStateValue } from "../state/state";
import { latestObject, solObject } from "../types";

export default function useMarsQuery() {
  const [{ apiQuery }, dispatch] = useStateValue();

  const baseMarsApi = "https://mars-photos.herokuapp.com/api/v1/";
  const { rover, sol } = apiQuery;

  /** Get all manifest data on mount */
  // useEffect(() => {}, [])

  /** Get new marsPhoto data when rover or sol change */
  useEffect(() => {
    async function fetchData() {
      console.log("Sending query");
      try {
        const currentQuery = `
          ${baseMarsApi}/rovers/${rover}/${
          sol === -1 ? "latest_photos" : "photos"
        }${sol === -1 ? "" : `?sol=${sol}`}
        `;

        if (sol === -1) {
          const response: latestObject = await (
            await fetch(currentQuery)
          ).json();
          dispatch({ type: "setData", payload: response.latest_photos });
        } else {
          const response: solObject = await (await fetch(currentQuery)).json();
          dispatch({ type: "setData", payload: response.photos });
        }
      } catch (err) {
        console.error("Failed to fetch Mars API ", err);
      }
    }
    fetchData();
  }, [rover, sol, dispatch]);
}
