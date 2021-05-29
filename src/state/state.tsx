import { createContext, Dispatch, useContext, useReducer } from "react";
import { marsPhoto, roverCameras, roverManifest, roverNames } from "../types";
import { Action } from "./reducer";

export type apiQuery = { rover: roverNames; sol: number };

/** Define your state object types */
export type State = {
  /** Current query to API, -1 sol is `latest_photos` */
  apiQuery: apiQuery;
  /** Current data from API */
  apiData: marsPhoto[] | null;
  /** Current manifest */
  roverManifest: roverManifest | null;
  /** User clicked photo  */
  selectedPhoto: marsPhoto | null;
  /** Camera displayed */
  currentCamera: roverCameras | "all";
};

/** Define your initial state */
const initialState: State = {
  roverManifest: null,
  apiQuery: { rover: "Perseverance", sol: -1 },
  apiData: null,
  selectedPhoto: null,
  currentCamera: "all",
};

/** Create a context with initial state, and a dispatch function */
const StateContext = createContext<[State, Dispatch<Action>]>([
  initialState,
  () => initialState,
]);

/**
 *  Export easier to use context hook
 *  @example
 *  const [{ apiQuery, selectedPhoto  }, dispatch] = useStateValue()
 */
export const useStateValue = () => useContext(StateContext);

type StateProviderProps = {
  reducer: React.Reducer<State, Action>;
  children: React.ReactNode;
};

/** Create provider to wrap app in */
export default function StateProvider({
  reducer,
  children,
}: StateProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
}
