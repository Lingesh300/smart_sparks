import React from 'react';
import katex from 'katex';

interface MathRendererProps {
  content: string;
  className?: string;
}

/**
 * Robust mathematical and markdown renderer for Math Galaxy.
 * Synchronized for both Light Mode and Dark Mode.
 */
export const MathRenderer: React.FC<MathRendererProps> = ({ content, className = '' }) => {
  if (!content) return null;

  const renderMathSafely = (tex: string, displayMode: boolean): string => {
    try {
      return katex.renderToString(tex.trim(), {
        displayMode,
        throwOnError: false,
        output: 'htmlAndMathml',
      });
    } catch (err) {
      console.warn('KaTeX render error:', err);
      return `<code class="text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/50 px-1.5 py-0.5 rounded font-mono text-xs border border-rose-200 dark:border-rose-800">${escapeHtml(tex)}</code>`;
    }
  };

  function escapeHtml(text: string): string {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  const parseContent = (rawText: string) => {
    let text = rawText.replace(/\\\[([\s\S]*?)\\\]/g, (_, math) => `\n$$${math}$$\n`);
    text = text.replace(/\\\(([\s\S]*?)\\\)/g, (_, math) => `$${math}$`);

    const displayMathRegex = /\$\$([\s\S]*?)\$\$/g;
    const segments: { type: 'text' | 'displayMath'; value: string }[] = [];
    let lastIndex = 0;
    let match;

    while ((match = displayMathRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        segments.push({
          type: 'text',
          value: text.substring(lastIndex, match.index),
        });
      }
      segments.push({
        type: 'displayMath',
        value: match[1],
      });
      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < text.length) {
      segments.push({
        type: 'text',
        value: text.substring(lastIndex),
      });
    }

    return segments.map((seg, segIdx) => {
      if (seg.type === 'displayMath') {
        const html = renderMathSafely(seg.value, true);
        return (
          <div
            key={`display-${segIdx}`}
            className="my-2.5 py-2.5 px-4 bg-blue-50/80 dark:bg-slate-800/90 border border-blue-200/80 dark:border-slate-700 rounded-xl overflow-x-auto text-center text-slate-900 dark:text-cyan-200 shadow-xs"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        );
      }

      return (
        <span key={`text-seg-${segIdx}`}>
          {renderInlineMathAndMarkdown(seg.value, segIdx)}
        </span>
      );
    });
  };

  const renderInlineMathAndMarkdown = (str: string, parentIdx: number) => {
    const inlineMathRegex = /(?<!\\)\$(?!\s)([^$\n]+?)(?<!\s)\$/g;

    const parts: React.ReactNode[] = [];
    let lastPos = 0;
    let m;

    while ((m = inlineMathRegex.exec(str)) !== null) {
      const mathCandidate = m[1];
      const isPureCurrency = /^\d+(\.\d{1,2})?$/.test(mathCandidate.trim());

      if (isPureCurrency) {
        continue;
      }

      if (m.index > lastPos) {
        parts.push(renderMarkdownSpans(str.substring(lastPos, m.index), `${parentIdx}-${lastPos}`));
      }

      const mathHtml = renderMathSafely(mathCandidate, false);
      parts.push(
        <span
          key={`inline-math-${parentIdx}-${m.index}`}
          className="inline-math px-0.5 text-blue-700 dark:text-cyan-300 font-semibold"
          dangerouslySetInnerHTML={{ __html: mathHtml }}
        />
      );

      lastPos = m.index + m[0].length;
    }

    if (lastPos < str.length) {
      parts.push(renderMarkdownSpans(str.substring(lastPos), `${parentIdx}-${lastPos}`));
    }

    return parts;
  };

  const renderMarkdownSpans = (text: string, keyPrefix: string) => {
    const lines = text.split('\n');
    return lines.map((line, lineIdx) => {
      const isBullet = line.trim().startsWith('- ') || line.trim().startsWith('* ');
      const cleanLine = isBullet ? line.trim().substring(2) : line;

      const tokens = cleanLine.split(/(\*\*.*?\*\*|\*.*?\*|`.*?`)/g);

      const renderedLine = tokens.map((tok, tokIdx) => {
        if (tok.startsWith('**') && tok.endsWith('**') && tok.length >= 4) {
          return (
            <strong key={`${keyPrefix}-${lineIdx}-${tokIdx}`} className="font-bold text-slate-900 dark:text-white">
              {tok.slice(2, -2)}
            </strong>
          );
        }
        if (tok.startsWith('*') && tok.endsWith('*') && tok.length >= 2) {
          return (
            <em key={`${keyPrefix}-${lineIdx}-${tokIdx}`} className="italic text-indigo-700 dark:text-indigo-300">
              {tok.slice(1, -1)}
            </em>
          );
        }
        if (tok.startsWith('`') && tok.endsWith('`') && tok.length >= 2) {
          return (
            <code
              key={`${keyPrefix}-${lineIdx}-${tokIdx}`}
              className="bg-slate-100 dark:bg-slate-800 text-blue-800 dark:text-cyan-300 px-1.5 py-0.5 rounded text-xs font-mono border border-slate-200 dark:border-slate-700"
            >
              {tok.slice(1, -1)}
            </code>
          );
        }
        return <span key={`${keyPrefix}-${lineIdx}-${tokIdx}`}>{tok}</span>;
      });

      if (isBullet) {
        return (
          <div key={`${keyPrefix}-line-${lineIdx}`} className="flex items-start gap-2 my-1 pl-2">
            <span className="text-blue-600 dark:text-cyan-400 mt-1 text-xs font-bold">•</span>
            <div className="flex-1">{renderedLine}</div>
          </div>
        );
      }

      if (lineIdx === lines.length - 1) {
        return <span key={`${keyPrefix}-line-${lineIdx}`}>{renderedLine}</span>;
      }

      return (
        <span key={`${keyPrefix}-line-${lineIdx}`}>
          {renderedLine}
          <br />
        </span>
      );
    });
  };

  return (
    <div className={`math-renderer leading-relaxed ${className}`}>
      {parseContent(content)}
    </div>
  );
};

export default MathRenderer;
