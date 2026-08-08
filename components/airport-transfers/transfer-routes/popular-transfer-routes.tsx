"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  useGetAllAirportTransferBasedOnLocationQuery,
  useGetAllPrivateTransferBasedOnLocationQuery
} from "@/Redux/features/transfers/transfersApi";
import Loading from "@/components/common/loading";

export default function PopularTransferRoutes() {
  const searchParams = useSearchParams();
  const locationParam = searchParams.get("pickup") || searchParams.get("location");
  const serviceTypeParam = searchParams.get("serviceType") || "AIRPORT_TRANSFER";

  const {
    data: airportTransfers,
    isLoading: isAirportLoading,
    isError: isAirportError,
  } = useGetAllAirportTransferBasedOnLocationQuery({
    page: 1,
    limit: 1000,
  }, { skip: serviceTypeParam !== "AIRPORT_TRANSFER" });

  const {
    data: privateTransfers,
    isLoading: isPrivateLoading,
    isError: isPrivateError,
  } = useGetAllPrivateTransferBasedOnLocationQuery({
    page: 1,
    limit: 1000,
  }, { skip: serviceTypeParam !== "PRIVATE_TRANSFER" });


  console.log("privateTransfers of aaaaaaa", privateTransfers);

  const isLoading = isAirportLoading || isPrivateLoading;
  const isError = isAirportError || isPrivateError;
  const allTransfers = serviceTypeParam === "AIRPORT_TRANSFER" ? airportTransfers : privateTransfers;

  let transferRoutes: any[] = [];
  if (allTransfers?.data) {
    transferRoutes = allTransfers.data.flatMap((group: any) => group.trips || []);
  }

  transferRoutes = transferRoutes.filter(
    (t: any) => t.serviceType === serviceTypeParam
  );

  const popularRoutes = [
    "Shannon Airport",
    "Dublin Airport",
    "Cork Airport",
    "Knock Airport",
    "Kerry Airport",
  ];

  if (locationParam) {
    const searchLower = locationParam.toLowerCase();

    const isPopularRouteSearch = popularRoutes.some(
      (route) => route.toLowerCase() === searchLower
    );

    // Only use route.from as requested
    transferRoutes = transferRoutes.filter((route: any) => {
      const fromLower = route.from?.toLowerCase() || "";

      if (isPopularRouteSearch) {
        return fromLower === searchLower;
      } else {
        const fromMatch = fromLower.includes(searchLower) || searchLower.includes(fromLower);
        return fromMatch;
      }
    });
  }

  return (
    <section className="relative w-full py-16 md:py-24 bg-gray-50/50 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-100/40 blur-3xl opacity-60 mix-blend-multiply" />
        <div className="absolute bottom-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-indigo-100/40 blur-3xl opacity-60 mix-blend-multiply" />
      </div>

      <div className="w-full px-5 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
              Popular Transfer Routes
              {locationParam && (
                <> From <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">{locationParam}</span></>
              )}
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto font-medium">
              Choose from our most requested destinations.
            </p>
          </div>

          {isLoading ? (
            <Loading />
          ) : isError ? (
            <div className="text-center text-red-500 py-10">
              Failed to load routes. Please try again.
            </div>
          ) : transferRoutes.length === 0 ? (
            <div className="text-center text-gray-500 py-10">
              No routes found from this location.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {transferRoutes.map((transferRoute: any) => {
                const imageUrl =
                  transferRoute.images && transferRoute.images.length > 0
                    ? transferRoute.images[0]
                    : "/p1.png";

                // Format duration based on travelTimeMinutes
                const hours = Math.floor(
                  (transferRoute.travelTimeMinutes || 0) / 60,
                );
                const minutes = (transferRoute.travelTimeMinutes || 0) % 60;
                let durationText = "";
                if (hours > 0) {
                  durationText += `${hours} hour${hours > 1 ? "s" : ""}`;
                }
                if (minutes > 0) {
                  durationText += `${hours > 0 ? " " : ""}${minutes} min${minutes > 1 ? "s" : ""}`;
                }
                if (!durationText) {
                  durationText = "N/A";
                }

                // Strip HTML tags for a clean description summary and limit to 50 characters
                const plainDescriptionRaw = transferRoute.description
                  ? transferRoute.description.replace(/<[^>]*>?/gm, "")
                  : "No description available.";

                const plainDescription = plainDescriptionRaw.length > 100
                  ? plainDescriptionRaw.substring(0, 100) + "..."
                  : plainDescriptionRaw;

                return (
                  <div
                    key={transferRoute.id}
                    className="group bg-white/80 backdrop-blur-md rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 hover:border-white hover:-translate-y-2 flex flex-col relative h-full"
                  >
                    {/* Subtle Glow Behind Card */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0" />

                    <div className="relative h-48 md:h-56 w-full overflow-hidden z-10">
                      <img
                        src={imageUrl}
                        alt={transferRoute.title}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                    </div>
                    <div className="p-5 md:p-6 flex-1 flex flex-col gap-3 relative z-10">
                      <div className="flex flex-col mb-1">
                        <div className="flex items-start justify-between gap-2 mb-3">
                          <h3
                            className="text-lg font-bold text-gray-900 line-clamp-2 leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-indigo-600 transition-all duration-300"
                            title={transferRoute.title}
                          >
                            {transferRoute.title}
                          </h3>
                        </div>
                        <span className="inline-flex items-center text-xs font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full self-start">
                          {durationText}
                          {transferRoute.distanceKm
                            ? ` • ${transferRoute.distanceKm} km`
                            : ""}
                        </span>
                      </div>
                      <p
                        className="text-sm text-gray-600 leading-relaxed line-clamp-2 group-hover:text-gray-700 transition-colors"
                        title={plainDescription}
                      >
                        {plainDescription}
                      </p>

                      <div className="mt-auto pt-5 border-t border-gray-100">
                        <Link
                          href={`/transfer/private-car-transfer?pickup=${encodeURIComponent(locationParam || transferRoute.from)}&serviceType=${encodeURIComponent(transferRoute.serviceType)}&transferRoute=${encodeURIComponent(JSON.stringify({ ...transferRoute, description: undefined, images: undefined, includedContent: undefined, excludedContent: undefined }))}`}
                          className="block w-full"
                        >
                          <button className="w-full rounded-xl bg-blue-50 hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-600 text-blue-700 hover:text-white text-sm font-bold py-3.5 transition-all duration-300 shadow-sm hover:shadow-md">
                            Book Now
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
