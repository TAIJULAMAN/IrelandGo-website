"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    type CarouselApi,
} from "@/components/ui/carousel";
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
        image: "https://images.pexels.com/photos/3849167/pexels-photo-3849167.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
        id: "fallback-2",
        title: "Traditional Irish music",
        image: "https://images.pexels.com/photos/6775268/pexels-photo-6775268.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
        id: "fallback-3",
        title: "Irish monument",
        image: "https://images.pexels.com/photos/17634011/pexels-photo-17634011.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
        id: "fallback-4",
        title: "Green countryside",
        image: "https://images.pexels.com/photos/3849167/pexels-photo-3849167.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
        id: "fallback-5",
        title: "Traditional Irish music",
        image: "https://images.pexels.com/photos/6775268/pexels-photo-6775268.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
        id: "fallback-6",
        title: "Irish monument",
        image: "https://images.pexels.com/photos/17634011/pexels-photo-17634011.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
];

export default function Memories() {
    const [api, setApi] = useState<CarouselApi | null>(null);
    const intervalRef = useRef<number | null>(null);

    const { data: memoryData, isLoading } = useGetAllMemoriesQuery();

    // Transform backend memories into displayable items (supporting multi-images per memory)
    const displayList: DisplayMemory[] = useMemo(() => {
        const backendItems = memoryData?.data;
        if (!backendItems || !Array.isArray(backendItems) || backendItems.length === 0) {
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

    const stop = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    };

    const start = () => {
        stop();
        intervalRef.current = window.setInterval(() => {
            if (!api) return;
            api.scrollNext();
        }, 2500);
    };

    useEffect(() => {
        if (!api) return;
        start();
        api.on("pointerDown", stop);
        api.on("pointerUp", start);
        api.on("reInit", start);
        return () => {
            stop();
            api.off("pointerDown", stop);
            api.off("pointerUp", start);
            api.off("reInit", start);
        };
    }, [api]);

    return (
        <section className="relative w-full py-10 md:py-16 bg-gray-50/50 overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-100/40 blur-3xl opacity-60 mix-blend-multiply" />
                <div className="absolute bottom-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-indigo-100/40 blur-3xl opacity-60 mix-blend-multiply" />
            </div>

            <div className="max-w-7xl mx-auto px-5 relative z-10">
                <h2 className="text-2xl md:text-4xl lg:text-5xl font-extrabold text-center text-gray-900 mb-8 sm:mb-12">
                    Create <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Unforgettable Memories</span>
                </h2>

                <div onMouseEnter={stop} onMouseLeave={start} className="relative">
                    {isLoading ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 py-4 sm:py-8">
                            {[1, 2, 3, 4].map((n) => (
                                <div key={n} className="h-48 sm:h-80 md:h-96 rounded-xl sm:rounded-2xl bg-slate-200/70 animate-pulse" />
                            ))}
                        </div>
                    ) : (
                        <Carousel
                            opts={{ align: "start", loop: true }}
                            className="w-full -my-4 sm:-my-8"
                            setApi={setApi}
                        >
                            <CarouselContent className="-ml-3 sm:-ml-4 py-4 sm:py-8 px-2 sm:px-4">
                                {displayList.map((memory) => (
                                    <CarouselItem
                                        key={memory.id}
                                        className="pl-3 sm:pl-4 basis-1/2 sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                                    >
                                        <div className="relative h-48 sm:h-80 md:h-96 rounded-xl sm:rounded-2xl overflow-hidden group cursor-pointer shadow-md transition-all duration-500 ring-1 ring-black/5 hover:-translate-y-2">
                                            <img
                                                src={memory.image}
                                                alt={memory.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                                            <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-6 translate-y-2 sm:translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                                <p className="text-white font-bold text-xs sm:text-lg leading-tight drop-shadow">
                                                    {memory.title}
                                                </p>
                                            </div>
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                        </Carousel>
                    )}
                </div>
            </div>
        </section>
    );

}
