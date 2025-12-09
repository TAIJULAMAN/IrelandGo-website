import { Header } from "@/components/header";
import { Footer } from "@/components/layout/footer";

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            <main className="container mx-auto px-5 md:px-0 py-16 max-w-4xl">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                    Privacy Policy
                </h1>
                <p className="text-gray-600 mb-8">Last updated: December 9, 2025</p>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-8">
                    <section>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Information We Collect</h2>
                        <p className="text-gray-700 leading-relaxed mb-3">
                            We collect information that you provide directly to us, including:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                            <li>Name, email address, and phone number</li>
                            <li>Pickup and dropoff locations</li>
                            <li>Payment information (processed securely through third-party providers)</li>
                            <li>Travel preferences and special requirements</li>
                            <li>Communication history with our customer service team</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. How We Use Your Information</h2>
                        <p className="text-gray-700 leading-relaxed mb-3">
                            We use the information we collect to:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                            <li>Process and manage your bookings</li>
                            <li>Communicate with you about your reservations</li>
                            <li>Send booking confirmations and updates</li>
                            <li>Improve our services and customer experience</li>
                            <li>Comply with legal obligations</li>
                            <li>Send promotional materials (with your consent)</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Information Sharing</h2>
                        <p className="text-gray-700 leading-relaxed mb-3">
                            We do not sell your personal information. We may share your information with:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                            <li>Our drivers and service providers to fulfill your bookings</li>
                            <li>Payment processors to handle transactions securely</li>
                            <li>Legal authorities when required by law</li>
                            <li>Third-party analytics services to improve our website</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Data Security</h2>
                        <p className="text-gray-700 leading-relaxed">
                            We implement industry-standard security measures to protect your personal information. This includes encryption of sensitive data, secure servers, and regular security audits. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Cookies and Tracking</h2>
                        <p className="text-gray-700 leading-relaxed mb-3">
                            We use cookies and similar tracking technologies to:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                            <li>Remember your preferences and settings</li>
                            <li>Analyze website traffic and usage patterns</li>
                            <li>Improve website functionality and user experience</li>
                            <li>Deliver personalized content and advertisements</li>
                        </ul>
                        <p className="text-gray-700 leading-relaxed mt-3">
                            You can control cookies through your browser settings, but disabling cookies may affect website functionality.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Your Rights</h2>
                        <p className="text-gray-700 leading-relaxed mb-3">
                            Under GDPR and Irish data protection laws, you have the right to:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                            <li>Access your personal data</li>
                            <li>Correct inaccurate or incomplete data</li>
                            <li>Request deletion of your data</li>
                            <li>Object to processing of your data</li>
                            <li>Request data portability</li>
                            <li>Withdraw consent at any time</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Data Retention</h2>
                        <p className="text-gray-700 leading-relaxed">
                            We retain your personal information for as long as necessary to provide our services and comply with legal obligations. Booking records are typically retained for 7 years for tax and accounting purposes. You may request deletion of your data at any time, subject to legal retention requirements.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Children's Privacy</h2>
                        <p className="text-gray-700 leading-relaxed">
                            Our services are not directed to children under 16. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Changes to This Policy</h2>
                        <p className="text-gray-700 leading-relaxed">
                            We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on our website and updating the "Last updated" date.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Contact Us</h2>
                        <p className="text-gray-700 leading-relaxed">
                            For questions about this Privacy Policy or to exercise your rights, please contact:
                            <br />
                            <span className="font-medium">Email:</span> privacy@irelandgo.ie
                            <br />
                            <span className="font-medium">Phone:</span> +353 1 234 5678
                            <br />
                            <span className="font-medium">Address:</span> IrelandGo, 123 O'Connell Street, Dublin 1, Ireland
                        </p>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    );
}
