import { type ReactNode } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

export function CommonLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col ">
      <Navbar />
      <div className="grow-1 container mx-auto">{children}</div>
      <Footer />
    </div>
  );
}
