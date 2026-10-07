import { Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface BlogCategorySelectProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
}

export function BlogCategorySelect({
  categories,
  selectedCategory,
  onCategoryChange,
}: BlogCategorySelectProps) {
  return (
    <div className="w-full sm:w-[300px] md:w-[350px] shrink-0 group">
      <Select value={selectedCategory} onValueChange={onCategoryChange}>
        <SelectTrigger className="w-full h-20 pl-10 pr-4 rounded-xl border border-gray-200 bg-white text-gray-700 shadow-sm hover:border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm font-medium relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Filter className="h-4 w-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
          </div>
          <SelectValue placeholder="Select a category" />
        </SelectTrigger>
        <SelectContent className="bg-white rounded-xl border-gray-200 shadow-lg z-50">
          {categories.map((category) => (
            <SelectItem
              key={category}
              value={category}
              className="cursor-pointer hover:bg-gray-50 focus:bg-gray-50 focus:text-blue-600 font-medium"
            >
              {category === "All" ? "All Categories" : category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
