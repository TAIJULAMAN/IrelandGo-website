"use client";

import { useSearchParams } from "next/navigation";
import {
	useGetAllAirportTransferBasedOnLocationQuery,
	useGetAllPrivateTransferBasedOnLocationQuery
} from "@/Redux/features/transfers/transfersApi";

export default function TravelTips() {
	const searchParams = useSearchParams();
	const transferRouteParam = searchParams.get("transferRoute");
	const pickupParam = searchParams.get("pickup") || "Dublin";
	const dropoffParam = searchParams.get("dropoff") || "Galway";

	let transferRoute: any = null;
	try {
		if (transferRouteParam) {
			transferRoute = JSON.parse(transferRouteParam);
		}
	} catch (e) {
		console.error("Failed to parse transfer route", e);
	}

	const serviceTypeParam = searchParams.get("serviceType") || transferRoute?.serviceType || "AIRPORT_TRANSFER";

	const { data: airportTransfers } = useGetAllAirportTransferBasedOnLocationQuery({
		page: 1,
		limit: 1000,
	}, { skip: serviceTypeParam !== "AIRPORT_TRANSFER" });

	const { data: privateTransfers } = useGetAllPrivateTransferBasedOnLocationQuery({
		page: 1,
		limit: 1000,
	}, { skip: serviceTypeParam !== "PRIVATE_TRANSFER" });

	const allTransfers = serviceTypeParam === "AIRPORT_TRANSFER" ? airportTransfers : privateTransfers;

	let fullDescription = transferRoute?.description;

	// If description was stripped from URL, try to find it in the fetched data
	if (!fullDescription && allTransfers?.data && transferRoute?.id) {
		const routes = allTransfers.data.flatMap((group: any) => group.trips || []);
		const matchedRoute = routes.find((r: any) => r.id === transferRoute.id);
		if (matchedRoute?.description) {
			fullDescription = matchedRoute.description;
		}
	}

	return (
		<section className="py-10 sm:py-14">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 text-gray-900">
				<h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-3">
					From {transferRoute?.from || pickupParam} to {transferRoute?.to || dropoffParam} : Travel Tips
				</h2>

				{fullDescription && (
					<div
						className="prose prose-sm sm:prose-base text-gray-700 max-w-none"
						dangerouslySetInnerHTML={{ __html: fullDescription }}
					/>

				)}
			</div>
		</section>
	);
}