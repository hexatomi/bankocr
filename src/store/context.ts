import { createContext } from 'react';
import { AppState } from './reducer';

type Context = [state: AppState, dispatch: Function]

export const AppContext = createContext<Context>([{ rawTexts: {} }, () => { }]);