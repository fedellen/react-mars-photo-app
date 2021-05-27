import { marsPhoto } from "../types";
import { apiQuery, State } from "./state";

export type Action =
  | { type: "setData"; payload: marsPhoto[] }
  | { type: "selectPhoto"; payload: marsPhoto }
  | { type: "clearPhoto" }
  | { type: "changeQuery"; payload: apiQuery }; // Todo: Define query types

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "setData":
      return {
        ...state,
        apiData: action.payload,
      };

    case "selectPhoto":
      return {
        ...state,
        selectedPhoto: action.payload,
      };

    case "clearPhoto":
      return {
        ...state,
        selectedPhoto: null,
      };

    case "changeQuery":
      return {
        ...state,
        apiQuery: action.payload,
      };

    default:
      return state;
  }
};
