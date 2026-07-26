"use client"

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { useGetFaqQuery } from "@/Redux/features/settings/faqApi";
import { usePathname } from "next/navigation";
import Loading from "@/components/common/loading";

interface Faq {
    id: string
    question: string
    answer: string
    serviceType?: string
    createdAt: string
    updatedAt: string
}

export default function FAQ() {
    const pathname = usePathname();
    const { data, isLoading } = useGetFaqQuery(undefined);

    let faqs: Faq[] = data?.data || [];
    console.log(faqs)

    if (pathname.includes("/day-trips")) {
        faqs = faqs.filter(f => f.serviceType === "DAY_TRIP");
    } else if (pathname.includes("/by-the-hour")) {
        faqs = faqs.filter(f => f.serviceType === "BY_THE_HOUR");
    } else if (pathname.includes("/transfer") || pathname.includes("/airport-transfers")) {
        faqs = faqs.filter(f => f.serviceType === "TRANSFER");
    }

    const half = Math.ceil(faqs.length / 2);
    const col1 = faqs.slice(0, half);
    const col2 = faqs.slice(half);

    if (isLoading) {
        return (
            <div className="bg-gray-50 py-16 md:py-24">
                <Loading />
            </div>
        );
    }

    if (faqs.length === 0) return null;

    return (
        <div className="bg-gray-50 py-16 md:py-24">
            <div className="max-w-7xl mx-auto px-5 md:px-0">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
                    Frequently Asked Questions
                </h2>

                <div className="grid md:grid-cols-2 gap-6 items-start">
                    <Accordion type="single" collapsible className="space-y-6">
                        {col1.map((item, idx) => (
                            <AccordionItem
                                key={item.id}
                                value={`item-col1-${idx}`}
                                className="bg-white rounded-lg shadow-sm border-none ring-1 ring-black/5"
                            >
                                <AccordionTrigger className="px-6 py-5 hover:no-underline hover:text-blue-600 transition-colors">
                                    <span className="font-bold text-left text-lg">
                                        {item.question}
                                    </span>
                                </AccordionTrigger>
                                <AccordionContent className="px-6 pb-5 text-gray-600 leading-relaxed text-base">
                                    {item.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>

                    <Accordion type="single" collapsible className="space-y-6">
                        {col2.map((item, idx) => (
                            <AccordionItem
                                key={item.id}
                                value={`item-col2-${idx}`}
                                className="bg-white rounded-lg shadow-sm border-none ring-1 ring-black/5"
                            >
                                <AccordionTrigger className="px-6 py-5 hover:no-underline hover:text-blue-600 transition-colors">
                                    <span className="font-bold text-left text-lg">
                                        {item.question}
                                    </span>
                                </AccordionTrigger>
                                <AccordionContent className="px-6 pb-5 text-gray-600 leading-relaxed text-base">
                                    {item.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
        </div>
    );
}
