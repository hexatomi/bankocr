interface RawTextProps {
    text: string;
}

export default function RawText({ text }: RawTextProps) {
    return (
        <pre>raw text {text}</pre>
    );
}