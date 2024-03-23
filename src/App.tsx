import { useReducer } from 'react';
import { appReducer, initialState } from './store/reducer.ts';
import { AppContext } from "./store/context.ts";
import FileProcessor from "./components/FileProcessor.tsx";

const styles = {
  container: {
    width: '100%',
    padding: '2rem 4rem',
  },
  title: {
    marginBottom: '2rem',
    textAlign: 'center'
  }
} as any;

export default function App() {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>BANKOCR</h1>
      <AppContext.Provider value={[state, dispatch]}>
        <FileProcessor />
      </AppContext.Provider>
    </div>
  )
}