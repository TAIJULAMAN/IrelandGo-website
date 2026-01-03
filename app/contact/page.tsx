import { Footer } from "@/components/layout/footer";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header2 } from "@/components/common/Header2";

export default function Contact() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Header2 />

            <main className="py-16">
                {/* Hero Section */}
                <section className="container mx-auto px-5 md:px-0 mb-16">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            Get in Touch
                        </h1>
                        <p className="text-xl text-gray-600 leading-relaxed">
                            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                        </p>
                    </div>
                </section>

                <div className="container mx-auto px-5 md:px-0">
                    <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
                        {/* Contact Form */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>

                            <form className="space-y-5">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                        placeholder="John Doe"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                        placeholder="john@example.com"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                        placeholder="+353 1 234 5678"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                                        Subject *
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                        placeholder="How can we help?"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                        Message *
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        required
                                        rows={5}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-none"
                                        placeholder="Tell us more about your inquiry..."
                                    />
                                </div>

                                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-base font-semibold">
                                    <Send className="w-5 h-5 mr-2" />
                                    Send Message
                                </Button>
                            </form>
                        </div>

                        {/* Contact Information */}
                        <div className="space-y-6">
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>

                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                            <MapPin className="w-6 h-6 text-blue-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900 mb-1">Address</h3>
                                            <p className="text-gray-600">
                                                123 O'Connell Street<br />
                                                Dublin 1, D01 XY45<br />
                                                Ireland
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                            <Phone className="w-6 h-6 text-green-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
                                            <p className="text-gray-600">
                                                +353 1 234 5678<br />
                                                +353 87 123 4567 (Mobile)
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                                            <Mail className="w-6 h-6 text-purple-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                                            <p className="text-gray-600">
                                                info@irelandgo.ie<br />
                                                support@irelandgo.ie
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                                            <Clock className="w-6 h-6 text-orange-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900 mb-1">Business Hours</h3>
                                            <p className="text-gray-600">
                                                Monday - Friday: 8:00 AM - 8:00 PM<br />
                                                Saturday - Sunday: 9:00 AM - 6:00 PM<br />
                                                <span className="text-blue-600 font-medium">24/7 Emergency Support</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Quick Links */}
                            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl shadow-sm p-8 text-white">
                                <h3 className="text-xl font-bold mb-4">Need Immediate Assistance?</h3>
                                <p className="text-blue-100 mb-6">
                                    Our customer support team is available 24/7 for urgent inquiries and booking assistance.
                                </p>
                                <Button className="w-full bg-white text-blue-600 hover:bg-blue-50 font-semibold">
                                    <Phone className="w-5 h-5 mr-2" />
                                    Call Now: +353 1 234 5678
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}