import { useContext } from 'react';
import { AppContext } from '../store/context';
import { AppState } from '../store/reducer';

const styles = {
    container: {
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '2rem'
    },
    row: {
        display: 'flex',
        gap: '1rem',
        padding: '0.25rem',
        letterSpacing: '0.125rem'
    },
} as any;

export default function Results() {
    const [state, _dispatch] = useContext(AppContext);
    const { rawTexts } = state as AppState;

    return (
        <div style={styles.container}>
            
            <h2>RESULTS</h2>

            <ul>
                {Object.entries(rawTexts).map(([key, value]) => {
                    return (
                        <li key={key} style={styles.row}>
                            <span>{value.result}</span>
                            <span>{value.state}</span>
                        </li>
                    );
                })}
            </ul>

        </div>
    );
};