function stripInlineMarkdown(text: string) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/__(.*?)__/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/_(.*?)_/g, '$1')
    .replace(/\[(.*?)\]\((.*?)\)/g, '$1');
}

export function RichText({ value }: { value?: string | null }) {
  if (!value) return null;
  const blocks = value.replace(/\r/g, '').split(/\n\s*\n/).map((block) => block.trim()).filter(Boolean);
  return (
    <div className="rich-text">
      {blocks.map((block, index) => {
        if (block.startsWith('### ')) return <h3 key={index}>{stripInlineMarkdown(block.slice(4))}</h3>;
        if (block.startsWith('## ')) return <h2 key={index}>{stripInlineMarkdown(block.slice(3))}</h2>;
        if (block.startsWith('# ')) return <h2 key={index}>{stripInlineMarkdown(block.slice(2))}</h2>;
        if (/^[-*] /.test(block)) {
          const items = block.split('\n').map((line) => line.replace(/^[-*]\s+/, '')).filter(Boolean);
          return <ul key={index}>{items.map((item, itemIndex) => <li key={itemIndex}>{stripInlineMarkdown(item)}</li>)}</ul>;
        }
        return <p key={index}>{stripInlineMarkdown(block.replace(/\n/g, ' '))}</p>;
      })}
    </div>
  );
}
