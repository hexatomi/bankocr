import { createContext } from 'react';

export type Context = [state: any, dispatch: any]

export const AppContext = createContext<Context>([{}, () => {}]);