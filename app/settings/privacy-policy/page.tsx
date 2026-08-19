"use client";

import Loading from "@/components/common/loading";
import { useGetPrivacyQuery } from "@/Redux/features/settings/privacyApi";

export default function PrivacyPolicy() {
    const { data, isLoading } = useGetPrivacyQuery(undefined);

    const privacy = data?.data;

    const formatDate = (dateStr?: string) => {
        if (!dateStr) return "";
        const date = new Date(dateStr);
        if (isNaN(date.getTime())) return "";
        return date.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-10 md:pt-32 pb-16 flex justify-center">
            <main className="max-w-7xl mx-auto px-5 sm:px-5 md:px-8 lg:px-10">
                <h1 className="text-2xl md:text-5xl font-bold text-gray-900 mb-3 md:mb-4 text-balance leading-tight">
                    Privacy Policy
                </h1>

                {isLoading ? (
                    <Loading />
                ) : privacy ? (
                    <>
                        <p className="text-gray-600 mb-8 text-sm sm:text-base">
                            Last updated: {formatDate(privacy?.updatedAt)}
                        </p>

                        <div className="bg-white rounded-lg p-4 sm:p-6 md:p-8">
                            <div
                                className="prose prose-sm sm:prose-base md:prose-lg prose-gray max-w-none
                                    prose-headings:font-semibold prose-headings:text-gray-900
                                    prose-p:text-gray-700 prose-p:leading-relaxed
                                    prose-ul:text-gray-700 prose-li:text-gray-700
                                    prose-a:text-blue-600 hover:prose-a:underline"
                                dangerouslySetInnerHTML={{ __html: privacy.description }}
                            />
                        </div>
                    </>
                ) : (
                    <div className="text-center py-20">
                        <p className="text-gray-500 text-lg">Privacy policy not available.</p>
                    </div>
                )}
            </main>
        </div>
    );
}
