interface RawTextProps {
    text: string;
}

export default function RawText({ text }: RawTextProps) {
    return (
        <pre>{text}</pre>
    );
}