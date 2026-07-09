"use client";

import Link from "next/link";
import Image from "next/image";
import { Calendar, ArrowRight } from "lucide-react";
import { useGetAllBlogsQuery } from "@/Redux/features/blogs/blogsApi";
import { SectionHeader } from "@/components/ui/section-header";

interface Blog {
  id: string;
  title: string;
  content: string;
  category: string;
  image: string[];
  createdAt: string;
  updatedAt: string;
}

export function RecentBlogs() {
  const { data, isLoading } = useGetAllBlogsQuery(undefined);

  const blogs: Blog[] = (data?.data?.data || []).slice(0, 3);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Loading skeleton
  if (isLoading) {
    return (
      <section className="relative px-5 sm:px-8 md:px-0 lg:px-0 xl:px-0 py-16 sm:py-20 md:py-24 bg-gray-50/50 overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12 gap-4">
            <SectionHeader
              title="Latest from our Blog"
              subtitle="Travel Inspiration"
              className="mb-0 text-center md:text-left [&_span]:md:text-left [&_h2]:md:text-left"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[1, 2, 3].map((i, idx) => (
              <div
                key={i}
                className={`bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 animate-pulse ${idx === 2 ? "block md:hidden lg:block" : ""
                  }`}
              >
                <div className="h-60 bg-gray-200" />
                <div className="p-6 space-y-4">
                  <div className="h-3 bg-gray-200 rounded w-24" />
                  <div className="h-6 bg-gray-200 rounded w-full" />
                  <div className="h-6 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-full mt-4" />
                  <div className="h-4 bg-gray-200 rounded w-5/6" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (blogs.length === 0) return null;

  return (
    <section className="relative px-5 sm:px-8 md:px-0 lg:px-0 xl:px-0 py-16 sm:py-20 md:py-24 bg-gray-50/50 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-100/40 blur-3xl opacity-60 mix-blend-multiply" />
        <div className="absolute bottom-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-indigo-100/40 blur-3xl opacity-60 mix-blend-multiply" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-10 md:mb-14 gap-6 relative">
          <div className="flex-1">
            <SectionHeader
              title="Explore Ireland's Best Destinations"
              subtitle="Travel Inspiration"
              className="mb-0 text-center md:text-left [&_span]:md:text-left [&_h2]:md:text-left"
            />
          </div>
          <Link
            href="/blog"
            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold bg-white text-blue-600 hover:text-white hover:bg-blue-600 border border-blue-200 hover:border-blue-600 transition-all shadow-sm group"
          >
            View All Articles
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {blogs.map((blog, idx) => (
            <Link
              key={blog.id}
              href={`/blog/${blog.id}`}
              className={`group block ${idx === 2 ? "block md:hidden lg:block" : ""}`}
            >
              <article className="bg-white/80 backdrop-blur-md rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 hover:border-white hover:-translate-y-2 flex flex-col h-full relative">
                {/* Subtle Glow Behind Card */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0" />

                <div className="relative overflow-hidden h-60 z-10">
                  <Image
                    src={blog.image?.[0] || "/placeholder.jpg"}
                    alt={blog.title}
                    fill
                    className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                  
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-blue-700 shadow-sm border border-white/20">
                    {blog.category}
                  </div>
                </div>

                <div className="p-5 md:p-6 flex flex-col flex-grow relative z-10">
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium mb-3">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{formatDate(blog.createdAt)}</span>
                  </div>

                  <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-indigo-600 transition-all duration-300 line-clamp-2 leading-tight">
                    {blog.title}
                  </h2>

                  <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-6 line-clamp-3 flex-grow group-hover:text-gray-700 transition-colors">
                    {blog.content}
                  </p>

                  <div className="mt-auto flex items-center gap-2 text-sm font-bold text-blue-600 group-hover:text-indigo-600 transition-colors pt-5 border-t border-gray-100">
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

        <div className="mt-10 text-center md:hidden">
          <Link
            href="/blog"
            className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-all shadow-md w-full active:scale-95"
          >
            View All Articles
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
}
