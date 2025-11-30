import { Mail, Phone, MessageCircle, Clock, MapPin, HelpCircle, CreditCard, User, Calendar, Car, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Footer } from "@/components/layout/footer"

export default function SupportPage() {
    const faqs = [
        {
            question: "How do I book a ride?",
            answer: "To book a ride, log in to your account, enter your pickup and drop-off locations, select your preferred vehicle type, and confirm your booking."
        },
        {
            question: "What payment methods do you accept?",
            answer: "We accept all major credit/debit cards, PayPal, and in some regions, cash payments."
        },
        {
            question: "How can I cancel my ride?",
            answer: "You can cancel your ride through the 'My Rides' section in the app or website. Please note that cancellation fees may apply if you cancel after a certain time."
        },
        {
            question: "How do I become a driver?",
            answer: "Visit our 'Become a Driver' page and fill out the application form. Our team will review your application and get back to you within 3-5 business days."
        },
        {
            question: "Is there a mobile app available?",
            answer: "Yes, you can download our mobile app from the App Store or Google Play Store for a better booking experience."
        },
        {
            question: "How do I update my account information?",
            answer: "You can update your account information in the 'Profile' section of your account."
        },
    ]

    const contactMethods = [
        {
            icon: <Mail className="h-6 w-6 text-blue-600" />,
            title: "Email Us",
            description: "support@irelandgo.com",
            action: "Send us an email"
        },
        {
            icon: <Phone className="h-6 w-6 text-green-600" />,
            title: "Call Us",
            description: "+353 1 234 5678",
            action: "Call support"
        },
        {
            icon: <MessageCircle className="h-6 w-6 text-purple-600" />,
            title: "Live Chat",
            description: "Available 24/7",
            action: "Start chat"
        },
    ]

    const helpCategories = [
        {
            icon: <CreditCard className="h-5 w-5" />,
            title: "Payments & Pricing",
            description: "Billing, refunds, and payment methods"
        },
        {
            icon: <User className="h-5 w-5" />,
            title: "Account & Profile",
            description: "Login, registration, and account settings"
        },
        {
            icon: <Car className="h-5 w-5" />,
            title: "Rides & Bookings",
            description: "Booking, cancellations, and ride issues"
        },
        {
            icon: <Shield className="h-5 w-5" />,
            title: "Safety & Guidelines",
            description: "Safety features and community guidelines"
        },
    ]

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-12">
                {/* Hero Section */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">How can we help you today?</h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Find answers to common questions or get in touch with our support team.
                    </p>
                    
                    {/* Search Bar */}
                    <div className="mt-8 max-w-2xl mx-auto relative">
                        <div className="relative">
                            <HelpCircle className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search help articles..."
                                className="w-full pl-12 pr-6 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700">
                                Search
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Help Categories */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {helpCategories.map((category, index) => (
                        <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                            <CardContent className="p-6">
                                <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center mb-4">
                                    {category.icon}
                                </div>
                                <h3 className="text-lg font-semibold mb-2">{category.title}</h3>
                                <p className="text-gray-600 text-sm">{category.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* FAQ Section */}
                <div className="mb-16">
                    <h2 className="text-2xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <div key={index} className="border-b border-gray-200 pb-4">
                                <h3 className="text-lg font-medium text-gray-900 mb-2">{faq.question}</h3>
                                <p className="text-gray-600">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Contact Section */}
                <div className="bg-white rounded-xl shadow-md p-8">
                    <div className="text-center mb-10">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Still need help?</h2>
                        <p className="text-gray-600">Our support team is here to help you</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {contactMethods.map((method, index) => (
                            <div key={index} className="text-center p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                                <div className="flex justify-center mb-4">
                                    {method.icon}
                                </div>
                                <h3 className="text-lg font-semibold mb-2">{method.title}</h3>
                                <p className="text-gray-600 mb-4">{method.description}</p>
                                <Button variant="outline" className="w-full">
                                    {method.action}
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Office Information */}
                <div className="mt-16 bg-white rounded-xl shadow-md p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Office</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <div className="flex items-start space-x-4 mb-6">
                                <MapPin className="h-6 w-6 text-blue-600 mt-1" />
                                <div>
                                    <h3 className="font-semibold">Headquarters</h3>
                                    <p className="text-gray-600">123 Transport Street, Dublin 2, Ireland</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-4">
                                <Clock className="h-6 w-6 text-blue-600 mt-1" />
                                <div>
                                    <h3 className="font-semibold">Working Hours</h3>
                                    <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
                                    <p className="text-gray-600">Saturday: 10:00 AM - 4:00 PM</p>
                                    <p className="text-gray-600">Sunday: Closed</p>
                                </div>
                            </div>
                        </div>
                        <div className="rounded-lg overflow-hidden h-64">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d19071.7156398!2d-6.2670346!3d53.341738!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48670e80ea27ac2f%3A0xa00c7a9973171a0!2sDublin%2C%20Ireland!5e0!3m2!1sen!2sbd!4v1630000000000!5m2!1sen!2sbd"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="IrelandGo Office Location"
                                className="rounded-lg"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <Footer className="mt-16" />
        </div>
    )
}
