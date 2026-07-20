import { cn } from "@/lib/utils";
import { GithubIcon } from "@/components/github-icon";
import { InstagramIcon } from "@/components/instagram-icon";
import { XIcon } from "@/components/x-icon";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { FullWidthDivider } from "@/components/full-width-divider";

export function Footer() {
	return (
        <footer
            className={cn(
                "relative mx-auto max-w-5xl border-x",
                "dark:bg-[radial-gradient(35%_80%_at_15%_0%,--theme(--color-foreground/.1),transparent)]"
            )}>
            <FullWidthDivider position="top" />
            <div className="grid max-w-5xl grid-cols-6 gap-6 p-4">
				<div className="col-span-6 flex flex-col gap-4 pt-5 md:col-span-4">
					<a className="w-max" href="#">
						<Logo className="h-5" />
					</a>
					<p className="max-w-sm text-balance text-muted-foreground text-sm">
						An open-source business operating platform for freelancers, consultants, and small agencies.
					</p>
					<div className="flex gap-2">
						{socialLinks.map((item, index) => (
							<Button
                                key={`social-${item.link}-${index}`}
                                size="icon"
                                variant="outline"
                                render={<a href={item.link} target="_blank" />}
                                nativeButton={false}>{item.icon}</Button>
						))}
					</div>
				</div>
				<div className="col-span-3 w-full md:col-span-1">
					<span className="text-muted-foreground text-xs">Resources</span>
					<div className="mt-2 flex flex-col gap-2">
						{resources.map(({ href, title }) => (
							<a className="w-max text-sm hover:underline" href={href} key={title}>
								{title}
							</a>
						))}
					</div>
				</div>
				<div className="col-span-3 w-full md:col-span-1">
					<span className="text-muted-foreground text-xs">Company</span>
					<div className="mt-2 flex flex-col gap-2">
						{company.map(({ href, title }) => (
							<a className="w-max text-sm hover:underline" href={href} key={title}>
								{title}
							</a>
						))}
					</div>
				</div>
			</div>
            <FullWidthDivider />
            <div className="flex items-center justify-center gap-2 py-4">
				<p className="text-center font-light text-muted-foreground text-sm">
					&copy; {new Date().getFullYear()} Soseki, All rights reserved
				</p>
			</div>
        </footer>
    );
}

const company = [
	{
		title: "Contact Us",
		href: "/contact",
	},
	{
		title: "About Us",
		href: "/about",
	},
	{
		title: "Careers",
		href: "/careers",
	},
	{
		title: "Brand assets",
		href: "/brand-assets",
	},
	{
		title: "Privacy Policy",
		href: "/privacy-policy",
	},
	{
		title: "Terms of Service",
		href: "/terms",
	},
];

const resources = [
	{
		title: "Blog",
		href: "/blog",
	},
	{
		title: "Help Center",
		href: "/help-center",
	},
	{
		title: "Contact Support",
		href: "/contact",
	},
	{
		title: "Community",
		href: "/community",
	},
	{
		title: "Security",
		href: "/security",
	},
];

const socialLinks = [
	{
		icon: <GithubIcon />,
		link: "https://github.com/ayushsolanki29/soseki",
	},
	{
		icon: <InstagramIcon />,
		link: "https://instagram.com",
	},
	{
		icon: <XIcon />,
		link: "https://x.com",
	},
];
