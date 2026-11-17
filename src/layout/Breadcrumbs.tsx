import { Link } from "react-router-dom";
import type { Crumb } from "@/lib/seo";

const Breadcrumbs = ({ items }: { items: Crumb[] }) => (
  <nav aria-label="Você está em" className="text-sm text-muted-foreground">
    <ol className="flex flex-wrap items-center gap-1.5">
      {items.map((c, i) => (
        <li key={c.path} className="flex items-center gap-1.5">
          {i > 0 && <span aria-hidden>/</span>}
          {i === items.length - 1 ? (
            <span aria-current="page" className="text-foreground/80">{c.name}</span>
          ) : (
            <Link to={c.path} className="hover:text-accent">{c.name}</Link>
          )}
        </li>
      ))}
    </ol>
  </nav>
);

export default Breadcrumbs;
