"use client";

import { cn } from "@/lib/utils";
import { InfiniteSlider } from "@/components/infinite-slider";
import { motion } from "motion/react";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/components/ui/avatar";

const testimonials = [
	{
		quote:
			"Efferd is so polished I might just retire and become a full-time potato farmer. The ecosystem is in safe hands.",
		image: "https://github.com/shadcn.png",
		name: "Shadcn",
		role: "Founder",
		company: "Shadcn UI",
	},
	{
		quote:
			"Efferd is why I still have hair. No more pulling it out over centering divs or fighting with CSS grid.",
		image: "https://github.com/rauchg.png",
		name: "Guillermo Rauch",
		role: "CEO",
		company: "Vercel",
	},

	{
		quote:
			"I tried to buy Efferd but they wouldn't sell. So I just bought Twitter instead to complain about it.",
		image: "https://unavatar.io/x/elonmusk",
		name: "Elon Musk",
		role: "CEO",
		company: "X.com",
	},
	{
		quote:
			"We just acquired Efferd for 3 gazillion dollars. We're calling it iEfferd. It's our best product yet.",
		image: "https://unavatar.io/x/tim_cook",
		name: "Tim Cook",
		role: "CEO",
		company: "Apple",
	},
	{
		quote:
			"I'm considering shipping Efferd components with Prime delivery. 2-day shipping on beautiful UIs? Done.",
		image: "https://unavatar.io/x/JeffBezos",
		name: "Jeff Bezos",
		role: "Founder",
		company: "Amazon",
	},
	{
		quote:
			"We're rewriting OpenAI's entire frontend in Efferd. The AGI told us it's the only logical choice.",
		image: "https://unavatar.io/x/sama",
		name: "Sam Altman",
		role: "CEO",
		company: "OpenAI",
	},
	{
		quote:
			"We processed 100 petabytes of data to find the perfect UI library. The algorithm returned 'Efferd' with 99.9% confidence.",
		image: "https://unavatar.io/x/sundarpichai",
		name: "Sundar Pichai",
		role: "CEO",
		company: "Google",
	},
	{
		quote:
			"Our links might 404 sometimes, but thanks to Efferd, at least the 404 page looks absolutely stunning.",
		image: "https://github.com/steven-tey.png",
		name: "Steven Tey",
		role: "Founder",
		company: "Dub.co",
	},
	{
		quote:
			"It's so fast, I finished my UI sprint before my next meeting even started. Open source for the win.",
		image: "https://unavatar.io/x/peer_rich",
		name: "Peer Richelsen",
		role: "Co-Founder",
		company: "Cal.com",
	},
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

export function TestimonialsSection() {
	return (
        <section className="relative py-10 overflow-hidden">
            <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7 }}
                className="mx-auto max-w-5xl"
            >
				<div
                    className="mx-auto flex max-w-3xl flex-col items-center justify-center gap-5 text-center mb-6">
					<h2 className="font-bold text-4xl md:text-[3.25rem] tracking-tight text-slate-900 leading-tight">
						Built for <span className="text-blue-600">ambitious freelancers</span>
					</h2>
					<p className="text-[18px] text-slate-700 max-w-2xl leading-relaxed">
						Soseki is for modern freelancers and agencies. It&apos;s the powerful all-in-one business software we wish we had ourselves.
					</p>
					
					<div className="flex justify-center mt-3">
						<div className="rounded-full bg-slate-100/80 border border-slate-200/60 px-4 py-1.5 flex items-center gap-2">
						  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-blue-600">
							<path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
						  </svg>
						  <span className="text-sm font-semibold text-slate-700">4.9/5 Average Rating</span>
						</div>
					</div>
				</div>
				<div
                    className="mask-v relative flex h-[500px] w-full flex-row justify-center gap-6 overflow-hidden pt-8 pb-8">
					<InfiniteSlider
                        className="hidden md:block"
                        direction="vertical"
                        speed={35}
                        speedOnHover={17}>
						{firstColumn.map((testimonial) => (
							<TestimonialsCard key={testimonial.name} testimonial={testimonial} />
						))}
					</InfiniteSlider>
					<InfiniteSlider
                        className="md:hidden"
                        direction="vertical"
                        speed={30}
                        speedOnHover={15}>
						{testimonials.map((testimonial) => (
							<TestimonialsCard key={testimonial.name} testimonial={testimonial} />
						))}
					</InfiniteSlider>
					<InfiniteSlider
                        className="hidden md:block"
                        direction="vertical"
                        speed={50}
                        speedOnHover={25}>
						{secondColumn.map((testimonial) => (
							<TestimonialsCard key={testimonial.name} testimonial={testimonial} />
						))}
					</InfiniteSlider>
					<InfiniteSlider
                        className="hidden lg:block"
                        direction="vertical"
                        speed={35}
                        speedOnHover={17}>
						{thirdColumn.map((testimonial) => (
							<TestimonialsCard key={testimonial.name} testimonial={testimonial} />
						))}
					</InfiniteSlider>
				</div>
			</motion.div>
        </section>
    );
}

function TestimonialsCard({
    testimonial,
    className,
    ...props
}) {
	const { quote, image, name, role, company } = testimonial;
	return (
        <figure
            className={cn(
                "w-full max-w-xs rounded-3xl border bg-card p-8 shadow-foreground/10 shadow-lg dark:bg-card/20",
                className
            )}
            {...props}>
            <blockquote>{quote}</blockquote>
            <figcaption className="mt-5 flex items-center gap-2">
				<Avatar className="size-8 rounded-full">
					<AvatarImage alt={`${name}'s profile picture`} src={image} />
					<AvatarFallback>{name.charAt(0)}</AvatarFallback>
				</Avatar>
				<div className="flex flex-col">
					<cite className="font-medium not-italic leading-5 tracking-tight">
						{name}
					</cite>
					<span className="text-muted-foreground text-sm leading-5 tracking-tight">
						{role} {company && `, ${company}`}
					</span>
				</div>
			</figcaption>
        </figure>
    );
}
