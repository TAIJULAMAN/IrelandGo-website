"use client";

import { Button } from "@/components/ui/button";
import { CalendarDays, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function DreamTour() {
	return (
		<section className="relative py-20 sm:py-28 overflow-hidden bg-gray-900">
			{/* Dynamic Background Elements */}
			<div className="absolute inset-0 w-full h-full">
				<div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-[#111c3a] to-indigo-950 opacity-95 z-0" />
				
				{/* Glowing Orbs */}
				<div className="absolute top-[-30%] left-[-10%] w-[60%] h-[60%] rounded-full bg-blue-500/20 blur-[120px] z-0 mix-blend-screen pointer-events-none" />
				<div className="absolute bottom-[-30%] right-[-10%] w-[60%] h-[60%] rounded-full bg-indigo-500/20 blur-[120px] z-0 mix-blend-screen pointer-events-none" />
			</div>

			<div className="relative z-10 max-w-4xl mx-auto px-5 md:px-8 text-center text-white">
				<div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md mb-8">
				   <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
				   <span className="text-xs font-semibold text-blue-100 uppercase tracking-wider">Premium Service</span>
				</div>
				
				<h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 tracking-tight text-white drop-shadow-md">
					Ready to Plan Your Journey?
				</h2>
				<p className="text-base sm:text-lg text-blue-100/80 leading-relaxed mb-10 max-w-3xl mx-auto font-medium">
					Tell us where you need to go, and we&apos;ll arrange a transfer that suits your schedule and travel needs. Whether it&apos;s city-to-city, airport, or private travel, Tourenzo ensures a smooth and comfortable journey every time.
				</p>
				
				<div className="flex flex-col sm:flex-row items-center justify-center gap-4">
					<Button
						asChild
						className="group relative inline-flex items-center justify-center gap-2 rounded-xl px-8 py-7 bg-white text-blue-700 text-base font-bold shadow-[0_0_40px_rgb(59,130,246,0.3)] hover:shadow-[0_0_60px_rgb(59,130,246,0.5)] hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto overflow-hidden border-none"
					>
						<Link href="/contact">
							<span className="absolute inset-0 w-full h-full bg-gradient-to-r from-white via-blue-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
							<CalendarDays className="h-5 w-5 relative z-10 text-blue-600 group-hover:scale-110 transition-transform duration-300" />
							<span className="relative z-10 text-blue-800">Book Your Transfer Now</span>
							<ArrowRight className="h-5 w-5 relative z-10 text-blue-600 group-hover:translate-x-1 transition-transform duration-300" />
						</Link>
					</Button>
				</div>
			</div>
		</section>
	);
}
