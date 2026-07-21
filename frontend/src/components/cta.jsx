"use client";

import { Button } from "@/components/ui/button";
import { FullWidthDivider } from "@/components/full-width-divider";
import { DynamicTime } from "@/components/dynamic-time";
import Link from "next/link";

export function CallToAction({
    title,
    description,
}) {
	return (
        <div
            className="relative mx-auto flex w-full max-w-5xl flex-col justify-between border-x">
            <FullWidthDivider className="-top-px" />
            <div className="border-b px-6 py-24">
				<h2 className="text-center font-bold text-4xl md:text-5xl tracking-tight text-slate-900">
					{title || (
						<>Set up in 10 mins.<br/>Back to building by <DynamicTime offsetMinutes={10} />.</>
					)}
				</h2>
				<p
                    className="mx-auto max-w-2xl text-balance text-center text-slate-600 text-lg md:text-xl mt-6 leading-relaxed">
					{description || "Built for freelancers and agencies who want to focus on their clients, not their admin."}
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
