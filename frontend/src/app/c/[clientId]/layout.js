"use client";

import { Inter } from "next/font/google";
import { Header } from "@/components/header"; 
import Link from "next/link";
import { Home, Briefcase, FileText } from "lucide-react";
import API from "@/lib/api";
import { DynamicAvatar } from "@/components/ui/dynamic-avatar";
import { LogoIcon } from "@/components/logo";
import { PublicFooter } from "@/components/shared/public-footer";
import { ClientPortalActions } from "@/components/portal/client-portal-actions";
import { useEffect, useState, use, createContext } from "react";

export const ClientPortalContext = createContext({ 
  profile: null, 
  isProfileLoading: true, 
  profileError: false 
});

// For the portal, we should use a clean, standalone layout
export default function ClientPortalLayout({ children, params }) {
  const { clientId } = use(params);

  const [profile, setProfile] = useState(null);
  const [isProfileLoading, setIsProfileLoading] = useState(true);
  const [profileError, setProfileError] = useState(false);

  useEffect(() => {
    setIsProfileLoading(true);
    API.get(`/portal/client/${clientId}`)
      .then(res => {
        setProfile(res.data.data);
        setIsProfileLoading(false);
      })
      .catch(err => {
        setProfileError(true);
        setIsProfileLoading(false);
      });
  }, [clientId]);

  return (
    <ClientPortalContext.Provider value={{ profile, isProfileLoading, profileError }}>
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
        {/* Minimalistic Portal Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-white backdrop-blur">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-8">
          <div className="flex gap-6 md:gap-10">
            <Link href={`/c/${clientId}`} className="flex items-center space-x-3">
              <LogoIcon className="size-6 text-primary" />
              <span className="inline-block font-bold text-xl text-slate-800">
                {profile?.organization?.name || "Client Portal"}
              </span>
              <span className="text-slate-300">|</span>
              <div className="flex items-center space-x-2 text-sm font-medium text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full hover:bg-slate-200 transition-colors" title={profile?.name}>
                <DynamicAvatar type="client" seed={profile?.name} size={24} />
                <span className="hidden sm:inline-block max-w-[120px] truncate">{profile?.name || "Profile"}</span>
              </div>
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
            
            <div className="pl-4 border-l border-slate-200">
              <ClientPortalActions profile={profile} />
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 sm:px-8 py-8 md:py-12">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white pt-2 mt-auto">
        <PublicFooter className="mt-8 pb-8" />
      </footer>
    </div>
    </ClientPortalContext.Provider>
  );
}
