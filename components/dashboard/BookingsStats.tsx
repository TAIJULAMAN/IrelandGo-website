import { CalendarDays, Clock, DollarSign } from "lucide-react";

interface BookingsStatsProps {
  isAgent: boolean;
  data: any;
}

export function BookingsStats({ isAgent, data }: BookingsStatsProps) {
  const stats = [
    {
      id: 1,
      label: "Total Bookings",
      icon: <CalendarDays className="w-6 h-6 text-blue-600" />,
      value: data?.data?.totalBookings || 0,
      bg: "bg-blue-50/50 border border-blue-100 text-blue-600",
      accent: "bg-blue-500",
    },
    {
      id: 3,
      label: "Completed",
      icon: <Clock className="w-6 h-6 text-emerald-600" />,
      value: data?.data?.totalCompletedBookings || 0,
      bg: "bg-emerald-50/50 border border-emerald-100 text-emerald-600",
      accent: "bg-emerald-500",
    },
    ...(isAgent
      ? [
        {
          id: 4,
          label: "Total Earnings",
          icon: <DollarSign className="w-6 h-6 text-indigo-600" />,
          value: `€${data?.data?.totalEarnings || 0}`,
          bg: "bg-indigo-50/50 border border-indigo-100 text-indigo-600",
          accent: "bg-indigo-500",
        },
      ]
      : []),
  ];

  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 ${isAgent ? "lg:grid-cols-3" : "lg:grid-cols-2"
        } gap-6`}
    >
      {stats.map((stat) => (
        <div
          key={stat.id}
          className="bg-white rounded-2xl shadow-sm border border-slate-100 p-10 relative overflow-hidden group hover:-translate-y-1 hover:shadow-md transition-all duration-300"
        >
          <div className="flex items-center gap-5 relative z-10">
            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${stat.bg}`}
            >
              {stat.icon}
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                {stat.label}
              </p>
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-black text-slate-800 tracking-tight leading-none">
                  {stat.value}
                </p>
              </div>
            </div>
          </div>

          {/* Subtle background decoration */}
          <div className={`absolute -right-6 -top-6 w-32 h-32 rounded-full opacity-[0.03] group-hover:scale-[1.3] transition-transform duration-500 blur-2xl ${stat.accent}`}></div>
        </div>
      ))}
    </div>
  );
}
