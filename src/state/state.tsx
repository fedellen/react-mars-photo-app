import { createContext, Dispatch, useContext, useReducer } from 'react';
import { marsPhoto } from '../types';
import { Action } from './reducer';

/** Define your state object types */
export type State = {
  /** Current query to API */
  apiQuery: string;
  /** Current data from API */
  apiData: marsPhoto[] | null;
  /** User clicked photo  */
  selectedPhoto: marsPhoto | null;
};

/** Define your initial state */
const initialState: State = {
  apiQuery: 'https://api.nasa.gov/mars-photos/api/v1/rovers/Perseverance/',
  apiData: null,
  selectedPhoto: null
};

/** Create a context with initial state, and a dispatch function */
const StateContext = createContext<[State, Dispatch<Action>]>([
  initialState,
  () => initialState
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
  children
}: StateProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
}
