"use client";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/logo";
import { useScroll } from "@/hooks/use-scroll";
import { buttonVariants } from "@/components/ui/button";
import { MobileNav } from "@/components/mobile-nav";
import Link from "next/link";

export const navLinks = [
	{
		label: "Features",
		href: "/features",
	},
	{
		label: "Pricing",
		href: "/pricing",
	},
	{
		label: "About",
		href: "/about",
	},

];

export function Header() {
	const scrolled = useScroll(10);

	return (
		<header
			className={cn(
				"sticky top-0 z-50 mx-auto w-full max-w-4xl border-b md:rounded-full md:border md:transition-all md:ease-out bg-white md:mt-4 shadow-sm",
				{
					"border-border bg-white/95 backdrop-blur-md supports-[backdrop-filter]:bg-white/60 md:top-2 md:max-w-3xl md:shadow-md":
						scrolled,
				}
			)}
		>
			<nav
				className={cn(
					"flex h-14 w-full items-center justify-between px-4 md:h-12 md:transition-all md:ease-out",
					{
						"md:px-2": scrolled,
					}
				)}
			>
				<Link
					className="flex items-center gap-2 rounded-md p-2 hover:bg-muted dark:hover:bg-muted/50"
					href="/"
				>
					<Logo className="h-4" />
                    <span className="font-bold text-slate-900 tracking-tight">Soseki</span>
				</Link>
				<div className="hidden items-center gap-2 md:flex">
					<div>
						{navLinks.map((link) => (
							<Link key={link.label} href={link.href} className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "text-slate-600 font-medium")}>
								{link.label}
							</Link>
						))}
					</div>
					
					<Link href="/login" className={buttonVariants({ size: "sm" })}>
                        Get Started
                    </Link>
				</div>
				<MobileNav />
			</nav>
		</header>
	);
}
