"use client";

import { Header2 } from "@/components/common/Header2";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useGetTransfersBasedOnLocationQuery } from "@/Redux/features/transfers/transfersApi";

export default function PopularTransferRoutes() {
  const searchParams = useSearchParams();
  const locationParam = searchParams.get("location");

  const {
    data: transfersRoutes,
    isLoading,
    isError,
  } = useGetTransfersBasedOnLocationQuery(locationParam);

  const transferRoutes = transfersRoutes?.data || [];

  return (
    <section className="bg-white">
      <Header2 />
      <div className="w-full px-5 md:px-0 py-10 md:py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-2">
              Popular Transfer Routes From {locationParam}
            </h2>
            <p className="text-sm sm:text-base text-gray-500">
              Choose from our most requested destinations.
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
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

                // Strip HTML tags for a clean description summary
                const plainDescription = transferRoute.description
                  ? transferRoute.description.replace(/<[^>]*>?/gm, "")
                  : "No description available.";

                return (
                  <div
                    key={transferRoute.id}
                    className="bg-[#f7f9fc] rounded-2xl overflow-hidden shadow-sm flex flex-col"
                  >
                    <div className="h-40 w-full overflow-hidden">
                      <img
                        src={imageUrl}
                        alt={transferRoute.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="px-4 pt-4 pb-4 flex-1 flex flex-col gap-3">
                      <div className="flex items-center justify-between">
                        <h3
                          className="text-sm sm:text-base font-semibold text-gray-900 line-clamp-1"
                          title={transferRoute.title}
                        >
                          {transferRoute.title}
                        </h3>
                        <span className="text-xs sm:text-sm text-gray-500 whitespace-nowrap ml-2">
                          {durationText}
                          {transferRoute.distanceKm
                            ? ` • ${transferRoute.distanceKm} km`
                            : ""}
                        </span>
                      </div>
                      <p
                        className="text-xs sm:text-sm text-gray-600 leading-relaxed line-clamp-2"
                        title={plainDescription}
                      >
                        {plainDescription}
                      </p>

                      <div className="mt-auto pt-3">
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-xs text-gray-500">
                            Starting from
                          </span>
                          <span className="font-semibold text-blue-600">
                            €{transferRoute.price}
                          </span>
                        </div>
                        <Link
                          href={`/transfer/private-car-transfer?pickup=${encodeURIComponent(transferRoute.from)}&dropoff=${encodeURIComponent(transferRoute.to)}&transferRoute=${encodeURIComponent(JSON.stringify(transferRoute))}`}
                        >
                          <button className="w-full rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2">
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
