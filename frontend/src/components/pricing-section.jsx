"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FullWidthDivider } from "@/components/full-width-divider";
import { CheckIcon } from "lucide-react";
import { PRICING_DATA } from "@/config/pricing-data";
import { cn } from "@/lib/utils";

export function PricingSection() {
    const [currency, setCurrency] = useState("usd");
    const paidData = PRICING_DATA.paid[currency];

    // For the homepage simplified view, we will just show the 15-credit package price.
    const startingPackage = paidData.packages[0];

	return (
        <section
            className="mx-auto max-w-5xl place-content-center border-x py-24">
            <div className="relative">
				<FullWidthDivider position="top" />
				<FullWidthDivider position="bottom" />

				<div
                    className="grid grid-cols-1 gap-px bg-border md:grid-cols-2 lg:grid-cols-4">
					<div className="flex flex-col justify-between bg-background p-8 md:col-span-2">
                        <div>
    						<p className="mb-6 text-muted-foreground text-sm uppercase tracking-wider">
    							PRICING
    						</p>
    						<h1 className="font-bold text-3xl leading-tight md:text-5xl mb-4">
    							Pay for what you use. Nothing more.
    						</h1>
                            <p className="text-muted-foreground text-balance">
                                We ditched the rigid subscription model. Buy credits only when you need them.
                            </p>
                        </div>

                        {/* Currency Toggle */}
                        <div className="mt-8 bg-slate-100 p-1 rounded-lg inline-flex items-center shadow-inner self-start">
                            <button 
                                onClick={() => setCurrency("usd")}
                                className={cn("px-4 py-1.5 rounded-md text-xs font-bold transition-all", currency === "usd" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700")}
                            >
                                USD ($)
                            </button>
                            <button 
                                onClick={() => setCurrency("inr")}
                                className={cn("px-4 py-1.5 rounded-md text-xs font-bold transition-all", currency === "inr" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700")}
                            >
                                INR (₹)
                            </button>
                        </div>
					</div>

                    {/* Free Plan */}
					<div className="flex flex-col bg-background *:px-4 *:py-6">
                        <div className="border-b">
            				<p className="mb-6 text-muted-foreground text-sm uppercase tracking-wider">
            					COMMUNITY FREE
            				</p>
            				<div className="mb-2 flex items-baseline gap-2">
            					<h2 className="font-bold text-4xl">25</h2>
            					<span className="text-muted-foreground text-xs">
            						Credits / month
            					</span>
            				</div>
            				<p className="mb-8 text-muted-foreground text-sm">
            					Refreshed automatically. Forever free.
            				</p>
            
            				<Button
                                className="w-full"
                                variant="outline"
                                render={<a href="/login" />}
                            >
                                Start for Free
                            </Button>
            			</div>
                        <div className="space-y-3 text-muted-foreground text-sm">
            				<p className="mb-6 text-xs uppercase">FREE, FOREVER:</p>
            				{PRICING_DATA.free.features.slice(0, 5).map((feature) => (
            					<p className="flex items-start gap-2 text-foreground/80" key={feature}>
            						<CheckIcon className="size-4 shrink-0 mt-0.5" />
            						{feature}
            					</p>
            				))}
            			</div>
                    </div>

                    {/* Paid Plan */}
                    <div className="flex flex-col bg-background *:px-4 *:py-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 bg-blue-600 text-white text-[9px] font-bold uppercase py-0.5 px-3 rounded-bl-lg tracking-wider">
                            Pay-As-You-Go
                        </div>
                        <div className="border-b">
            				<p className="mb-6 text-muted-foreground text-sm uppercase tracking-wider text-blue-600 font-bold">
            					PRO TIER
            				</p>
            				<div className="mb-2 flex items-baseline gap-2">
            					<h2 className="font-bold text-4xl">{paidData.currencySymbol}{startingPackage.price.toFixed(2)}</h2>
            					<span className="text-muted-foreground text-xs font-medium">
            						/ {startingPackage.credits} Credits
            					</span>
            				</div>
            				<p className="mb-8 text-muted-foreground text-sm">
            					Purchase credits in batches. They never expire.
            				</p>
            
            				<Button
                                className="w-full"
                                variant="default"
                                render={<a href="/checkout" />}
                            >
                                Purchase Credits
                            </Button>
            			</div>
                        <div className="space-y-3 text-muted-foreground text-sm">
            				<p className="mb-6 text-xs uppercase">EVERYTHING IN FREE, AND:</p>
            				{PRICING_DATA.paid.features.slice(2, 7).map((feature) => (
            					<p className="flex items-start gap-2 text-foreground/80" key={feature}>
            						<CheckIcon className="size-4 shrink-0 mt-0.5 text-blue-500" />
            						{feature}
            					</p>
            				))}
            			</div>
                    </div>

				</div>
			</div>
        </section>
    );
}
