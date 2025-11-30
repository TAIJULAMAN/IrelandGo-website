import { Users, MapPin, Flag, Briefcase } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Header } from "@/components/header";

export default function DayTripsDetailsHero() {
  return (
    <section className="relative w-full">
      <Header />
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/details.png"
          alt="Scenic Ireland coastline"
          className="w-full h-[520px] md:h-[720px] object-cover"
        />
        <div className="absolute inset-0 bg-slate-900/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 flex items-center justify-center h-[520px] md:h-[640px]">
        <div className="w-full max-w-4xl bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-white/50 p-6 md:p-8">
          {/* Title & Subtitle */}
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-3">
            <span className="text-blue-700">Dublin to Galway</span> via Cliffs
            of Moher
          </h1>
          <p className="text-slate-600 md:text-lg text-center">
            Explore gorgeous coastal scenery and charming Irish towns on a
            private, guided day tour.
          </p>

          {/* Badges */}
          <div className="mt-5 flex flex-wrap justify-center items-center gap-5">
            <div className="inline-flex items-center gap-2 text-slate-700 text-sm">
              <Users className="w-4 h-4 text-blue-600" /> Max 12 People
            </div>
            <div className="inline-flex items-center gap-2 text-emerald-700 text-sm font-semibold">
              From €125/person
            </div>
          </div>

          {/* Controls */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <label className="flex items-center gap-3 bg-white rounded-xl border border-slate-200 px-4 h-12">
              <MapPin className="w-4 h-4 text-slate-500" />
              <Input
                type="text"
                placeholder="Pickup Location"
                className="border-0 bg-transparent h-10 px-0 text-sm placeholder:text-slate-500 focus-visible:ring-0 focus-visible:border-0 shadow-none"
              />
            </label>
            <label className="flex items-center gap-3 bg-white rounded-xl border border-slate-200 px-4 h-12">
              <Flag className="w-4 h-4 text-slate-500" />
              <Input
                type="text"
                placeholder="Dropoff Location"
                className="border-0 bg-transparent h-10 px-0 text-sm placeholder:text-slate-500 focus-visible:ring-0 focus-visible:border-0 shadow-none"
              />
            </label>
            <Select defaultValue="1">
              <SelectTrigger className="bg-white rounded-xl border border-slate-200 h-12 px-4 w-full">
                <SelectValue>
                  <span className="flex items-center gap-2 text-slate-700 text-sm">
                    <Users className="w-4 h-4 text-slate-500" /> 1 Passenger
                  </span>
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {[...Array(12)].map((_, i) => (
                  <SelectItem key={i + 1} value={`${i + 1}`}>
                    {i + 1} Passenger{i + 1 > 1 ? "s" : ""}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select defaultValue="1">
              <SelectTrigger className="bg-white rounded-xl border border-slate-200 h-12 px-4 w-full">
                <SelectValue>
                  <span className="flex items-center gap-2 text-slate-700 text-sm">
                    <Briefcase className="w-4 h-4 text-slate-500" /> 1 Luggage
                  </span>
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {[...Array(9)].map((_, i) => (
                  <SelectItem key={i} value={`${i}`}>
                    {i} Luggage{i !== 1 ? "s" : ""}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* CTA */}
          <div className="mt-5 flex justify-center">
            <button className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-sm w-full sm:w-auto">
              Book Your Tour
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
