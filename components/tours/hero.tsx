"use client"

import { Header } from '../common/header';

export default function Hero() {
    return (
        <div className="relative text-white min-h-[300px]" style={{ background: 'linear-gradient(to bottom, #002F5E, #C0C8D0)' }}>
            {/* Header integrated into hero */}
            <Header />

            <div className="max-w-7xl mx-auto px-5 py-16 text-center">
                <h1 className="text-5xl md:text-6xl font-bold mb-4 mt-8">
                    Explore Ireland's Best Tours
                </h1>
                <p className="text-lg text-white/80 mb-10">
                    Discover our popular day trips and multi-day tours with local experts.
                </p>
            </div>
        </div>
    );
}
