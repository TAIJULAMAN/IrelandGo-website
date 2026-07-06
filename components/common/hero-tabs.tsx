import { Luggage, Clock, MapPin } from "lucide-react";

export const TABS = [
  { id: "transfer", label: "Transfer", icon: Luggage },
  { id: "hourly", label: "By the hour", icon: Clock },
  { id: "day-trips", label: "Day trips", icon: MapPin },
];

interface HeroTabsProps {
  activeTab: string;
  onTabChange: (id: string) => void;
  className?: string;
}

export function HeroTabs({ 
  activeTab, 
  onTabChange, 
  className = "flex justify-start mb-6 md:mb-10 overflow-x-auto scrollbar-hide scroll-smooth" 
}: HeroTabsProps) {
  return (
    <div className={className}>
      <div className="inline-flex gap-2 sm:gap-3 min-w-max pb-2 px-1">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`px-5 md:px-6 py-2.5 md:py-3 rounded-full font-bold text-sm md:text-base transition-all flex items-center gap-2.5 whitespace-nowrap shadow-sm hover:shadow-md ${activeTab === tab.id
              ? "bg-blue-600 text-white border border-transparent"
              : "bg-white text-gray-800 border border-gray-100 hover:border-gray-200"
              }`}
          >
            {tab.icon && (
              <tab.icon
                className={`w-4 h-4 md:w-5 md:h-5 ${
                  activeTab === tab.id ? "text-white" : "text-gray-500"
                }`}
              />
            )}
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
