"use client";

import { useMemo } from "react";
import { useGetAllMemoriesQuery } from "@/Redux/features/memory/memoryApi";

interface DisplayMemory {
  id: string;
  title: string;
  image: string;
}

const fallbackMemories: DisplayMemory[] = [
  {
    id: "fallback-1",
    title: "Cliffs of Moher",
    image:
      "https://images.pexels.com/photos/3849167/pexels-photo-3849167.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: "fallback-2",
    title: "Traditional Irish music",
    image:
      "https://images.pexels.com/photos/6775268/pexels-photo-6775268.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: "fallback-3",
    title: "Irish monument",
    image:
      "https://images.pexels.com/photos/17634011/pexels-photo-17634011.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: "fallback-4",
    title: "Green countryside",
    image:
      "https://images.pexels.com/photos/3849167/pexels-photo-3849167.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: "fallback-5",
    title: "Traditional Irish music",
    image:
      "https://images.pexels.com/photos/6775268/pexels-photo-6775268.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: "fallback-6",
    title: "Irish monument",
    image:
      "https://images.pexels.com/photos/17634011/pexels-photo-17634011.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
];

export default function Memories() {
  const { data: memoryData, isLoading } = useGetAllMemoriesQuery();

  // Transform backend memories into displayable items (supporting multi-images per memory)
  const displayList: DisplayMemory[] = useMemo(() => {
    const backendItems = memoryData?.data;
    if (
      !backendItems ||
      !Array.isArray(backendItems) ||
      backendItems.length === 0
    ) {
      return fallbackMemories;
    }

    const items: DisplayMemory[] = [];
    backendItems.forEach((mem, index) => {
      const title = mem.title || "Unforgettable Memory";
      const rawImages = Array.isArray(mem.image)
        ? mem.image
        : typeof mem.image === "string"
          ? [mem.image]
          : [];

      if (rawImages.length === 0) {
        items.push({
          id: mem.id || `mem-${index}`,
          title,
          image: fallbackMemories[index % fallbackMemories.length].image,
        });
      } else {
        rawImages.forEach((imgUrl, imgIdx) => {
          items.push({
            id: `${mem.id || index}-${imgIdx}`,
            title,
            image: imgUrl,
          });
        });
      }
    });

    return items.length > 0 ? items : fallbackMemories;
  }, [memoryData]);

  // Ensure list has at least 8 items so a single track easily covers displays
  const marqueeItems = useMemo(() => {
    if (!displayList || displayList.length === 0) return fallbackMemories;
    let list = [...displayList];
    while (list.length < 8) {
      list = [...list, ...displayList];
    }
    return list;
  }, [displayList]);

  // Dynamic animation duration based on count to keep glide speed consistent and smooth
  const trackDuration = `${Math.max(30, marqueeItems.length * 4.5)}s`;

  return (
    <section className="relative w-full py-10 md:py-16 bg-gray-50/50 overflow-hidden">
      {/* Inline Keyframes for smooth continuous infinite right-to-left slide */}
      <style jsx>{`
        @keyframes memoriesInfiniteSlide {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-100%, 0, 0);
          }
        }
        .memories-container {
          container-type: inline-size;
        }
        .memories-track {
          display: flex;
          flex-shrink: 0;
          gap: 16px;
          padding-right: 16px;
          will-change: transform;
        }
        .memory-card {
          width: calc((100cqw - 16px) / 2);
          flex-shrink: 0;
        }
        @media (min-width: 640px) {
          .memories-track {
            gap: 20px;
            padding-right: 20px;
          }
          .memory-card {
            width: calc((100cqw - 20px) / 2);
          }
        }
        @media (min-width: 768px) {
          .memories-track {
            gap: 20px;
            padding-right: 20px;
          }
          .memory-card {
            width: calc((100cqw - 40px) / 3);
          }
        }
        @media (min-width: 1024px) {
          .memories-track {
            gap: 24px;
            padding-right: 24px;
          }
          .memory-card {
            width: calc((100cqw - 72px) / 4);
          }
        }
        .memories-container:hover .memories-track {
          animation-play-state: paused !important;
        }
      `}</style>

      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-100/40 blur-3xl opacity-60 mix-blend-multiply" />
        <div className="absolute bottom-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-indigo-100/40 blur-3xl opacity-60 mix-blend-multiply" />
      </div>

      <div className="max-w-7xl mx-auto px-5 relative z-10">
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-extrabold text-center text-gray-900 mb-4">
          Create Unforgettable Memories
        </h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-8 sm:mb-12 text-sm md:text-base lg:text-lg">
          Browse through moments captured on our journeys. Every trip offers a
          unique opportunity to explore, discover, and cherish the beauty of
          Ireland.
        </p>

        {/* Infinite Right-to-Left Slider */}
        <div className="relative w-full overflow-hidden memories-container">
          {/* Edge fade masks for luxury look */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-gray-50/90 to-transparent z-20" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-gray-50/90 to-transparent z-20" />

          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 py-4">
              {[1, 2, 3, 4].map((n) => (
                <div
                  key={n}
                  className="h-56 sm:h-72 md:h-80 lg:h-96 rounded-xl sm:rounded-2xl bg-slate-200/70 animate-pulse"
                />
              ))}
            </div>
          ) : (
            <div className="flex overflow-hidden py-4 select-none">
              {/* Track 1 */}
              <div
                className="memories-track items-center"
                style={{
                  animation: `memoriesInfiniteSlide ${trackDuration} linear infinite`,
                }}
              >
                {marqueeItems.map((memory, index) => (
                  <div
                    key={`t1-${memory.id}-${index}`}
                    className="relative memory-card h-56 sm:h-72 md:h-80 lg:h-96 shrink-0 rounded-xl sm:rounded-2xl overflow-hidden group cursor-pointer shadow-md transition-all duration-500 ring-1 ring-black/5 hover:-translate-y-2"
                  >
                    <img
                      src={memory.image}
                      alt={memory.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                  </div>
                ))}
              </div>

              {/* Track 2 (Seamless Infinite Duplicate) */}
              <div
                className="memories-track items-center"
                aria-hidden="true"
                style={{
                  animation: `memoriesInfiniteSlide ${trackDuration} linear infinite`,
                }}
              >
                {marqueeItems.map((memory, index) => (
                  <div
                    key={`t2-${memory.id}-${index}`}
                    className="relative memory-card h-56 sm:h-72 md:h-80 lg:h-96 shrink-0 rounded-xl sm:rounded-2xl overflow-hidden group cursor-pointer shadow-md transition-all duration-500 ring-1 ring-black/5 hover:-translate-y-2"
                  >
                    <img
                      src={memory.image}
                      alt={memory.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
