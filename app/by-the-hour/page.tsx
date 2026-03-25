import ByTheHourDedicationSafety from "@/components/by-the-hour/by-the-hour-dedication-safety";
import ByTheHourFlexibleBooking from "@/components/by-the-hour/by-the-hour-flexible-booking";
import ByTheHourHero from "@/components/by-the-hour/by-the-hour-hero";
import ByTheHourPrivateRides from "@/components/by-the-hour/by-the-hour-private-rides";
import ByTheHourService from "@/components/by-the-hour/by-the-hour-service";
import FAQ from "@/app/settings/faq/faq";
import { Footer } from "@/components/layout/footer";
import { Testimonials } from "@/components/common/testimonials";
import { RecentBlogs } from "@/components/home/recent-blogs";
import ByTheHourBestDestinations from "@/components/by-the-hour/by-the-hour-best-destinations";

export default function ByTheHour() {
  return (
    <main>
      <ByTheHourHero />
      <ByTheHourService />
      <ByTheHourPrivateRides />
      <ByTheHourDedicationSafety />
      <ByTheHourBestDestinations />
      <RecentBlogs />
      <Testimonials />
      <ByTheHourFlexibleBooking />
      <FAQ />
      <Footer />
    </main>
  );
}
