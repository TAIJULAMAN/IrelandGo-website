import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
    {
        q: 'Can I customize my day trip itinerary?',
        a: 'Yes. All tours are private and fully customizable. Share your interests and we will tailor the route, stops, and timing to suit you.'
    },
    {
        q: 'How long are the day trips?',
        a: 'Most day trips run 8–10 hours including travel and photo stops. We can shorten or extend within reason to match your schedule.'
    },
    {
        q: "What\'s included in the price?",
        a: 'Professional driver-guide, comfortable vehicle, fuel, and bottled water. Entry fees and meals are typically not included unless specified.'
    },
    {
        q: 'What happens in case of bad weather?',
        a: 'Tours operate rain or shine. For severe weather, we\'ll reschedule where possible or offer a full refund according to our policy.'
    },
    {
        q: 'How far in advance should I book?',
        a: 'We recommend booking at least 24-48 hours in advance to ensure availability, especially during peak season (June-August). Same-day bookings are subject to driver availability.'
    },
    {
        q: 'What payment methods do you accept?',
        a: 'We accept all major credit cards (Visa, Mastercard, Amex) via our secure online booking system. Cash payments to the driver are also possible for incidental extensions.'
    },
    {
        q: 'Do you provide child seats?',
        a: 'Yes, we provide child seats and boosters free of charge. Please request them during the booking process and specify your child\'s age and weight.'
    },
    {
        q: 'Where will the driver pick us up?',
        a: 'We offer door-to-door service. Your driver will pick you up from your hotel, accommodation, cruise port, or airport terminal at the scheduled time.'
    },
    {
        q: 'Is there a limit on luggage?',
        a: 'Our standard sedans fit 2 large suitcases. Vans can accommodate up to 8 large suitcases. Please verify the luggage capacity for your selected vehicle type before booking.'
    },
    {
        q: 'Are the drivers English-speaking?',
        a: 'Yes, all our drivers are fluent English speakers with extensive local knowledge. They act as your personal guide, sharing stories and history throughout the journey.'
    },
];

export default function FAQ() {
    const half = Math.ceil(faqs.length / 2);
    const col1 = faqs.slice(0, half);
    const col2 = faqs.slice(half);

    return (
        <div className="bg-gray-50 py-16 md:py-24">
            <div className="max-w-7xl mx-auto px-5">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
                    Frequently Asked Questions
                </h2>

                <div className="grid md:grid-cols-2 gap-6 items-start">
                    <Accordion type="single" collapsible className="space-y-6">
                        {col1.map((item, idx) => (
                            <AccordionItem
                                key={item.q}
                                value={`item-col1-${idx}`}
                                className="bg-white rounded-2xl shadow-sm border-none ring-1 ring-black/5"
                            >
                                <AccordionTrigger className="px-6 py-5 hover:no-underline hover:text-blue-600 transition-colors">
                                    <span className="font-bold text-left text-lg">
                                        {item.q}
                                    </span>
                                </AccordionTrigger>
                                <AccordionContent className="px-6 pb-5 text-gray-600 leading-relaxed text-base">
                                    {item.a}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>

                    <Accordion type="single" collapsible className="space-y-6">
                        {col2.map((item, idx) => (
                            <AccordionItem
                                key={item.q}
                                value={`item-col2-${idx}`}
                                className="bg-white rounded-2xl shadow-sm border-none ring-1 ring-black/5"
                            >
                                <AccordionTrigger className="px-6 py-5 hover:no-underline hover:text-blue-600 transition-colors">
                                    <span className="font-bold text-left text-lg">
                                        {item.q}
                                    </span>
                                </AccordionTrigger>
                                <AccordionContent className="px-6 pb-5 text-gray-600 leading-relaxed text-base">
                                    {item.a}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
        </div>
    );
}
