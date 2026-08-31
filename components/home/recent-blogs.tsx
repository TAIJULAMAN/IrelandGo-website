"use client";

import Link from "next/link";
import Image from "next/image";
import { Calendar, ArrowRight } from "lucide-react";
import { useGetAllBlogsQuery } from "@/Redux/features/blogs/blogsApi";
import { SectionHeader } from "@/components/ui/section-header";
import Loading from "../common/loading";

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

  const blogs: Blog[] = (data?.data?.data || []).slice(0, 4);


  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Loading skeleton
  if (isLoading) {
    return <Loading />;
  }

  if (blogs.length === 0) return null;

  return (
    <section className="relative px-5 sm:px-8 md:px-0 lg:px-0 xl:px-0 py-10 md:py-12 xl:py-12 bg-gray-50/50 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-100/40 blur-3xl opacity-60 mix-blend-multiply" />
        <div className="absolute bottom-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-indigo-100/40 blur-3xl opacity-60 mix-blend-multiply" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-6 md:mb-10 gap-6 relative">
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

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {blogs.map((blog, idx) => (
            <Link
              key={blog.id || idx}
              href={`/blog/${blog.id}`}
              className="group block"
            >
              <article className="bg-white/80 backdrop-blur-md rounded-xl sm:rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 hover:border-white hover:-translate-y-2 flex flex-col h-full relative">
                {/* Subtle Glow Behind Card */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0" />

                <div
                  className="relative overflow-hidden h-28 sm:h-40 md:h-48 z-10"
                  style={{ position: "relative" }}
                >
                  <Image
                    src={blog.image?.[0] || "/placeholder.jpg"}
                    alt={blog.title}
                    fill
                    className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                  <div className="absolute top-2 left-2 sm:top-4 sm:left-4 bg-white/95 backdrop-blur-md px-2 sm:px-3 py-0.5 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-bold text-blue-700 shadow-sm border border-white/20">
                    {blog.category}
                  </div>
                </div>

                <div className="p-2.5 sm:p-4 flex flex-col flex-grow relative z-10">
                  <div className="flex items-center gap-1 text-[10px] sm:text-xs text-gray-500 font-small mb-1 sm:mb-2">
                    <Calendar className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                    <span>{formatDate(blog.createdAt)}</span>
                  </div>

                  <h2 className="text-xs sm:text-lg md:text-xl font-bold text-gray-900 mb-1 sm:mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-indigo-600 transition-all duration-300 line-clamp-2 leading-tight">
                    {blog.title}
                  </h2>

                  <p className="text-[11px] sm:text-sm text-gray-600 leading-relaxed mb-2 line-clamp-2 sm:line-clamp-3 group-hover:text-gray-700 transition-colors">
                    {blog.content?.replace(/<[^>]*>?/gm, "")}
                  </p>

                  <div className="mt-auto flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-bold text-blue-600 group-hover:text-indigo-600 transition-colors pt-2 sm:pt-4 border-t border-gray-100">
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
