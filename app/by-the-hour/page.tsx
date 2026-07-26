import ByTheHourDedicationSafety from "@/components/by-the-hour/by-the-hour-dedication-safety";
import ByTheHourFlexibleBooking from "@/components/by-the-hour/by-the-hour-flexible-booking";
import ByTheHourHero from "@/components/by-the-hour/by-the-hour-hero";
import ByTheHourPrivateRides from "@/components/by-the-hour/by-the-hour-private-rides";
import ByTheHourService from "@/components/by-the-hour/by-the-hour-service";
import FAQ from "@/app/settings/faq/faq";
import { Testimonials } from "@/components/common/testimonials";
import { RecentBlogs } from "@/components/home/recent-blogs";

export default function ByTheHour() {
  return (
    <>
      <ByTheHourHero />
      <ByTheHourService />
      <ByTheHourPrivateRides />
      <ByTheHourDedicationSafety />
      <RecentBlogs />
      <Testimonials />
      <ByTheHourFlexibleBooking />
      <FAQ />
    </>
  );
}
