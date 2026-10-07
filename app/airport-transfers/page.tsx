import AirportTransfersHero from "@/components/airport-transfers/airport-transfers-hero";
import AirportTransfersWhyChoose from "@/components/airport-transfers/airport-transfers-why-choose";
import FAQ from "@/app/settings/faq/faq";
import { Testimonials } from "@/components/common/testimonials";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Airport Transfers Ireland | Private Airport Transfers | Tourenzo",
  description:
    "Book reliable and private airport transfers in Ireland with Tourenzo. Experience comfortable and seamless travel to and from the airport.",
};

export default function AirportTransfers() {
  return (
    <>
      <AirportTransfersHero />
      <AirportTransfersWhyChoose />
      <Testimonials />
      <FAQ />
    </>
  );
}
