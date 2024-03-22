import { RawTextValue } from './FileProcessor';

interface ResultsProps {
    rawTexts: Record<string, RawTextValue>
}

const styles = {
    row : {
        display : 'flex',
        gap : '1rem'
    },
};

export default function Results({ rawTexts }: ResultsProps) {
    return (
        <div>results
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