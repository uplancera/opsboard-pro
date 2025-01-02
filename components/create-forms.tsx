"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";

type FormState = { success?: boolean; message?: string };

export function CreateCustomerForm() {
  const [state, setState] = useState<FormState>({});
  const [pending, setPending] = useState(false);
  async function action(formData: FormData) {
    setPending(true);
    const res = await fetch("/api/customers", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(Object.fromEntries(formData.entries())) });
    const payload = await res.json();
    setPending(false);
    setState({ success: res.ok, message: payload.message });
  }
  return <form className="card grid gap-4 p-6 md:grid-cols-2" action={action}><div className="md:col-span-2"><p className="text-lg font-semibold text-slate-950">Create customer</p><p className="mt-1 text-sm text-slate-500">Quick-create a demo customer record.</p></div><input name="name" placeholder="Contact name" required /><input name="company" placeholder="Company" required /><input name="email" type="email" placeholder="Email" required /><select name="plan" defaultValue="GROWTH"><option>STARTER</option><option>GROWTH</option><option>SCALE</option><option>ENTERPRISE</option></select><select name="status" defaultValue="ACTIVE"><option>ACTIVE</option><option>AT_RISK</option><option>TRIAL</option><option>CHURNED</option></select><input name="monthlySpend" type="number" min="0" placeholder="Monthly spend" required /><Button disabled={pending} type="submit" className="md:col-span-2">{pending ? "Saving..." : "Add customer"}</Button>{state.message ? <p className={`md:col-span-2 text-sm ${state.success ? "text-emerald-300" : "text-rose-300"}`}>{state.message}</p> : null}</form>;
}

export function CreateTicketForm() {
  const [state, setState] = useState<FormState>({});
  const [pending, setPending] = useState(false);
  async function action(formData: FormData) {
    setPending(true);
    const res = await fetch("/api/tickets", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(Object.fromEntries(formData.entries())) });
    const payload = await res.json();
    setPending(false);
    setState({ success: res.ok, message: payload.message });
  }
  return <form className="card grid gap-4 p-6 md:grid-cols-2" action={action}><div className="md:col-span-2"><p className="text-lg font-semibold text-slate-950">Create ticket</p><p className="mt-1 text-sm text-slate-500">Use a customer ID from the customers table.</p></div><input name="title" placeholder="Ticket title" required className="md:col-span-2" /><input name="customerId" placeholder="Customer ID" required /><select name="priority" defaultValue="MEDIUM"><option>LOW</option><option>MEDIUM</option><option>HIGH</option><option>URGENT</option></select><textarea name="description" placeholder="Description" required className="min-h-32 md:col-span-2" /><Button disabled={pending} type="submit" className="md:col-span-2">{pending ? "Saving..." : "Add ticket"}</Button>{state.message ? <p className={`md:col-span-2 text-sm ${state.success ? "text-emerald-300" : "text-rose-300"}`}>{state.message}</p> : null}</form>;
}
