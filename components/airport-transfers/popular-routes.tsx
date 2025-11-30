import { PlaneTakeoff } from "lucide-react";

const routes = [
	{
		from: "Dublin Airport",
		to: "City Center",
		price: "€35",
		journey: "45 min journey",
	},
	{
		from: "Shannon",
		to: "Galway",
		price: "€65",
		journey: "1h 15min journey",
	},
	{
		from: "Cork Airport",
		to: "City Center",
		price: "€45",
		journey: "25 min journey",
	},
	{
		from: "Kerry",
		to: "Killarney",
		price: "€55",
		journey: "35 min journey",
	},
];

export default function PopularRoutes() {
	return (
		<section className="bg-white py-16">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-10">
					<h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-2">
						Popular Routes
					</h2>
					<p className="text-sm sm:text-base text-gray-500">
						Most booked airport transfer routes across Ireland
					</p>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
					{routes.map((route) => (
						<div
							key={`${route.from}-${route.to}`}
							className="bg-[#f5f7fb] rounded-xl px-5 py-4 flex flex-col gap-3 shadow-sm"
						>
							<div className="flex items-start justify-between mb-1">
								<div className="w-8 h-8 rounded-lg flex items-center justify-center">
									<PlaneTakeoff className="w-4 h-4 text-blue-500" />
								</div>
								<span className="text-sm font-semibold text-emerald-500">
									{route.price}
								</span>
							</div>
							<div>
								<p className="text-sm sm:text-base font-medium text-gray-900">
									{route.from} → {route.to}
								</p>
								<p className="mt-1 text-xs sm:text-sm text-gray-500">
									{route.journey}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}