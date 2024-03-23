import { useReducer } from 'react';
import { AppContext } from "./store/context.ts";
import FileProcessor from "./components/FileProcessor.tsx";
import { appReducer, initialState } from './store/reducer.ts';

const styles = {
  container: {
    padding: '2rem 4rem',
    display: 'flex',
    'flex-direction': 'column',
    alignItems: 'center',
    width: '100%',
    gap: '2rem'
  }
};

export default function App() {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <div style={styles.container}>
      <h1>BANKOCR</h1>
      <AppContext.Provider value={[state, dispatch]}>
        <FileProcessor />
      </AppContext.Provider>
    </div>
  )
}

/* scan visual effect
  refactor
*/