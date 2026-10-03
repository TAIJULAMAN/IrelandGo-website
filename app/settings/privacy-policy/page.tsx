import { Metadata } from "next";
import { PrivacyContent } from "@/components/settings/privacy-content";

export const metadata: Metadata = {
  title: "Privacy Policy | Tourenzo",
  description: "Read our privacy policy to understand how we collect, use, and protect your personal information at Tourenzo.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-10 md:pt-32 pb-16 flex justify-center">
      <main className="max-w-4xl w-full mx-auto px-5 sm:px-6 md:px-8">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 md:mb-8 text-balance leading-tight">
          Privacy Policy
        </h1>
        <PrivacyContent />
      </main>
    </div>
  );
}
