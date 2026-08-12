"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useContactMutation } from "@/Redux/features/contact/contactApi";
import { toast } from "sonner";

export default function Contact() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    contactNumber: "",
    subject: "",
    description: "",
  });

  const [createContact, { isLoading }] = useContactMutation();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await createContact(formData).unwrap();
      if (res.success) {
        toast.success(res.message || "Customer contact created successfully");
        setFormData({
          fullName: "",
          email: "",
          contactNumber: "",
          subject: "",
          description: "",
        });
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to send message. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pt-24 pb-16">
      <main className="flex-1 relative text-white overflow-hidden px-5 sm:px-6 md:px-8 ">
        <section className="max-w-7xl mx-auto px-5 sm:px-6 md:px-8 mb-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-xl md:text-[clamp(1.75rem,3vw,2.5rem)] font-bold mb-3 md:mb-4 text-balance leading-tight px-4 text-gray-900">
              Get in Touch
            </h1>
            <p className="text-sm md:text-base text-gray-900 mb-6 md:mb-8 px-4">
              Have questions? We'd love to hear from you. Send us a message and
              we'll respond as soon as possible.
            </p>
          </div>
        </section>
        <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-8">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Send us a Message
              </h2>

              <form className="space-y-5" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition text-gray-900"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition text-gray-900"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contactNumber"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="contactNumber"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition text-gray-900"
                    placeholder="+353 1 234 5678"
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition text-gray-900"
                    placeholder="How can we help?"
                  />
                </div>

                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Message *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition resize-none text-gray-900"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-base font-semibold disabled:opacity-70"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  ) : (
                    <Send className="w-5 h-5 mr-2" />
                  )}
                  {isLoading ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Contact Information
                </h2>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        Address
                      </h3>
                      <p className="text-gray-600">
                        225 Cratloe Village,
                        <br />
                        Limerick, Ireland.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        Phone
                      </h3>
                      <p className="text-gray-600">+353 85 809 0960</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        Email
                      </h3>
                      <p className="text-gray-600">info@tourenzo.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        WhatsApp
                      </h3>
                      <p className="text-gray-600">
                        <a
                          href="https://wa.me/3538580909060"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-emerald-600 hover:text-emerald-700 hover:underline transition"
                        >
                          +353 85 809 0960
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg shadow-sm p-8 text-white">
                <h3 className="text-xl font-bold mb-4">
                  Need Immediate Assistance?
                </h3>
                <p className="text-blue-100 mb-6">
                  Our customer support team is available 24/7 for urgent
                  inquiries and booking assistance.
                </p>
                <Button className="w-full bg-white text-blue-600 hover:bg-blue-50 font-semibold">
                  <Phone className="w-5 h-5 mr-2" />
                  Call Now: +353 85 809 0960
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
