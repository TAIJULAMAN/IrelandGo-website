import { Header2 } from "@/components/Header2";
import { Footer } from "@/components/layout/footer";

export default function TermsOfService() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Header2 />

            <main className="container mx-auto px-5 md:px-0 py-16 max-w-4xl">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                    Terms of Service
                </h1>
                <p className="text-gray-600 mb-8">Last updated: December 9, 2025</p>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-8">
                    <section>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
                        <p className="text-gray-700 leading-relaxed">
                            By accessing and using IrelandGo's services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Booking and Reservations</h2>
                        <p className="text-gray-700 leading-relaxed mb-3">
                            All bookings made through IrelandGo are subject to availability and confirmation. We reserve the right to refuse service to anyone for any reason at any time.
                        </p>
                        <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                            <li>Bookings must be made at least 24 hours in advance</li>
                            <li>Payment is required at the time of booking</li>
                            <li>Confirmation will be sent via email within 2 hours</li>
                            <li>Changes to bookings must be made at least 12 hours before scheduled departure</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Cancellation Policy</h2>
                        <p className="text-gray-700 leading-relaxed mb-3">
                            Cancellations are subject to the following terms:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                            <li>Cancellations made 48+ hours before departure: Full refund</li>
                            <li>Cancellations made 24-48 hours before departure: 50% refund</li>
                            <li>Cancellations made less than 24 hours before departure: No refund</li>
                            <li>No-shows will not be refunded</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Passenger Responsibilities</h2>
                        <p className="text-gray-700 leading-relaxed mb-3">
                            Passengers are responsible for:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                            <li>Being ready at the designated pickup location at the scheduled time</li>
                            <li>Providing accurate contact information</li>
                            <li>Ensuring all luggage complies with size and weight restrictions</li>
                            <li>Behaving respectfully towards drivers and other passengers</li>
                            <li>Complying with all safety regulations and driver instructions</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Liability and Insurance</h2>
                        <p className="text-gray-700 leading-relaxed">
                            IrelandGo maintains comprehensive insurance coverage for all vehicles and passengers. However, we are not liable for delays caused by traffic, weather conditions, or other circumstances beyond our control. We are not responsible for lost or damaged personal belongings unless proven to be due to our negligence.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Pricing and Payment</h2>
                        <p className="text-gray-700 leading-relaxed">
                            All prices are quoted in Euros (€) and include VAT. We accept major credit cards, debit cards, and online payment methods. Prices are subject to change without notice, but confirmed bookings will honor the price at the time of booking.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Modifications to Terms</h2>
                        <p className="text-gray-700 leading-relaxed">
                            IrelandGo reserves the right to modify these terms at any time. Changes will be effective immediately upon posting to our website. Continued use of our services after changes constitutes acceptance of the modified terms.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Contact Information</h2>
                        <p className="text-gray-700 leading-relaxed">
                            For questions about these Terms of Service, please contact us at:
                            <br />
                            <span className="font-medium">Email:</span> legal@irelandgo.ie
                            <br />
                            <span className="font-medium">Phone:</span> +353 1 234 5678
                        </p>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    );
}
