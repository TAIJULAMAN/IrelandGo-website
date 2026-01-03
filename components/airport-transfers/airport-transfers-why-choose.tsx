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
		<section className="bg-gray-50 py-16 md:py-24">
			<div className="max-w-7xl mx-auto px-5">
				<div className="text-center mb-12">
					<h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
						Why Choose Airport Transfers for IrelandGO?
					</h2>
					<p className="text-lg text-gray-600 max-w-2xl mx-auto">
						Experience the difference with our premium airport transfer services across Ireland.
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{benefits.map((benefit) => (
						<div
							key={benefit.title}
							className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ring-1 ring-black/5"
						>
							<div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-600 transition-colors duration-300">
								<benefit.icon className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors duration-300" />
							</div>
							<h3 className="text-xl font-bold text-gray-900 text-center mb-3">
								{benefit.title}
							</h3>
							<p className="text-gray-600 text-center leading-relaxed">
								{benefit.description}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}