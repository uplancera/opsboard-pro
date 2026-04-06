import "./globals.css";
import { ReactNode } from "react";
export const metadata = { title: "OpsBoard Pro", description: "A multi-tenant B2B operations dashboard starter." };
export default function RootLayout({ children }: { children: ReactNode }) { return <html lang="en"><body>{children}</body></html>; }
