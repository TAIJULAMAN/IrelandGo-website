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
      <div className="space-y-10">
        <section
          className="relative text-white flex flex-col justify-center min-h-[50vh] md:min-h-[60vh] lg:min-h-[50vh] bg-cover bg-center bg-no-repeat px-5 sm:px-8 md:px-10 lg:px-12 xl:px-12 pt-8 sm:pt-8 md:pt-34 mb-10"
          style={{
            backgroundImage: 'url("/by-the-hour.jpg")',
          }}
        >
          <div className="absolute inset-0 bg-black/40 z-0" />
          <div className="max-w-7xl mx-auto py-10 px-5 md:px-0 flex flex-col items-center justify-center text-center gap-6 md:gap-8 relative z-10">
            <div className="space-y-4 max-w-4xl mx-auto">
              <h1 className="text-xl md:text-[clamp(1.75rem,3vw,2.5rem)] font-bold mb-3 md:mb-4 text-balance leading-tight px-5">
                Explore Ireland with Tourenzo
              </h1>
              <p className="text-sm md:text-base text-whitee mb-6 md:mb-8 px-4">
                Insider tips, local guides, and inspiring stories to help you plan the perfect journey across the Emerald Isle.
              </p>
            </div>
          </div>
        </section>
        <main className="flex-grow max-w-7xl mx-auto px-5 sm:px-8 md:px-10 lg:px-12 xl:px-12 py-12 md:py-10 mt-16 md:mt-24 relative z-10">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 animate-pulse"
                >
                  <div className="h-60 bg-gray-200" />
                  <div className="p-6 space-y-3">
                    <div className="h-3 bg-gray-200 rounded w-24" />
                    <div className="h-5 bg-gray-200 rounded w-full" />
                    <div className="h-5 bg-gray-200 rounded w-3/4" />
                    <div className="h-4 bg-gray-200 rounded w-full" />
                    <div className="h-4 bg-gray-200 rounded w-5/6" />
                  </div>
                </div>
              ))}
            </div>
          ) : blogs.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">
                No blog posts yet. Check back soon!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {blogs.map((blog) => (
                <Link key={blog.id} href={`/blog/${blog.id}`} className="group">
                  <article className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 h-full flex flex-col">
                    <div className="relative overflow-hidden h-60 bg-gray-100">
                      <Image
                        src={blog.image?.[0] || "/placeholder.jpg"}
                        alt={blog.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-blue-600">
                        {blog.category}
                      </div>
                    </div>

                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex items-center gap-1 text-xs text-slate-500 mb-3">
                        <Calendar className="w-3 h-3" />
                        <span>{formatDate(blog.createdAt)}</span>
                      </div>

                      <h2 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {blog.title}
                      </h2>

                      <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3">
                        {blog.content}
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
          )}
        </main>
      </div>
    </>

  );
}
