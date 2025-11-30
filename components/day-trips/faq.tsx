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
];

export default function FAQ() {
    return (
        <div className="bg-gray-50 py-16">
            <div className="max-w-3xl mx-auto px-6">
                <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
                    Frequently Asked Questions
                </h2>
                <Accordion type="single" collapsible className="space-y-3">
                    {faqs.map((item, idx) => (
                        <AccordionItem
                            key={item.q}
                            value={`item-${idx}`}
                            className="bg-white rounded-xl border border-gray-200"
                        >
                            <AccordionTrigger className="px-6 py-5 hover:no-underline">
                                <span className="font-medium text-gray-900 text-lg text-left">
                                    {item.q}
                                </span>
                            </AccordionTrigger>
                            <AccordionContent className="px-6 pb-5 text-gray-600">
                                {item.a}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </div>
    );
}
