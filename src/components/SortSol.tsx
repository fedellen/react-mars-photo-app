import { useStateValue } from "../state/state";
import Button from "./shared/Button";

export default function SortSol() {
  const [{ apiQuery, roverManifest }, dispatch] = useStateValue();
  const { sol } = apiQuery;

  // User cannot change sol if manifest fails to fetch
  if (!roverManifest) return null;
  const { max_sol } = roverManifest;

  function setSol(direction: "prev" | "next") {
    let newSol: number;

    if (direction === "prev") {
      if (sol === -1) {
        newSol = max_sol - 1;
      } else {
        newSol = sol - 1;
      }
    } else {
      if (sol === max_sol - 1) {
        newSol = -1;
      } else {
        newSol = sol + 1;
      }
    }

    dispatch({ type: "changeQuery", payload: { ...apiQuery, sol: newSol } });
  }

  return (
    <div>
      <h3>
        Displaying photos from{" "}
        {apiQuery.sol === -1 ? "latest sol" : `sol ${apiQuery.sol}`}
      </h3>
      <Button onClick={() => setSol("prev")}>Previous Sol</Button>
      <Button onClick={() => setSol("next")}>Next Sol</Button>
    </div>
  );
}
