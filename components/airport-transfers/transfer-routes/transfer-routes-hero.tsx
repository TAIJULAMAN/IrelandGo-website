"use client";

import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Users, Luggage, Plus, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function TransferRoutesHero() {
	return (
		<section className="relative overflow-hidden min-h-[800px] text-white">
			{/* Background */}
			<div className="absolute inset-0 z-0">
				<img
					src="/plane.png"
					alt="Runway at sunset"
					className="w-full h-full object-cover"
				/>
				<div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />
			</div>

			<Header />

			<div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
				{/* Hero Text */}
				<div className="text-center mb-10 pt-10">
					<h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
						Discover Dublin with
						<br className="hidden sm:block" />
						Comfortable Transfers
					</h1>
					<p className="text-base sm:text-lg text-white/90 max-w-2xl mx-auto">
						Seamless city-to-city and airport transfers across Dublin and beyond.
					</p>
				</div>

				{/* Booking Card */}
				<div className="bg-white rounded-2xl shadow-2xl p-5 md:p-6 flex flex-col md:flex-row gap-5 max-w-5xl mx-auto">
					<div className="flex-1 flex flex-col gap-5 space-y-5">
						{/* Pickup / Dropoff */}
						<div className="grid md:grid-cols-2 gap-3">
							<div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg bg-white">
								<MapPin className="w-5 h-5 text-blue-500" />
								<input
									type="text"
									defaultValue="Shannon Airport"
									className="w-full outline-none text-sm text-gray-800 placeholder:text-gray-400"
								/>
							</div>
							<div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg bg-white">
								<MapPin className="w-5 h-5 text-green-500" />
								<input
									type="text"
									placeholder="Dropoff Location"
									className="w-full outline-none text-sm text-gray-800 placeholder:text-gray-400"
								/>
							</div>
						</div>

						<button className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium">
							<Plus className="w-4 h-4" />
							Add Stop
						</button>

						{/* Date / Passenger / Luggage */}
						<div className="grid md:grid-cols-3 gap-3">
							<div className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg bg-white">
								<Calendar className="w-4 h-4 text-gray-400" />
								<input
									type="text"
									defaultValue="04/07/2025 - 09:00 am"
									className="w-full outline-none text-xs sm:text-sm text-gray-800"
								/>
							</div>
							<div className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg bg-white">
								<Users className="w-4 h-4 text-gray-400" />
								<select className="w-full outline-none text-xs sm:text-sm bg-white text-gray-800">
									<option>1 Passenger</option>
									<option>2 Passengers</option>
									<option>3+ Passengers</option>
								</select>
							</div>
							<div className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg bg-white">
								<Luggage className="w-4 h-4 text-gray-400" />
								<select className="w-full outline-none text-xs sm:text-sm bg-white text-gray-800">
									<option>1 Luggage</option>
									<option>2 Luggage</option>
									<option>3+ Luggage</option>
								</select>
							</div>
						</div>
						<Button
							asChild
							className="w-full h-11 mt-1 bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2"
						>
							<Link href="/airport-transfers/journey-details">
								<Search className="w-5 h-5" />
								Find a Ride
							</Link>
						</Button>

					</div>
					<div className="hidden md:block w-[320px] lg:w-[360px] rounded-xl overflow-hidden shadow-lg bg-gray-200">
						<Image
							src="/map2.png"
							alt="Transfer route map"
							width={360}
							height={200}
							className="w-full h-full object-cover"
						/>
					</div>
				</div>
			</div>
		</section>
	);
}