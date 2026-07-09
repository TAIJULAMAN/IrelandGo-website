"use client";

import { useEffect, useRef, useState } from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
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
        <section className="relative w-full py-16 md:py-24 bg-gray-50/50 overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-100/40 blur-3xl opacity-60 mix-blend-multiply" />
                <div className="absolute bottom-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-indigo-100/40 blur-3xl opacity-60 mix-blend-multiply" />
            </div>

            <div className="max-w-7xl mx-auto px-5 lg:px-8 relative z-10">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-center text-gray-900 mb-12 lg:mb-16">
                    Create <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Unforgettable Memories</span>
                </h2>
                <div onMouseEnter={stop} onMouseLeave={start} className="relative">
                    <Carousel
                        opts={{ align: "start", loop: true }}
                        className="w-full -my-8"
                        setApi={setApi}
                    >
                        <CarouselContent className="-ml-4 py-8 px-4">
                            {memories.map((memory, index) => (
                                <CarouselItem key={index} className="pl-4 basis-[85%] sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                                    <div className="relative h-80 md:h-96 rounded-2xl overflow-hidden group cursor-pointer shadow-md transition-all duration-500 ring-1 ring-black/5 hover:-translate-y-2">
                                        <img
                                            src={memory.image}
                                            alt={memory.alt}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                                        <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                            <p className="text-white font-bold text-lg leading-tight opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                                {memory.alt}
                                            </p>
                                        </div>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>
                </div>
            </div>
        </section>
    );
}
