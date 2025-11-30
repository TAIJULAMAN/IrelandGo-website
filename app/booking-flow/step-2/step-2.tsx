"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Users, Luggage } from "lucide-react";

const vehicles = [
	{
		name: "Sedan",
		price: "$45",
		seats: "4 seats",
		bags: "2 bags",
		image: "/vehicle-sedan.png",
	},
	{
		name: "Compact MPV",
		price: "$55",
		seats: "5 seats",
		bags: "3 bags",
		image: "/vehicle-mpv.png",
	},
	{
		name: "Van",
		price: "$65",
		seats: "8 seats",
		bags: "6 bags",
		image: "/vehicle-van.png",
	},
	{
		name: "Luxury Sedan",
		price: "$85",
		seats: "4 seats",
		bags: "2 bags",
		image: "/vehicle-luxury.png",
	},
];

export default function Step2() {
	return (
		<section className="bg-gray-50 min-h-screen py-10 sm:py-12">
			<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Step progress */}
				<div className="mb-8 sm:mb-10">
					<div className="flex items-center justify-between text-xs sm:text-sm font-medium text-gray-600">
						<div className="flex items-center gap-2">
							<div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white text-xs font-semibold">
								1
							</div>
							<span>Trip Details</span>
						</div>
						<div className="flex-1 h-0.5 bg-blue-500 mx-2" />
						<div className="flex items-center gap-2">
							<div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-blue-600 bg-white text-blue-600 text-xs font-semibold">
								2
							</div>
							<span>Choose Vehicle</span>
						</div>
						<div className="flex-1 h-0.5 bg-gray-200 mx-2" />
						<div className="flex items-center gap-2 text-gray-400">
							<div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-xs font-semibold">
								3
							</div>
							<span>Trip Details</span>
						</div>
						<div className="flex-1 h-0.5 bg-gray-200 mx-2" />
						<div className="flex items-center gap-2 text-gray-400">
							<div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-xs font-semibold">
								4
							</div>
							<span>Details</span>
						</div>
						<div className="flex-1 h-0.5 bg-gray-200 mx-2" />
						<div className="flex items-center gap-2 text-gray-400">
							<div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-xs font-semibold">
								5
							</div>
							<span>Payment</span>
						</div>
					</div>
				</div>

				{/* Heading */}
				<div className="mb-6 sm:mb-8">
					<h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-blue-700 mb-1">
						Step 2: Choose Vehicle
					</h1>
					<p className="text-sm sm:text-base text-gray-600">
						Select your preferred vehicle for your journey.
					</p>
				</div>

				{/* Vehicle cards */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-8 sm:mb-10">
					{vehicles.map((vehicle) => (
						<div
							key={vehicle.name}
							className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex flex-col hover:shadow-md transition-shadow cursor-pointer"
						>
							<div className="mb-4 h-28 sm:h-32 flex items-center justify-center">
								<img
									src={vehicle.image}
									alt={vehicle.name}
									className="max-h-full w-auto object-contain"
								/>
							</div>
							<div className="flex items-center justify-between mb-3">
								<p className="text-sm sm:text-base font-semibold text-gray-900">
									{vehicle.name}
								</p>
								<p className="text-sm sm:text-base font-semibold text-blue-600">
									{vehicle.price}
								</p>
							</div>
							<div className="flex items-center justify-between text-[11px] sm:text-xs text-gray-500">
								<span className="flex items-center gap-1">
									<Users className="h-3 w-3" />
									{vehicle.seats}
								</span>
								<span className="flex items-center gap-1">
									<Luggage className="h-3 w-3" />
									{vehicle.bags}
								</span>
							</div>
						</div>
					))}
				</div>

				{/* Next button */}
				<div className="flex justify-center">
					<Button asChild className="px-10 sm:px-12 py-2.5 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm sm:text-base font-medium rounded-full">
						<Link href="/booking-flow/step-3">
							Next: Add Stops
						</Link>
					</Button>
				</div>
			</div>
		</section>
	);
}