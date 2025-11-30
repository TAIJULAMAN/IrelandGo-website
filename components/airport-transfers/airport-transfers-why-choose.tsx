import { Clock, ShieldCheck, Euro } from "lucide-react";

const benefits = [
	{
		icon: Clock,
		title: "Always On Time",
		description:
			"Professional drivers who value punctuality and ensure you reach your destination on schedule.",
	},
	{
		icon: ShieldCheck,
		title: "Safe & Secure",
		description:
			"Licensed drivers, insured vehicles, and 24/7 customer support for your peace of mind.",
	},
	{
		icon: Euro,
		title: "Fair Pricing",
		description:
			"Transparent pricing with no hidden fees. Get the best value for your journey.",
	},
];

export default function AirportTransfersWhyChoose() {
	return (
		<section className="bg-[#f3f6fb] py-16">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-10">
					<h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-2">
						Why Choose Airport Transfers for IrelandGO?
					</h2>
					<p className="text-sm sm:text-base text-gray-500 max-w-2xl mx-auto">
						Experience the difference with our premium airport transfer services across Ireland.
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-5">
					{benefits.map((benefit) => (
						<div
							key={benefit.title}
							className="bg-white rounded-2xl shadow-sm px-6 py-6 flex flex-col gap-3"
						>
							<div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center mb-1">
								<benefit.icon className="w-5 h-5 text-white" />
							</div>
							<h3 className="text-base sm:text-lg font-semibold text-gray-900">
								{benefit.title}
							</h3>
							<p className="text-sm text-gray-500 leading-relaxed">
								{benefit.description}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}