import { Metadata } from "next";
import dynamic from "next/dynamic";

const ByTheHourDedicationSafety = dynamic(() => import("@/components/by-the-hour/by-the-hour-dedication-safety"));
const ByTheHourFlexibleBooking = dynamic(() => import("@/components/by-the-hour/by-the-hour-flexible-booking"));
const ByTheHourHero = dynamic(() => import("@/components/by-the-hour/by-the-hour-hero"));
const ByTheHourPrivateRides = dynamic(() => import("@/components/by-the-hour/by-the-hour-private-rides"));
const ByTheHourService = dynamic(() => import("@/components/by-the-hour/by-the-hour-service"));
const FAQ = dynamic(() => import("@/app/settings/faq/faq"));
const Testimonials = dynamic(() => import("@/components/common/testimonials").then((m) => ({ default: m.Testimonials })));
const RecentBlogs = dynamic(() => import("@/components/home/recent-blogs").then((m) => ({ default: m.RecentBlogs })));

export const metadata: Metadata = {
  title: "Hire a Private Driver by the Hour | IrelandGo",
  description:
    "Book a private driver by the hour for flexible travel across Ireland. Discover day trips and customized private tours with professional local drivers.",
};

export default function ByTheHour() {
  return (
    <main className="flex flex-col min-h-screen">
      <ByTheHourHero />
      <ByTheHourService />
      <ByTheHourPrivateRides />
      <ByTheHourDedicationSafety />
      <ByTheHourFlexibleBooking />
      <Testimonials />
      <RecentBlogs />
      <FAQ />
    </main>
  );
}
