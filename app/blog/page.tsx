"use client";

import Link from "next/link";
import Image from "next/image";
import { Calendar } from "lucide-react";
import { useGetAllBlogsQuery } from "@/Redux/features/blogs/blogsApi";

interface Blog {
  id: string;
  title: string;
  content: string;
  category: string;
  image: string[];
  createdAt: string;
  updatedAt: string;
}

export default function BlogListingPage() {
  const { data, isLoading } = useGetAllBlogsQuery(undefined);
  const blogs: Blog[] = data?.data?.data || [];

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <>
      <div>
        <section
          className="relative text-white flex flex-col justify-center min-h-[35vh] md:min-h-[45vh] bg-cover bg-center bg-no-repeat px-5 sm:px-8 md:px-10 lg:px-12 xl:px-12 pt-8 sm:pt-12 md:pt-24 mb-6 sm:mb-10"
          style={{
            backgroundImage: 'url("/by-the-hour.jpg")',
          }}
        >
          <div className="absolute inset-0 bg-black/50 z-0" />
          <div className="max-w-7xl mx-auto py-8 sm:py-12 px-2 sm:px-5 md:px-0 flex flex-col items-center justify-center text-center gap-3 md:gap-6 relative z-10">
            <div className="space-y-2 sm:space-y-4 max-w-4xl mx-auto">
              <h1 className="text-xl sm:text-2xl md:text-4xl font-bold text-balance leading-tight">
                Explore Ireland with Tourenzo
              </h1>
              <p className="text-xs sm:text-sm md:text-base text-gray-200 px-2">
                Insider tips, local guides, and inspiring stories to help you plan the perfect journey across the Emerald Isle.
              </p>
            </div>
          </div>
        </section>

        <main className="flex-grow max-w-7xl mx-auto px-5 sm:px-8 md:px-10 lg:px-12 xl:px-12 py-6 md:py-10 relative z-10">
          {isLoading ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 animate-pulse"
                >
                  <div className="h-32 sm:h-48 bg-gray-200" />
                  <div className="p-3 sm:p-6 space-y-2 sm:space-y-3">
                    <div className="h-2.5 sm:h-3 bg-gray-200 rounded w-16 sm:w-24" />
                    <div className="h-4 sm:h-5 bg-gray-200 rounded w-full" />
                    <div className="h-3 sm:h-4 bg-gray-200 rounded w-3/4" />
                  </div>
                </div>
              ))}
            </div>
          ) : blogs.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500 text-base sm:text-lg">
                No blog posts yet. Check back soon!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
              {blogs.map((blog) => (
                <Link key={blog.id} href={`/blog/${blog.id}`} className="group block">
                  <article className="bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 h-full flex flex-col">
                    <div className="relative overflow-hidden h-28 sm:h-48 md:h-56 bg-gray-100">
                      <Image
                        src={blog.image?.[0] || "/placeholder.jpg"}
                        alt={blog.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-2 left-2 sm:top-4 sm:left-4 bg-white/90 backdrop-blur-sm px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold text-blue-600">
                        {blog.category}
                      </div>
                    </div>

                    <div className="p-3 sm:p-5 flex flex-col flex-grow">
                      <div className="flex items-center gap-1 text-[10px] sm:text-xs text-slate-500 mb-1 sm:mb-2">
                        <Calendar className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                        <span>{formatDate(blog.createdAt)}</span>
                      </div>

                      <h2 className="text-xs sm:text-lg md:text-xl font-bold text-slate-900 mb-1 sm:mb-2 group-hover:text-blue-600 transition-colors line-clamp-2 leading-tight">
                        {blog.title}
                      </h2>

                      <p className="text-slate-600 text-[11px] sm:text-sm leading-relaxed mb-2 sm:mb-4 line-clamp-2 sm:line-clamp-3">
                        {blog.content?.replace(/<[^>]*>?/gm, "")}
                      </p>

                      <div className="mt-auto flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium text-blue-600 pt-2 sm:pt-4 border-t border-gray-100">
                        <span>Read Article</span>
                        <svg
                          className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform"
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
          )}
        </main>
      </div>
    </>


  );
}
