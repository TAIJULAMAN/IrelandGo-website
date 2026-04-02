
"use client";

import { Button } from "@/components/ui/button";
import { CalendarDays } from "lucide-react";
import Link from "next/link";

export default function DreamTour() {
	return (
		<section className="bg-[#111c3a] py-12 sm:py-16">
			<div className="max-w-5xl mx-auto px-5 md:px-0 text-center text-white">
				<h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-3 sm:mb-4">
					Ready to Plan Your Journey?
				</h2>
				<p className="text-sm sm:text-base text-white/80 leading-relaxed mb-6 sm:mb-8">
					Tell us where you need to go, and we&apos;ll arrange a transfer that suits your schedule and travel needs. Whether it&apos;s city-to-city, airport, or private travel, Tourenzo ensures a smooth and comfortable journey every time.
				</p>
				<Button
					asChild
					className="inline-flex items-center gap-2 rounded-lg px-5 md:px-10 py-2.5 md:py-3 bg-white hover:bg-gray-100 text-blue-500 text-sm font-medium shadow-md"
				>
					<Link href="/contact">
						<CalendarDays className="h-4 w-4" />
						<span>Book Your Transfer Now</span>
					</Link>
				</Button>
			</div>
		</section>
	);
}

