"use client";

import Loading from "@/components/common/loading";
import { useGetPrivacyQuery } from "@/Redux/features/settings/privacyApi";

export function PrivacyContent() {
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

    if (isLoading) return <Loading />;

    if (!privacy) {
        return (
            <div className="text-center py-20">
                <p className="text-gray-500 text-lg">Privacy policy not available.</p>
            </div>
        );
    }

    return (
        <>
            <p className="text-gray-600 mb-8 text-sm sm:text-base">
                Last updated: {formatDate(privacy.updatedAt)}
            </p>

            <div className="bg-white rounded-lg p-4 sm:p-6 md:p-8 shadow-sm">
                <div
                    className="prose prose-sm sm:prose-base md:prose-lg prose-gray max-w-none whitespace-pre-wrap
                        prose-headings:font-semibold prose-headings:text-gray-900
                        prose-p:text-gray-700 prose-p:leading-relaxed
                        prose-ul:text-gray-700 prose-li:text-gray-700
                        prose-a:text-blue-600 hover:prose-a:underline"
                    dangerouslySetInnerHTML={{ __html: privacy.description }}
                />
            </div>
        </>
    );
}
