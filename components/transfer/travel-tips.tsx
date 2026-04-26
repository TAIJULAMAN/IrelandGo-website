"use client";

import { useSearchParams } from "next/navigation";

export default function TravelTips() {
	const searchParams = useSearchParams();
	const transferRouteParam = searchParams.get("transferRoute");
	const pickupParam = searchParams.get("pickup") || "Dublin";
	const dropoffParam = searchParams.get("dropoff") || "Galway";
  
	let transferRoute = null;
	try {
	  if (transferRouteParam) {
		transferRoute = JSON.parse(transferRouteParam);
	  }
	} catch (e) {
	  console.error("Failed to parse transfer route", e);
	}

	return (
		<section className="bg-gray-50 py-10 sm:py-14">
			<div className="container mx-auto px-4 sm:px-6 lg:px-0 text-gray-900">
				<h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-3">
					From {transferRoute?.from || pickupParam} to {transferRoute?.to || dropoffParam} : Travel Tips
				</h2>
				
				{transferRoute?.description ? (
					<div 
						className="prose prose-sm sm:prose-base text-gray-700 max-w-none"
						dangerouslySetInnerHTML={{ __html: transferRoute.description }} 
					/>
				) : (
					<>
						<p className="text-sm sm:text-base text-gray-700 mb-6 sm:mb-8 leading-relaxed">
							Driving from {pickupParam} to {dropoffParam} is a trip across the whole country. So, to ensure you have a
							comfortable and memorable experience, we compiled three secret travel tips below.
						</p>

						<div className="space-y-4 sm:space-y-5 mb-6 sm:mb-8">
							<h3 className="text-base sm:text-lg font-semibold text-gray-900">Go Sightseeing</h3>
							<p className="text-sm sm:text-base text-gray-700 leading-relaxed">
								The Republic of Ireland is a nature-filled land. Due to this, many attractions are located
								outside the cities with no public transport. A custom door-to-door service allows you to
								schedule a stop at remote attractions en route. Trim Castle and Castlettown House are two
								extraordinary gems off the beaten track that you&apos;d miss if you take any other
								transportation option.
							</p>
						</div>

						<div className="flex justify-center mb-8 sm:mb-10">
							<button className="flex items-center gap-1 text-xs sm:text-sm font-medium text-blue-600 hover:text-blue-700">
								<span>Show more</span>
								<svg
									className="w-3.5 h-3.5"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M19 9l-7 7-7-7"
									/>
								</svg>
							</button>
						</div>

						<h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3">
							How to Get From {pickupParam} to {dropoffParam}
						</h3>
						<p className="text-sm sm:text-base text-gray-700 leading-relaxed">
							To travel from {pickupParam} to {dropoffParam}, you have three transportation options available. This
							includes buses, trains, and day trips. To make things easier, we created an introduction to
							each mode of travel so you can choose what suits your schedule and comfort best.
						</p>
					</>
				)}
			</div>
		</section>
	);
}