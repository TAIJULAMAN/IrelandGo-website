"use client";

import { use } from "react";
import { useGetAllMultiDayToursQuery } from "@/Redux/features/multi-day-tours/multiDayToursApi";
import MultiDayToursDetailsHero from "@/components/multi-day-tours/multi-day-tours-details/multi-day-tours-details-hero";
import FAQ from "@/app/settings/faq/faq";
import { Testimonials } from "@/components/common/testimonials";
import Loading from "@/components/common/loading";

export default function MultiDayTourDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { data: response, isLoading } = useGetAllMultiDayToursQuery(undefined);
  const tours = response?.data || [];
  const tour = tours.find((t: any) => t.id === id);
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (!tour) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-slate-500">
        <h1 className="text-2xl font-bold mb-2">Tour not found</h1>
        <p>We couldn't find the requested tour.</p>
      </div>
    );
  }

  return (
    <main>
      <MultiDayToursDetailsHero tour={tour} />
      <Testimonials />
      <FAQ />    </main>
  );
}
