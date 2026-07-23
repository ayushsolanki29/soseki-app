"use client";

import { Button } from "@/components/ui/button";
import { FullWidthDivider } from "@/components/full-width-divider";
import Link from "next/link";

export function CallToAction({
    title,
    description,
}) {
	return (
        <div
            className="relative mx-auto flex w-full max-w-5xl flex-col justify-between border-x">
            <FullWidthDivider className="-top-px" />
            <div className="border-b px-4 sm:px-6 py-16 md:py-24">
				<h2 className="text-center font-bold text-3xl sm:text-4xl md:text-5xl tracking-tight text-slate-900">
					{title || (
						<>Open source, actively maintained, and built by someone who runs client work the same way you do.</>
					)}
				</h2>
				<p
                    className="mx-auto max-w-2xl text-balance text-center text-slate-600 text-base sm:text-lg md:text-xl mt-6 leading-relaxed">
					{description || "Join the community of freelancers and agencies using Soseki."}
				</p>
			</div>
            <div
                className="flex items-center justify-center gap-4 bg-slate-50/80 p-8">
				<Link href="/login">
					<Button size="lg" className="px-8 font-semibold bg-blue-600 text-white hover:bg-blue-700">
						Get started{" "}
					</Button>
				</Link>
			</div>
            <FullWidthDivider className="-bottom-px" />
        </div>
    );
}
