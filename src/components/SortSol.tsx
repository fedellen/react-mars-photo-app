import { useState } from "react";
import { useStateValue } from "../state/state";
import Button from "./shared/Button";

export default function SortSol() {
  const [{ apiQuery, roverManifest }, dispatch] = useStateValue();
  const [inputSol, setInputSol] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // User cannot change sol if manifest fails to fetch
  if (!roverManifest) return null;

  const { max_sol } = roverManifest;
  const solErrorMessage = `Must be a number between 0-${max_sol}`;
  const { sol } = apiQuery;

  function setSol(direction: "prev" | "next" | number) {
    let newSol: number;

    if (direction === "prev") {
      if (sol === -1) {
        newSol = max_sol - 1;
      } else {
        newSol = sol - 1;
      }
    } else if (direction === "next") {
      if (sol === max_sol - 1) {
        newSol = -1;
      } else {
        newSol = sol + 1;
      }
    } else {
      if (isNaN(direction) || direction < -1 || direction > max_sol) {
        setErrorMessage(solErrorMessage);
        return;
      } else {
        newSol = direction;
      }
    }

    dispatch({ type: "changeQuery", payload: { ...apiQuery, sol: newSol } });
  }

  return (
    <div>
      <h3>Change sol:</h3>
      <Button onClick={() => setSol("prev")}>Previous sol</Button>
      <Button onClick={() => setSol("next")}>Next sol</Button>
      <input
        className="bg-dark p-3 rounded-full"
        placeholder={`Sol between 0 and ${max_sol}`}
        onChange={(e) => {
          setInputSol(e.target.value);
          if (errorMessage) setErrorMessage(null);
        }}
      />
      {errorMessage && <span>{errorMessage}</span>}
      <Button onClick={() => setSol(Math.round(Number(inputSol)))}>
        Go to sol
      </Button>
    </div>
  );
}
