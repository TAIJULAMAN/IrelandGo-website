"use client";

import { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Send,
  MessageCircle,
  Loader2,
  Calendar,
  Users,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useContactMutation } from "@/Redux/features/contact/contactApi";
import { toast } from "sonner";

export default function Contact() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    contactNumber: "",
    address: "",
    startDate: "",
    endDate: "",
    numberOfPassengers: "1",
    specialRequest: "",
  });

  const [createContact, { isLoading }] = useContactMutation();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const todayStr = new Date().toISOString().split("T")[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName.trim()) {
      toast.error("Please enter your name");
      return;
    }
    if (!formData.email.trim()) {
      toast.error("Please enter your email");
      return;
    }
    if (!formData.contactNumber.trim()) {
      toast.error("Please enter your phone number");
      return;
    }
    if (!formData.address.trim()) {
      toast.error("Please enter your pickup address or location");
      return;
    }
    if (!formData.startDate) {
      toast.error("Please select a start date");
      return;
    }
    if (!formData.endDate) {
      toast.error("Please select an end date");
      return;
    }
    if (new Date(formData.endDate) < new Date(formData.startDate)) {
      toast.error("End date cannot be earlier than start date");
      return;
    }

    const passengersCount = parseInt(formData.numberOfPassengers, 10);
    if (isNaN(passengersCount) || passengersCount < 1) {
      toast.error("Number of passengers must be at least 1");
      return;
    }

    try {
      const payload = {
        name: formData.fullName.trim(),
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        phone: formData.contactNumber.trim(),
        contactNumber: formData.contactNumber.trim(),
        address: formData.address.trim(),
        startDate: formData.startDate,
        endDate: formData.endDate,
        numberOfPassengers: passengersCount,
        specialRequest: formData.specialRequest.trim() || undefined,
        subject: `Travel Inquiry from ${formData.fullName.trim()}`,
        description: formData.specialRequest.trim() || undefined,
      };

      const res = await createContact(payload).unwrap();
      if (res.success) {
        toast.success(
          res.message || "Your inquiry has been submitted successfully!",
        );
        setFormData({
          fullName: "",
          email: "",
          contactNumber: "",
          address: "",
          startDate: "",
          endDate: "",
          numberOfPassengers: "1",
          specialRequest: "",
        });
      }
    } catch (error: any) {
      toast.error(
        error?.data?.message || "Failed to send message. Please try again.",
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pt-24 pb-16">
      <main className="flex-1 relative text-gray-900 overflow-hidden px-5 sm:px-6 md:px-8">
        <section className="max-w-7xl mx-auto px-5 sm:px-6 md:px-8 mb-12">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-2xl md:text-[clamp(2rem,3vw,2.75rem)] font-bold mb-3 md:mb-4 text-balance leading-tight px-4 text-gray-900">
              Get in Touch
            </h1>
            <p className="text-sm md:text-base text-gray-600 mb-4 px-4 max-w-2xl mx-auto">
              Planning a private transfer, tour, or custom journey across
              Ireland? Send us your travel details and our team will get back to
              you promptly.
            </p>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-7 bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Send us a Message
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Fill in your details and travel preferences below.
                </p>
              </div>

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block text-sm font-medium text-gray-700 mb-1.5"
                    >
                      Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition text-gray-900 text-sm"
                        placeholder="John Doe"
                      />
                      <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1.5"
                    >
                      Email <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition text-gray-900 text-sm"
                        placeholder="john@example.com"
                      />
                      <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Phone */}
                  <div>
                    <label
                      htmlFor="contactNumber"
                      className="block text-sm font-medium text-gray-700 mb-1.5"
                    >
                      Phone <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        id="contactNumber"
                        name="contactNumber"
                        value={formData.contactNumber}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition text-gray-900 text-sm"
                        placeholder="+353 85 123 4567"
                      />
                      <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  {/* Address */}
                  <div>
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-gray-700 mb-1.5"
                    >
                      Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition text-gray-900 text-sm"
                        placeholder="Dublin Airport or City Address"
                      />
                      <MapPin className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Start Date */}
                  <div>
                    <label
                      htmlFor="startDate"
                      className="block text-sm font-medium text-gray-700 mb-1.5"
                    >
                      Start Date <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        id="startDate"
                        name="startDate"
                        min={todayStr}
                        value={formData.startDate}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition text-gray-900 text-sm"
                      />
                      <Calendar className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  {/* End Date */}
                  <div>
                    <label
                      htmlFor="endDate"
                      className="block text-sm font-medium text-gray-700 mb-1.5"
                    >
                      End Date <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        id="endDate"
                        name="endDate"
                        min={formData.startDate || todayStr}
                        value={formData.endDate}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition text-gray-900 text-sm"
                      />
                      <Calendar className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Number of Passengers */}
                <div>
                  <label
                    htmlFor="numberOfPassengers"
                    className="block text-sm font-medium text-gray-700 mb-1.5"
                  >
                    Number of Passengers <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      id="numberOfPassengers"
                      name="numberOfPassengers"
                      min={1}
                      max={60}
                      value={formData.numberOfPassengers}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition text-gray-900 text-sm"
                      placeholder="1"
                    />
                    <Users className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* Special Request */}
                <div>
                  <label
                    htmlFor="specialRequest"
                    className="block text-sm font-medium text-gray-700 mb-1.5"
                  >
                    Special Request
                  </label>
                  <textarea
                    id="specialRequest"
                    name="specialRequest"
                    value={formData.specialRequest}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition resize-none text-gray-900 text-sm"
                    placeholder="Tell us about your trip details, vehicle preferences, luggage, or any custom requirements..."
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-5 text-base font-semibold shadow-sm hover:shadow transition disabled:opacity-70 mt-2"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  ) : (
                    <Send className="w-5 h-5 mr-2" />
                  )}
                  {isLoading ? "Submitting Inquiry..." : "Send Message"}
                </Button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Contact Information
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        Phone
                      </h3>
                      <p className="text-gray-600 text-sm">+353 85 809 0960</p>
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
                      <p className="text-gray-600 text-sm">info@tourenzo.com</p>
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
                      <p className="text-gray-600 text-sm">
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

              {/* Quick Support Callout */}
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl shadow-sm p-6 sm:p-8 text-white">
                <h3 className="text-xl font-bold mb-2">
                  Need Immediate Assistance?
                </h3>
                <p className="text-blue-100 mb-6 text-sm">
                  Our customer support team is available 24/7 for urgent
                  inquiries and booking assistance.
                </p>
                <a
                  href="tel:+353858090960"
                  className="w-full inline-flex items-center justify-center bg-white text-blue-600 hover:bg-blue-50 font-semibold py-3 px-4 rounded-lg transition"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call Now: +353 85 809 0960
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
