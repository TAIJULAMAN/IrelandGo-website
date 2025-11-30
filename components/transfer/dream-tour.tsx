
"use client";

import { Button } from "@/components/ui/button";
import { CalendarDays } from "lucide-react";
import Link from "next/link";

export default function DreamTour() {
	return (
		<section className="bg-[#111c3a] py-12 sm:py-16">
			<div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
				<h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-3 sm:mb-4">
					Ready to Design Your Dream Tour?
				</h2>
				<p className="text-sm sm:text-base text-white/80 leading-relaxed mb-6 sm:mb-8">
					Tell us where you want to go, and we&apos;ll build a personalized itinerary just for you.
					Whether it&apos;s castles, coastlines, or countryside, IrelandGO crafts multi-day
					journeys that match your pace, interests, and travel style.
				</p>
				<Button
					asChild
					className="inline-flex items-center gap-2 rounded-lg px-6 sm:px-8 py-2.5 bg-white text-blue-500 text-sm sm:text-base font-medium shadow-md"
				>
					<Link href="/airport-transfers">
						<CalendarDays className="h-4 w-4" />
						<span>Book Your Transfer Now</span>
					</Link>
				</Button>
			</div>
		</section>
	);
}

