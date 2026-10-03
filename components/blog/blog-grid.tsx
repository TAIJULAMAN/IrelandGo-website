import Link from "next/link";
import Image from "next/image";
import { Calendar } from "lucide-react";

export interface Blog {
  id: string;
  title: string;
  content: string;
  category: string;
  image: string[];
  createdAt: string;
  updatedAt: string;
}

interface BlogGridProps {
  blogs: Blog[];
}

export function BlogGrid({ blogs }: BlogGridProps) {
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
      {blogs.map((blog) => (
        <Link
          key={blog.id}
          href={`/blog/${blog.id}`}
          className="group block h-full"
        >
          <article className="bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 h-full flex flex-col">
            <div className="relative overflow-hidden h-48 md:h-56 bg-gray-100">
              <Image
                src={blog.image?.[0] || "/placeholder.jpg"}
                alt={blog.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-blue-600">
                {blog.category}
              </div>
            </div>

            <div className="p-4 sm:p-5 flex flex-col flex-grow">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-2">
                <Calendar className="w-3.5 h-3.5" />
                <span>{formatDate(blog.createdAt)}</span>
              </div>

              <h2 className="text-lg md:text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2 leading-tight">
                {blog.title}
              </h2>

              <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3">
                {blog.content?.replace(/<[^>]*>?/gm, "")}
              </p>

              <div className="mt-auto flex items-center gap-2 text-sm font-medium text-blue-600 pt-4 border-t border-gray-100">
                <span>Read Article</span>
                <svg
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </div>
            </div>
          </article>
        </Link>
      ))}
    </div>
  );
}
