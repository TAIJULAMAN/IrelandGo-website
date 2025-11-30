"use client";

import { useEffect, useRef, useState } from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

const memories = [
    {
        image: 'https://images.pexels.com/photos/3849167/pexels-photo-3849167.jpeg?auto=compress&cs=tinysrgb&w=600',
        alt: 'Cliffs of Moher',
    },
    {
        image: 'https://images.pexels.com/photos/6775268/pexels-photo-6775268.jpeg?auto=compress&cs=tinysrgb&w=600',
        alt: 'Traditional Irish music',
    },
    {
        image: 'https://images.pexels.com/photos/17634011/pexels-photo-17634011.jpeg?auto=compress&cs=tinysrgb&w=600',
        alt: 'Irish monument',
    },
    {
        image: 'https://images.pexels.com/photos/3849167/pexels-photo-3849167.jpeg?auto=compress&cs=tinysrgb&w=600',
        alt: 'Green countryside',
    },
      {
        image: 'https://images.pexels.com/photos/6775268/pexels-photo-6775268.jpeg?auto=compress&cs=tinysrgb&w=600',
        alt: 'Traditional Irish music',
    },
    {
        image: 'https://images.pexels.com/photos/17634011/pexels-photo-17634011.jpeg?auto=compress&cs=tinysrgb&w=600',
        alt: 'Irish monument',
    },
];

export default function Memories() {
    const [api, setApi] = useState<any>(null);
    const intervalRef = useRef<number | null>(null);

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
            // If at end, embla with loop enabled wraps automatically
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
        <div className="bg-gray-50 py-16">
            <div className="">
                <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
                    Create Unforgettable Memories
                </h2>
                <div onMouseEnter={stop} onMouseLeave={start}>
                    <Carousel
                        opts={{ align: "start", loop: true }}
                        className="w-full"
                        setApi={setApi}
                    >
                    <CarouselContent className="-ml-4">
                        {memories.map((memory, index) => (
                            <CarouselItem key={index} className="pl-4 basis-3/4 sm:basis-1/2 lg:basis-1/4">
                                <div className="relative h-80 rounded-2xl overflow-hidden group cursor-pointer shadow-lg hover:shadow-2xl transition-shadow">
                                    <img
                                        src={memory.image}
                                        alt={memory.alt}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="bg-white text-gray-900 hover:bg-gray-100 border border-gray-200 w-10 h-10 -left-12" />
                    <CarouselNext className="bg-white text-gray-900 hover:bg-gray-100 border border-gray-200 w-10 h-10 -right-12" />
                    </Carousel>
                </div>
            </div>
        </div>
    );
}
