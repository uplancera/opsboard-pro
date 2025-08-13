import { ReactNode } from "react";
import { TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function MetricCard({ label, value, delta, icon }: { label: string; value: string; delta?: string; icon?: ReactNode }) {
  return (
    <Card className="min-h-[148px]">
      <CardContent className="flex h-full flex-col justify-between p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-slate-500">{label}</p>
            <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">{value}</p>
          </div>
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">{icon ?? <TrendingUp className="h-5 w-5" />}</div>
        </div>
        {delta ? <p className="mt-6 text-sm font-medium text-emerald-600">{delta}</p> : null}
      </CardContent>
    </Card>
  );
}

// history:035 2025-02-14
// history:061 2025-03-17
// history:072 2025-03-31
// history:089 2025-04-19
// history:090 2025-04-21
// history:181 2025-08-08
// history:185 2025-08-13