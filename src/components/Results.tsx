import { RawTextValue } from './FileProcessor';

interface ResultsProps {
    rawTexts: Record<string, RawTextValue>
}

const styles = {
    container : {
        padding: '2rem',
        display: 'flex',
        'flex-direction' : 'column',
        alignItems : 'center',
        gap : '2rem'
    },
    row : {
        display : 'flex',
        gap : '1rem',
        padding: '0.25rem',
        'letter-spacing' : '0.125rem'
    },
};

export default function Results({ rawTexts }: ResultsProps) {
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