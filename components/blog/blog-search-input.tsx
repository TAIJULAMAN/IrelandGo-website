import { Search } from "lucide-react";

interface BlogSearchInputProps {
  searchQuery: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function BlogSearchInput({
  searchQuery,
  onSearchChange,
}: BlogSearchInputProps) {
  return (
    <div className="relative w-full sm:w-[300px] md:w-[350px] shrink-0">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-4 w-4 text-gray-400" />
      </div>
      <input
        type="text"
        className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-full leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm shadow-sm hover:border-gray-300"
        placeholder="Search articles..."
        value={searchQuery}
        onChange={onSearchChange}
      />
    </div>
  );
}
