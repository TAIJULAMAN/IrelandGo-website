import ByTheHourBestDestinations from "@/components/by-the-hour/by-the-hour-best-destinations";
import ByTheHourDedicationSafety from "@/components/by-the-hour/by-the-hour-dedication-safety";
import ByTheHourEnglishSpeakingDriver from "@/components/by-the-hour/by-the-hour-english-speaking-driver";
import ByTheHourFlexibleBooking from "@/components/by-the-hour/by-the-hour-flexible-booking";
import ByTheHourHero from "@/components/by-the-hour/by-the-hour-hero";
import ByTheHourPrivateRides from "@/components/by-the-hour/by-the-hour-private-rides";
import ByTheHourService from "@/components/by-the-hour/by-the-hour-service";
import FAQ from "@/components/day-trips/faq";
import { Footer } from "@/components/layout/footer";
import { Testimonials } from "@/components/common/testimonials";

export default function ByTheHour() {
  return (
    <main>
      <ByTheHourHero />
      <ByTheHourService />
      <ByTheHourPrivateRides />
      <ByTheHourDedicationSafety />
      <ByTheHourBestDestinations />
      <Testimonials />
      <ByTheHourFlexibleBooking />
      <ByTheHourEnglishSpeakingDriver />
      <FAQ />
      <Footer />
    </main>
  );
}
