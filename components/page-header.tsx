import { ReactNode } from "react";
import { Sparkles } from "lucide-react";

export function PageHeader({ eyebrow, title, description, action }: { eyebrow?: string; title: string; description: string; action?: ReactNode }) {
  return (
    <div className="card overflow-hidden p-6 md:p-7">
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div className="max-w-3xl">
          {eyebrow ? <p className="kicker"><Sparkles className="h-3.5 w-3.5" />{eyebrow}</p> : null}
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">{title}</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500 md:text-base">{description}</p>
        </div>
        {action ? <div className="shrink-0">{action}</div> : null}
      </div>
    </div>
  );
}

// history:017 2025-01-24
// history:048 2025-03-01