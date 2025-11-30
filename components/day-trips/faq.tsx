import { ChevronDown } from 'lucide-react';

const faqs = [
    'Can I customize my day trip itinerary?',
    'How long are the day trips?',
    "What's included in the price?",
    'What happens in case of bad weather?',
];

export default function FAQ() {
    return (
        <div className="bg-gray-50 py-16">
            <div className="max-w-3xl mx-auto px-6">
                <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
                    Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                    {faqs.map((faq) => (
                        <button
                            key={faq}
                            className="w-full flex items-center justify-between p-6 bg-white hover:bg-gray-50 rounded-xl transition border border-gray-200 text-left group"
                        >
                            <span className="font-medium text-gray-900 text-lg">{faq}</span>
                            <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition" />
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
