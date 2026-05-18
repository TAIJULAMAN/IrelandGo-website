"use client";

import { useGetTermsAndConditionsQuery } from "@/Redux/features/settings/termsApi";

export default function TermsOfService() {
    const { data, isLoading } = useGetTermsAndConditionsQuery(undefined);

    const terms = data?.data?.[0];

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
        });
    };

    return (
        <div className="h-screen bg-gray-50">
            <main className="container mx-auto px-5 md:px-0 py-16 h-[calc(100vh-200px)] overflow-y-auto">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                    Terms of Service
                </h1>

                {isLoading ? (
                    <div className="animate-pulse">
                        <div className="h-4 bg-gray-200 rounded w-48 mb-8" />
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-4">
                            <div className="h-4 bg-gray-200 rounded w-full" />
                            <div className="h-4 bg-gray-200 rounded w-5/6" />
                            <div className="h-4 bg-gray-200 rounded w-full" />
                            <div className="h-4 bg-gray-200 rounded w-4/6" />
                            <div className="h-4 bg-gray-200 rounded w-full" />
                            <div className="h-4 bg-gray-200 rounded w-3/4" />
                        </div>
                    </div>
                ) : terms ? (
                    <>
                        <p className="text-gray-600 mb-8">
                            Last updated: {formatDate(terms.updatedAt)}
                        </p>

                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                            <div
                                className="prose prose-lg prose-gray max-w-none
                                    prose-headings:font-semibold prose-headings:text-gray-900
                                    prose-p:text-gray-700 prose-p:leading-relaxed
                                    prose-ul:text-gray-700 prose-li:text-gray-700
                                    prose-a:text-blue-600 hover:prose-a:underline"
                                dangerouslySetInnerHTML={{ __html: terms.description }}
                            />
                        </div>
                    </>
                ) : (
                    <div className="text-center py-20">
                        <p className="text-gray-500 text-lg">Terms of service not available.</p>
                    </div>
                )}
            </main>        </div>
    );
}
