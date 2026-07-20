import Link from "next/link";
import { Globe } from "lucide-react";
import { GithubIcon } from "@/components/github-icon";
import { XIcon } from "@/components/x-icon";
import { LogoIcon } from "@/components/logo";
import { APP_SOCIALS, LEGAL_PAGES } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function PublicFooter({ className }) {
  return (
    <div className={cn("mt-16 pb-12 flex flex-col items-center justify-center relative z-10 space-y-6", className)}>
      <Link href="/" className="flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity">
        <span className="text-sm text-muted-foreground">Powered by</span>
        <LogoIcon className="size-5 grayscale" />
        <span className="font-bold text-foreground tracking-tight">Soseki</span>
      </Link>
      
      {/* Socials */}
      <div className="flex items-center gap-3 text-muted-foreground/80">
        {APP_SOCIALS.map((social) => (
          <a 
            key={social.name} 
            href={social.url} 
            target="_blank" 
            rel="noreferrer" 
            className="hover:text-foreground transition-colors p-2 bg-background border border-border/40 rounded-full hover:bg-muted/40 shadow-sm"
            title={social.name}
          >
            <span className="sr-only">{social.name}</span>
            {social.name === "GitHub" && <GithubIcon className="size-4" />}
            {social.name === "Twitter" && <XIcon className="size-4" />}
            {social.name === "Website" && <Globe className="size-4" />}
          </a>
        ))}
      </div>

      {/* Legal Pages */}
      <div className="flex flex-col items-center gap-4 text-xs text-muted-foreground/60">
        <div className="flex items-center gap-4">
          {LEGAL_PAGES.map((page, idx) => (
            <span key={page.name} className="flex items-center gap-4">
              <Link href={page.url} className="hover:text-foreground transition-colors">
                {page.name}
              </Link>
              {idx < LEGAL_PAGES.length - 1 && <span>&middot;</span>}
            </span>
          ))}
        </div>
        <p>© {new Date().getFullYear()} Soseki. All rights reserved.</p>
      </div>
    </div>
  );
}
