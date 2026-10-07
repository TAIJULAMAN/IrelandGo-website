import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Get in Touch with Tourenzo",
  description: "Have questions about our private tours or transfers in Ireland? Contact the Tourenzo team today for support and bookings.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
