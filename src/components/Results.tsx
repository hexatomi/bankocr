import { RawTextValue } from './FileProcessor';

interface ResultsProps {
    rawTexts: Record<string, RawTextValue>
}

export default function Results({ rawTexts }: ResultsProps) {
    return (
        <div>results
            <ul>
                {Object.entries(rawTexts).map(([key, value]) => {
                    return (
                        <li key={key}>
                            <span>{key}</span>
                            <span>{value.result}</span>
                            <span>{value.checksum}</span>
                            <span>{value.state}</span>
                        </li>
                    );
                })}
            </ul>

        </div>
    );
};