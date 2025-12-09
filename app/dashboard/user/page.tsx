"use client";

import { Header2 } from "@/components/Header2";
import { Footer } from "@/components/layout/footer";
import { useAuth } from "@/contexts/AuthContext";
import { Calendar, MapPin, Clock, CreditCard } from "lucide-react";

export default function UserDashboard() {
    const { user } = useAuth();

    return (
        <div className="min-h-screen bg-gray-50">
            <Header2 />

            <main className="pt-32 pb-16">
                <div className="container mx-auto px-5 md:px-0">
                    <div className="max-w-6xl mx-auto">
                        <div className="mb-8">
                            <h1 className="text-4xl font-bold text-gray-900 mb-2">
                                Welcome back, {user?.name}!
                            </h1>
                            <p className="text-gray-600">Manage your bookings and preferences</p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6 mb-8">
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                        <Calendar className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold text-gray-900">0</p>
                                        <p className="text-sm text-gray-600">Active Bookings</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                        <MapPin className="w-6 h-6 text-green-600" />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold text-gray-900">0</p>
                                        <p className="text-sm text-gray-600">Completed Trips</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                                        <Clock className="w-6 h-6 text-purple-600" />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold text-gray-900">0</p>
                                        <p className="text-sm text-gray-600">Pending</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Bookings</h2>
                            <div className="text-center py-12">
                                <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                <p className="text-gray-600 mb-4">No bookings yet</p>
                                <a href="/transfer" className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                                    Book Your First Trip
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
