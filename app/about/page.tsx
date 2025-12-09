import { Header } from "@/components/header";
import { Footer } from "@/components/layout/footer";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function About() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            <main className="py-16">
                {/* Hero Section */}
                <section className="container mx-auto px-5 md:px-0 mb-16">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            About IrelandGo
                        </h1>
                        <p className="text-xl text-gray-600 leading-relaxed">
                            Your trusted partner for seamless travel experiences across the Emerald Isle
                        </p>
                    </div>
                </section>

                {/* Story Section */}
                <section className="container mx-auto px-5 md:px-0 mb-16">
                    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
                        <div className="space-y-4 text-gray-700 leading-relaxed">
                            <p>
                                Founded in 2010, IrelandGo has been connecting travelers with Ireland's most beautiful destinations for over 15 years. What started as a small family-run business with just two vehicles has grown into one of Ireland's most trusted transfer and tour services.
                            </p>
                            <p>
                                Our passion for Irish culture, history, and hospitality drives everything we do. We believe that every journey should be more than just transportation—it should be an experience that creates lasting memories.
                            </p>
                            <p>
                                Today, we operate a modern fleet of comfortable vehicles and work with a team of experienced, friendly drivers who are as passionate about Ireland as we are. Whether you're traveling for business or pleasure, we're committed to making your journey safe, comfortable, and memorable.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Values Section */}
                <section className="container mx-auto px-5 md:px-0 mb-16">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Values</h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                                    <span className="text-2xl">🛡️</span>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">Safety First</h3>
                                <p className="text-gray-600">
                                    Your safety is our top priority. All our vehicles are regularly maintained and our drivers are fully licensed and insured.
                                </p>
                            </div>

                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                                    <span className="text-2xl">⭐</span>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">Excellence</h3>
                                <p className="text-gray-600">
                                    We strive for excellence in every aspect of our service, from booking to drop-off, ensuring a premium experience.
                                </p>
                            </div>

                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                                    <span className="text-2xl">💚</span>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">Irish Hospitality</h3>
                                <p className="text-gray-600">
                                    Experience genuine Irish warmth and friendliness with every journey. We treat every passenger like family.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="bg-gradient-to-br from-blue-600 to-blue-700 py-16">
                    <div className="container mx-auto px-5 md:px-0">
                        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
                            <div>
                                <div className="text-4xl md:text-5xl font-bold mb-2">15+</div>
                                <div className="text-blue-100">Years Experience</div>
                            </div>
                            <div>
                                <div className="text-4xl md:text-5xl font-bold mb-2">50K+</div>
                                <div className="text-blue-100">Happy Customers</div>
                            </div>
                            <div>
                                <div className="text-4xl md:text-5xl font-bold mb-2">100+</div>
                                <div className="text-blue-100">Destinations</div>
                            </div>
                            <div>
                                <div className="text-4xl md:text-5xl font-bold mb-2">24/7</div>
                                <div className="text-blue-100">Support</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Team Section */}
                <section className="container mx-auto px-5 md:px-0 py-16">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Choose Us?</h2>
                        <div className="grid md:grid-cols-2 gap-6 text-left">
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Professional Drivers</h3>
                                <p className="text-gray-600">
                                    All our drivers are experienced, licensed, and knowledgeable about Irish history and culture.
                                </p>
                            </div>
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Modern Fleet</h3>
                                <p className="text-gray-600">
                                    Travel in comfort with our well-maintained, modern vehicles equipped with all amenities.
                                </p>
                            </div>
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Flexible Booking</h3>
                                <p className="text-gray-600">
                                    Easy online booking with flexible cancellation policies and instant confirmation.
                                </p>
                            </div>
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Competitive Pricing</h3>
                                <p className="text-gray-600">
                                    Transparent pricing with no hidden fees. Get the best value for your money.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
