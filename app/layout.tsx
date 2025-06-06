import "./globals.css";
import { ReactNode } from "react";
export const metadata = { title: "OpsBoard Pro", description: "A multi-tenant B2B operations dashboard starter." };
export default function RootLayout({ children }: { children: ReactNode }) { return <html lang="en"><body>{children}</body></html>; }

// history:023 2025-01-30
// history:038 2025-02-17
// history:112 2025-05-18
// history:128 2025-06-06