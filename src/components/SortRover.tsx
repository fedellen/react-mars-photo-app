import { useStateValue } from "../state/state";
import { roverNames } from "../types";
import { keyGen } from "../utils/keyGen";
import Button from "./shared/Button";

type RoverButtonProps = {
  rover: roverNames;
  setRover: (rover: roverNames) => void;
};

function RoverButton({ rover, setRover }: RoverButtonProps) {
  return (
    <Button
      onClick={() => setRover}
      aria-label={`Show latest photos from the Mars ${rover} Rover`}
    >
      {rover}
    </Button>
  );
}

export default function SortRover() {
  const [{ apiQuery }, dispatch] = useStateValue();

  function setRover(rover: roverNames) {
    if (apiQuery.rover !== rover)
      dispatch({
        type: "changeQuery",
        payload: { rover: rover, sol: -1 },
      });
  }

  const rovers: roverNames[] = [
    "Curiosity",
    "Opportunity",
    "Perseverance",
    "Spirit",
  ];

  return (
    <div>
      {rovers.map((rover) => (
        <RoverButton key={keyGen()} rover={rover} setRover={setRover} />
      ))}
    </div>
  );
}
