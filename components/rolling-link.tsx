import type { CSSProperties } from "react";

interface RollingLinkProps {
  href: string;
  label: string;
}

function LetterRow({ label }: { label: string }) {
  return (
    <>
      {Array.from(label).map((letter, index) => (
        <span
          className="rolling-letter"
          style={{ "--letter-index": index } as CSSProperties}
          key={`${letter}-${index}`}
        >
          {letter === " " ? "\u00a0" : letter}
        </span>
      ))}
    </>
  );
}

export function RollingLink({ href, label }: RollingLinkProps) {
  return (
    <a className="rolling-link" href={href} aria-label={label}>
      <span className="rolling-line rolling-line-current" aria-hidden="true">
        <LetterRow label={label} />
      </span>
      <span className="rolling-line rolling-line-next" aria-hidden="true">
        <LetterRow label={label} />
      </span>
    </a>
  );
}
