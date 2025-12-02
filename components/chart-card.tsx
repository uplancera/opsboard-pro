"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, BarChart, Bar, Legend } from "recharts";

export function RevenueChart({ data }: { data: { month: string; revenue: number }[] }) {
  return <Card className="h-full"><CardHeader><div><CardTitle>Revenue trend</CardTitle><CardDescription>Six-month MRR growth snapshot for the demo workspace.</CardDescription></div></CardHeader><CardContent className="h-[300px]"><ResponsiveContainer width="100%" height="100%"><LineChart data={data}><CartesianGrid vertical={false} stroke="rgba(148,163,184,0.18)" /><XAxis dataKey="month" stroke="#64748b" tickLine={false} axisLine={false} /><YAxis stroke="#64748b" tickLine={false} axisLine={false} /><Tooltip contentStyle={{ borderRadius: 16, borderColor: "rgba(148,163,184,0.2)", boxShadow: "0 16px 40px rgba(15,23,42,0.08)" }} /><Line dataKey="revenue" stroke="#2563eb" strokeWidth={3} dot={false} /></LineChart></ResponsiveContainer></CardContent></Card>;
}

export function SupportChart({ data }: { data: { week: string; created: number; resolved: number }[] }) {
  return <Card className="h-full"><CardHeader><div><CardTitle>Support velocity</CardTitle><CardDescription>Created versus resolved tickets by week.</CardDescription></div></CardHeader><CardContent className="h-[300px]"><ResponsiveContainer width="100%" height="100%"><BarChart data={data}><CartesianGrid vertical={false} stroke="rgba(148,163,184,0.18)" /><XAxis dataKey="week" stroke="#64748b" tickLine={false} axisLine={false} /><YAxis stroke="#64748b" tickLine={false} axisLine={false} /><Tooltip contentStyle={{ borderRadius: 16, borderColor: "rgba(148,163,184,0.2)", boxShadow: "0 16px 40px rgba(15,23,42,0.08)" }} /><Legend /><Bar dataKey="created" fill="#2563eb" radius={[8,8,0,0]} /><Bar dataKey="resolved" fill="#10b981" radius={[8,8,0,0]} /></BarChart></ResponsiveContainer></CardContent></Card>;
}

// history:039 2025-02-19
// history:046 2025-02-27
// history:080 2025-04-09
// history:119 2025-05-26
// history:123 2025-05-31
// history:150 2025-07-02
// history:156 2025-07-10
// history:175 2025-08-01
// history:244 2025-10-23
// history:277 2025-12-02