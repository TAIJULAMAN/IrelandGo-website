"use client";

import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import {
  useGetAllAirportTransferBasedOnLocationQuery,
  useGetAllPrivateTransferBasedOnLocationQuery
} from "@/Redux/features/transfers/transfersApi";
import Loading from "@/components/common/loading";
import { ArrowRight } from "lucide-react";

export default function PopularTransferRoutes({ initialLocation }: { initialLocation?: string } = {}) {
  const searchParams = useSearchParams();
  const locationParam = initialLocation || searchParams.get("pickup") || searchParams.get("location");
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
    <section className="relative w-full py-10 md:py-16 bg-gray-50/50 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-100/40 blur-3xl opacity-60 mix-blend-multiply" />
        <div className="absolute bottom-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-indigo-100/40 blur-3xl opacity-60 mix-blend-multiply" />
      </div>

      <div className="w-full px-4 sm:px-5 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-2 sm:mb-4">
              Popular Transfer Routes
              {locationParam && (
                <> From <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">{locationParam}</span></>
              )}
            </h2>
            <p className="text-sm sm:text-lg text-gray-600 max-w-2xl mx-auto font-medium">
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
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
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
                    className="card-theme group"
                  >
                    {/* Subtle Glow Behind Card */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0" />

                    <div className="card-image-wrapper z-10">
                      <Image
                        src={imageUrl}
                        alt={transferRoute.title}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 300px"
                        className="object-cover transform group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                    </div>
                    <div className="p-4 sm:p-5 md:p-6 flex flex-col flex-1 relative z-10 justify-between gap-3">
                      <div>
                        <h3
                          className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-1.5 group-hover:text-blue-600 transition-colors line-clamp-1 leading-snug"
                          title={transferRoute.title}
                        >
                          {transferRoute.title}
                        </h3>

                        <div className="mb-2">
                          <span className="card-badge">
                            {durationText}
                            {transferRoute.distanceKm
                              ? ` • ${transferRoute.distanceKm} km`
                              : ""}
                          </span>
                        </div>

                        <p
                          className="text-xs sm:text-sm text-gray-500 mb-3 line-clamp-2 leading-relaxed min-h-[2.5rem]"
                          title={plainDescription}
                        >
                          {plainDescription}
                        </p>
                      </div>

                      <div className="mt-auto pt-2">
                        <Link
                          href={`/transfers/${(locationParam || transferRoute.from || "airport").toLowerCase().replace(/\s+/g, "-")}-to-${(transferRoute.to || "destination").toLowerCase().replace(/\s+/g, "-")}/`}
                          onClick={() => {
                            try {
                              sessionStorage.setItem("current_transfer_route", JSON.stringify(transferRoute));
                            } catch (e) {}
                          }}
                          className="btn-theme-primary w-full group/btn"
                        >
                          <span className="tracking-wide">Book Now</span>
                          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1.5" />
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
