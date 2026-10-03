import { Metadata } from "next";
import { TermsContent } from "@/components/settings/terms-content";

export const metadata: Metadata = {
  title: "Terms of Service | Tourenzo",
  description: "Read the terms of service and conditions for using Tourenzo premium private transfers.",
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-10 md:pt-32 pb-16 flex justify-center">
      <main className="max-w-4xl w-full mx-auto px-5 sm:px-6 md:px-8">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 md:mb-8 text-balance leading-tight">
          Terms of Service
        </h1>
        <TermsContent />
      </main>
    </div>
  );
}
