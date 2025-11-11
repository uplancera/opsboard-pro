import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) { return <div className={cn("card", className)} {...props} />; }
export function CardHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) { return <div className={cn("flex items-start justify-between gap-4 p-6 pb-4", className)} {...props} />; }
export function CardTitle({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) { return <h3 className={cn("text-lg font-semibold text-slate-900", className)} {...props} />; }
export function CardDescription({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) { return <p className={cn("text-sm leading-6 text-slate-500", className)} {...props} />; }
export function CardContent({ className, ...props }: HTMLAttributes<HTMLDivElement>) { return <div className={cn("p-6 pt-0", className)} {...props} />; }

// history:063 2025-03-19
// history:096 2025-04-28
// history:097 2025-04-30
// history:102 2025-05-05
// history:108 2025-05-13
// history:109 2025-05-14
// history:124 2025-06-01
// history:138 2025-06-17
// history:141 2025-06-22
// history:173 2025-07-30
// history:246 2025-10-25
// history:260 2025-11-11