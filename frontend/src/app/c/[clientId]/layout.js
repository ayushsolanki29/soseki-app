import { Inter } from "next/font/google";
import { Header } from "@/components/header"; // Might need a custom portal header if the main one is tied to auth
import Link from "next/link";
import { Home, Briefcase, FileText, ArrowLeft } from "lucide-react";

// For the portal, we should use a clean, standalone layout
export default function ClientPortalLayout({ children, params }) {
  const { clientId } = params;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Minimalistic Portal Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-white backdrop-blur">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-8">
          <div className="flex gap-6 md:gap-10">
            <Link href={`/c/${clientId}`} className="flex items-center space-x-2">
              <span className="inline-block font-bold text-xl text-slate-800">Client Portal</span>
            </Link>
          </div>
          <nav className="flex items-center space-x-4 md:space-x-8 text-sm font-medium text-slate-600">
            <Link href={`/c/${clientId}`} className="hover:text-slate-900 flex items-center gap-1.5 transition-colors">
              <Home className="h-4 w-4" />
              <span className="hidden sm:inline-block">Dashboard</span>
            </Link>
            <Link href={`/c/${clientId}#projects`} className="hover:text-slate-900 flex items-center gap-1.5 transition-colors">
              <Briefcase className="h-4 w-4" />
              <span className="hidden sm:inline-block">Projects</span>
            </Link>
            <Link href={`/c/${clientId}#invoices`} className="hover:text-slate-900 flex items-center gap-1.5 transition-colors">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline-block">Invoices</span>
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 sm:px-8 py-8 md:py-12">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t bg-white py-6 md:py-8 mt-auto">
        <div className="container mx-auto px-4 sm:px-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
          <p>© {new Date().getFullYear()} Client Portal. All rights reserved.</p>
          <div className="mt-4 md:mt-0">
            Powered by Soseki
          </div>
        </div>
      </footer>
    </div>
  );
}
