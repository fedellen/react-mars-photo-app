import { useStateValue } from "../state/state";
import { roverNames, rovers } from "../types";
import { keyGen } from "../utils/keyGen";
import Button from "./shared/Button";

/** Change which rover to currently display photo from */
export default function SortRover() {
  const [{ apiQuery }, dispatch] = useStateValue();
  const { rover: currentRover } = apiQuery;

  function setRover(rover: roverNames) {
    if (currentRover !== rover)
      dispatch({
        type: "changeQuery",
        payload: { rover, sol: -1 }, // -1 sol is `latest_photos`
      });
  }

  return (
    <div>
      <h3>Switch Rover:</h3>
      {rovers
        .filter((r) => r !== currentRover)
        .map((rover) => (
          <Button
            key={keyGen()}
            onClick={() => setRover(rover)}
            aria-label={`Show latest photos from the Mars ${rover} Rover`}
          >
            {rover}
          </Button>
        ))}
    </div>
  );
}
