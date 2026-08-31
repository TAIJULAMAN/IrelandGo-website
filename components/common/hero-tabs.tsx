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
  className = "flex justify-center items-center mb-6 md:mb-10 w-full" 
}: HeroTabsProps) {
  return (
    <div className={className}>
      <div className="flex items-center justify-center gap-1.5 sm:gap-2.5 md:gap-3 w-full max-w-full px-2 sm:px-0">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`px-3 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-full font-bold text-xs sm:text-sm md:text-base transition-all flex items-center justify-center gap-1.5 sm:gap-2 md:gap-2.5 whitespace-nowrap shadow-sm hover:shadow-md ${
              activeTab === tab.id
                ? "bg-blue-600 text-white border border-transparent"
                : "bg-white text-gray-800 border border-gray-100 hover:border-gray-200"
            }`}
          >
            {tab.icon && (
              <tab.icon
                className={`w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 flex-shrink-0 ${
                  activeTab === tab.id ? "text-white" : "text-gray-500"
                }`}
              />
            )}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
