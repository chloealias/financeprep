import { Link } from "@tanstack/react-router";
import { splitDealRefs } from "@/lib/split-deal-refs";

type DealRefTextProps = {
  text: string;
  className?: string;
};

/** Affiche un texte en transformant les références « deal d02 » / « d02 » en liens Actualité. */
export function DealRefText({ text, className }: DealRefTextProps) {
  const parts = splitDealRefs(text);
  if (parts.length === 1 && parts[0]?.type === "text") {
    return <span className={className}>{text}</span>;
  }

  return (
    <span className={className}>
      {parts.map((part, i) =>
        part.type === "text" ? (
          <span key={i}>{part.value}</span>
        ) : (
          <Link
            key={i}
            to="/actualite"
            search={{ deal: part.id }}
            className="text-primary hover:text-primary/80 underline underline-offset-2 font-medium"
          >
            deal {part.id}
          </Link>
        ),
      )}
    </span>
  );
}
