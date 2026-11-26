// Article content is plain text: blocks separated by blank lines,
// "## " for headings, "- " for bullet lists, "1. " for numbered lists.
export default function ArticleBody({ content }) {
    const blocks = (content || '').trim().split(/\n\s*\n/);

    return blocks.map((block, i) => {
        const lines = block.split('\n').map(l => l.trim()).filter(Boolean);

        if (lines[0]?.startsWith('## ')) {
            return <h2 key={i} className="text-2xl font-bold text-fg mt-12 mb-4">{lines[0].slice(3)}</h2>;
        }
        if (lines.every(l => l.startsWith('- '))) {
            return (
                <ul key={i} className="list-disc pl-6 space-y-2 my-6 marker:text-accent">
                    {lines.map((l, j) => <li key={j}>{l.slice(2)}</li>)}
                </ul>
            );
        }
        if (lines.every(l => /^\d+\.\s/.test(l))) {
            return (
                <ol key={i} className="list-decimal pl-6 space-y-2 my-6 marker:text-accent">
                    {lines.map((l, j) => <li key={j}>{l.replace(/^\d+\.\s/, '')}</li>)}
                </ol>
            );
        }
        return <p key={i} className="my-5">{lines.join(' ')}</p>;
    });
}
