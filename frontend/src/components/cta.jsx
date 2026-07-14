"use client";

import { Button } from "@/components/ui/button";
import { FullWidthDivider } from "@/components/full-width-divider";
import { DynamicTime } from "@/components/dynamic-time";

export function CallToAction() {
	return (
        <div
            className="relative mx-auto flex w-full max-w-5xl flex-col justify-between border-x">
            <FullWidthDivider className="-top-px" />
            <div className="border-b px-2 py-16">
				<h2 className="text-center font-bold text-3xl md:text-5xl">
					Set up in 10 mins.<br/>Back to building by <DynamicTime offsetMinutes={10} />.
				</h2>
				<p
                    className="text-balance text-center text-muted-foreground text-sm md:text-base mt-4">
					Built for freelancers and agencies who want to focus on their clients, not their admin.
				</p>
			</div>
            <div
                className="flex items-center justify-center gap-2 bg-secondary/80 p-6 dark:bg-secondary/40">
				<Button size="lg" className="px-8 font-semibold">
					Get started{" "}
				</Button>
			</div>
            <FullWidthDivider className="-bottom-px" />
        </div>
    );
}
