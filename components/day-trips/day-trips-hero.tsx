"use client"

import { Search, Check, Clock, Shield, ChevronDown } from 'lucide-react';
import { Header } from '../common/header';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';



export default function Hero() {
    const [activeTab, setActiveTab] = useState("day-trips")
    const router = useRouter()


    const tabs = [
        { id: "transfer", label: "Transfer", href: "/" },
        { id: "hourly", label: "By the hour", icon: Clock, href: "/by-the-hour" },
        { id: "day-trips", label: "Day trips", href: "/day-trips" },
    ]
    const handleTabClick = (tab: typeof tabs[0]) => {
        if (tab.href) {
            router.push(tab.href)
        } else {
            setActiveTab(tab.id)
        }
    }
    return (
        <div className="relative text-white min-h-[80vh]">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: 'url(/ireland-hero-bg.jpg)' }}
            />
            {/* Overlay for text readability */}


            {/* Content */}
            <div className="relative z-10">
                {/* Header integrated into hero */}
                <Header />

                <div className="max-w-7xl mx-auto px-5 py-16 text-center">
                    <h1 className="text-5xl md:text-6xl font-bold mb-4 mt-8">
                        Explore Ireland's Wonders in One Day
                    </h1>
                    <p className="text-lg text-white/80 mb-10">
                        Discover over 1500+ day trips and private tours with local drivers.
                    </p>

                    {/* Tabs */}
                    <div className="flex justify-center mb-10">
                        <div className="inline-flex gap-0 bg-white/10 backdrop-blur-sm rounded-full p-1 border-2 border-white">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => handleTabClick(tab)}
                                    className={`px-6 py-2.5 rounded-full font-medium text-sm transition-all flex items-center gap-2 whitespace-nowrap ${activeTab === tab.id
                                        ? "bg-white text-gray-900 shadow-md"
                                        : "bg-transparent text-white hover:bg-white/10"
                                        }`}
                                >
                                    {tab.icon && <tab.icon className="w-4 h-4" />}
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Search Bar */}
                    <div className="max-w-2xl mx-auto mb-10">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Explore from..."
                                className="w-full py-4 px-6 pl-12 rounded-full text-gray-800 text-base focus:outline-none shadow-lg bg-white"
                            />
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <Link href={`/day-trips/day-trip-details`}>
                                <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 text-white px-8 py-2.5 rounded-full font-medium transition shadow-md">
                                    Search
                                </button>
                            </Link>
                        </div>
                    </div>

                    {/* Features */}
                    <div className="flex justify-center items-center gap-6 flex-wrap">
                        <div className="flex items-center gap-2 bg-white/15 px-5 py-2.5 rounded-full backdrop-blur-sm border border-white/20">
                            <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                                <Check className="w-3 h-3 text-white" />
                            </div>
                            <span className="text-sm font-medium">Flexible Cancellation</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white/15 px-5 py-2.5 rounded-full backdrop-blur-sm border border-white/20">
                            <div className="w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center">
                                <Clock className="w-3 h-3 text-white" />
                            </div>
                            <span className="text-sm font-medium">24/7 Customer Support</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white/15 px-5 py-2.5 rounded-full backdrop-blur-sm border border-white/20">
                            <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                                <Shield className="w-3 h-3 text-white" />
                            </div>
                            <span className="text-sm font-medium">Secure Payment</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
