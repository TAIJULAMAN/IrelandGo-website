const routes = [
	{
		image: "/p1.png",
		title: "Shannon Airport to Limerick",
		duration: "2 hours",
		description:
			"Scenic drive through Ireland's west coast arriving at Galway's artistic city center.",
	},
	{
		image: "/p2.png",
		title: "Shannon Airport to Cork",
		duration: "2 hours",
		description:
			"Comfortable transfer to Ireland's cultural capital with charming Georgian streets.",
	},
	{
		image: "/p3.png",
		title: "Shannon Airport to Limerick",
		duration: "2 hours",
		description:
			"Fast transfer into the historic city of Limerick along the River Shannon.",
	},
	{
		image: "/p4.png",
		title: "Shannon Airport to Killarney",
		duration: "2 hours",
		description:
			"Ride through breathtaking Irish countryside, arriving at beautiful Killarney.",
	},
	{
		image: "/p5.png",
		title: "Shannon Airport to Ennis",
		duration: "2 hours",
		description:
			"Quick and relaxing transfer to the cozy traditional town of Ennis.",
	},
	{
		image: "/p6.png",
		title: "Shannon Airport to Doolin",
		duration: "2 hours",
		description:
			"Scenic coastal drive to Doolin, the gateway to the Cliffs of Moher.",
	},
];

export default function PopularTransferRoutes() {
	return (
		<section className="bg-white py-16">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-10">
					<h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-2">
						Popular Transfer Routes From Shannon Airport
					</h2>
					<p className="text-sm sm:text-base text-gray-500">
						Choose from our most requested destinations.
					</p>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
					{routes.map((route) => (
						<div
							key={route.title + route.image}
							className="bg-[#f7f9fc] rounded-2xl overflow-hidden shadow-sm flex flex-col"
						>
							<div className="h-40 w-full overflow-hidden">
								<img
									src={route.image}
									alt={route.title}
									className="w-full h-full object-cover"
								/>
							</div>
							<div className="px-4 pt-4 pb-4 flex-1 flex flex-col gap-3">
								<div className="flex items-center justify-between">
									<h3 className="text-sm sm:text-base font-semibold text-gray-900">
										{route.title}
									</h3>
									<span className="text-xs sm:text-sm text-gray-500">
										{route.duration}
									</span>
								</div>
								<p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
									{route.description}
								</p>
								<button className="mt-3 w-full rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2">
									Book Now
								</button>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
