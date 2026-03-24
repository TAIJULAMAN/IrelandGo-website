"use client"

import { Mail, Phone, HelpCircle, Send, Sparkles, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useState } from "react"
import { useSupportByMailMutation } from "@/Redux/features/support/supportApi"
import { toast } from "sonner"

export default function SupportPage() {
    const [supportByMail, { isLoading }] = useSupportByMailMutation()
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        contactNumber: "",
        subject: "",
        description: "",
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            const res = await supportByMail(formData).unwrap()
            if (res?.success) {
                toast.success(res?.message || "Support request sent successfully!")
                setFormData({ fullName: "", email: "", contactNumber: "", subject: "", description: "" })
            } else {
                toast.error(res?.message || "Failed to send support request")
            }
        } catch (err: any) {
            toast.error(err?.data?.message || "Something went wrong")
        }
    }

    const faqs = [
        {
            question: "How do I book a ride?",
            answer: "To book a ride, log in to your account, enter your pickup and drop-off locations, select your preferred vehicle type, and confirm your booking. You can also schedule rides in advance for future dates."
        },
        {
            question: "What payment methods do you accept?",
            answer: "We accept all major credit/debit cards (Visa, Mastercard, American Express), PayPal, and in some regions, cash payments. You can save multiple payment methods in your account for quick checkout."
        },
        {
            question: "How can I cancel my ride?",
            answer: "You can cancel your ride through the 'My Rides' section in the app or website. Please note that cancellation fees may apply if you cancel after a certain time. Free cancellation is available within 5 minutes of booking."
        },
        {
            question: "How do I become a driver?",
            answer: "Visit our 'Become a Driver' page and fill out the application form. Our team will review your application and get back to you within 3-5 business days. You'll need a valid driver's license, vehicle registration, and insurance."
        },
        {
            question: "Can I track my ride in real-time?",
            answer: "Yes! Once your ride is confirmed, you can track your driver's location in real-time on the map. You'll also receive notifications when your driver is nearby and when they arrive at your pickup location."
        },
        {
            question: "How do I rate my driver?",
            answer: "After your ride is completed, you'll receive a prompt to rate your driver on a scale of 1-5 stars. You can also leave additional feedback and tips. Your ratings help us maintain high service quality."
        },
        {
            question: "Is my account information secure?",
            answer: "Absolutely. We use industry-standard encryption to protect your personal and payment information. We never share your data with third parties without your consent, and all transactions are processed securely."
        },
        {
            question: "What are your customer support hours?",
            answer: "Our customer support team is available Monday to Friday from 9:00 AM to 6:00 PM, and Saturday from 10:00 AM to 4:00 PM (IST). For urgent matters outside these hours, you can submit a support ticket and we'll respond as soon as possible."
        },
    ]

    const contactMethods = [
        {
            icon: <Mail className="h-6 w-6" />,
            title: "Email Us",
            description: "support@irelandgo.com",
            detail: "We'll respond within 24 hours",
        },
        {
            icon: <Phone className="h-6 w-6" />,
            title: "Call Us",
            description: "+353 1 234 5678",
            detail: "Mon-Fri, 9AM-6PM IST",
        }
    ]

    return (
        <div className="min-h-screen relative overflow-hidden">
            <div className="container mx-auto py-16 relative z-10">
                {/* Hero Section */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                        <Sparkles className="h-4 w-4" />
                        <span>24/7 Support Available</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold text-blue-900 mb-6">
                        How Can We Help?
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Have a question or need assistance? Our dedicated support team is here to help you every step of the way.
                    </p>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
                    {/* Contact Form - Takes 2 columns */}
                    <div className="lg:col-span-2">
                        <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm hover:shadow-3xl transition-all duration-300">
                            <CardHeader className="pb-8">
                                <CardTitle className="text-3xl font-bold text-blue-700">
                                    Send us a Message
                                </CardTitle>
                                <CardDescription className="text-base text-gray-600">
                                    Fill out the form below and our support team will respond within 24 hours.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="fullName" className="text-gray-700 font-semibold">Full Name *</Label>
                                            <Input
                                                id="fullName"
                                                name="fullName"
                                                type="text"
                                                placeholder="John Doe"
                                                value={formData.fullName}
                                                onChange={handleInputChange}
                                                required
                                                disabled={isLoading}
                                                className="w-full h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="email" className="text-gray-700 font-semibold">Email Address *</Label>
                                            <Input
                                                id="email"
                                                name="email"
                                                type="email"
                                                placeholder="john@example.com"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                required
                                                disabled={isLoading}
                                                className="w-full h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="contactNumber" className="text-gray-700 font-semibold">Phone Number</Label>
                                            <Input
                                                id="contactNumber"
                                                name="contactNumber"
                                                type="tel"
                                                placeholder="+353 1 234 5678"
                                                value={formData.contactNumber}
                                                onChange={handleInputChange}
                                                disabled={isLoading}
                                                className="w-full h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="subject" className="text-gray-700 font-semibold">Subject *</Label>
                                            <Input
                                                id="subject"
                                                name="subject"
                                                type="text"
                                                placeholder="How can we help you?"
                                                value={formData.subject}
                                                onChange={handleInputChange}
                                                required
                                                disabled={isLoading}
                                                className="w-full h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="description" className="text-gray-700 font-semibold">Message *</Label>
                                        <Textarea
                                            id="description"
                                            name="description"
                                            placeholder="Please describe your issue or question in detail..."
                                            value={formData.description}
                                            onChange={handleInputChange}
                                            required
                                            disabled={isLoading}
                                            className="w-full min-h-[180px] resize-y border-gray-300 focus:border-blue-500 focus:ring-blue-500/20"
                                        />
                                    </div>

                                    <Button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-7 text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-70 disabled:hover:scale-100"
                                    >
                                        {isLoading ? (
                                            <>
                                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                <Send className="mr-2 h-5 w-5" />
                                                Send Message
                                            </>
                                        )}
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Contact Methods Sidebar */}
                    <div className="space-y-6">
                        <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="text-xl font-bold text-gray-900">Quick Contact</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {contactMethods.map((method, index) => (
                                    <div
                                        key={index}
                                        className="group relative overflow-hidden rounded-xl p-5 bg-gradient-to-br hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-200 hover:border-transparent"
                                    >
                                        <div className="absolute inset-0 bg-blue-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                                        <div className="relative flex items-start space-x-4">
                                            <div className="flex-shrink-0 p-3 rounded-lg bg-blue-600 text-white shadow-md">
                                                {method.icon}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-bold text-gray-900 mb-1 text-lg">{method.title}</h3>
                                                <p className="text-sm text-gray-700 font-medium mb-1">{method.description}</p>
                                                <p className="text-xs text-gray-500">{method.detail}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="mb-16">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-lg text-gray-600">Find quick answers to common questions</p>
                    </div>
                    <Card className="shadow-2xl container mx-auto border-0 bg-white/80 backdrop-blur-sm">
                        <CardContent className="p-5">
                            <Accordion type="single" collapsible className="w-full space-y-2 space-x-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
                                {faqs.map((faq, index) => (
                                    <AccordionItem
                                        key={index}
                                        value={`item-${index}`}
                                        className="border border-gray-200 rounded-lg px-6 data-[state=open]:bg-blue-50/50 transition-colors"
                                    >
                                        <AccordionTrigger className="text-left hover:no-underline py-5">
                                            <div className="flex items-center gap-4">
                                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                                                    <HelpCircle className="h-4 w-4 text-white" />
                                                </div>
                                                <span className="font-semibold text-gray-900 text-base">{faq.question}</span>
                                            </div>
                                        </AccordionTrigger>
                                        <AccordionContent className="pt-2 pb-4">
                                            <p className="text-gray-600 leading-relaxed pl-12">{faq.answer}</p>
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
