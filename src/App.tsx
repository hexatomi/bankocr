import FileProcessor from "./components/FileProcessor.tsx";

const styles = {
  container : {
    padding: '2rem 4rem',
    display: 'flex',
    'flex-direction' : 'column',
    alignItems: 'center',
    width: '100%',
    gap: '2rem'
  }
};

export default function App() {

  return (
    <div style={styles.container}>
      <h1>BANKOCR</h1>
      <FileProcessor />
    </div>
  )
}

/* scan visual effect
scan sound effect */