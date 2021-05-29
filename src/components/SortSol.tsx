import { useState } from "react";
import { useStateValue } from "../state/state";
import Button from "./shared/Button";
import SortHeading from "./shared/SortHeading";

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
    <div className="flex flex-wrap mb-4">
      <div className="mr-4">
        <SortHeading heading="Switch sol:" />
        <div className=" space-x-2">
          <Button onClick={() => setSol("prev")}>Previous</Button>
          <Button onClick={() => setSol("next")}>Next</Button>
        </div>
      </div>
      <div>
        <SortHeading heading="Specific sol:" />
        <div className="flex space-x-2">
          <input
            className="bg-bg placeholder-medium p-2 text-xs lg:text-sm rounded-full w-16 shadow-md"
            placeholder={`0-${max_sol}`}
            onChange={(e) => {
              setInputSol(e.target.value);
              if (errorMessage) setErrorMessage(null);
            }}
          />
          <Button onClick={() => setSol(Math.round(Number(inputSol)))}>
            Set
          </Button>
        </div>
        {errorMessage && <span>{errorMessage}</span>}
      </div>
    </div>
  );
}
