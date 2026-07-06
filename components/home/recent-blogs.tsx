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
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12 gap-4">
            <SectionHeader
              title="Latest from our Blog"
              subtitle="Travel Inspiration"
              className="mb-0 text-center md:text-left [&_span]:md:text-left [&_h2]:md:text-left"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3].map((i, idx) => (
              <div
                key={i}
                className={`bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 animate-pulse ${idx === 2 ? "block md:hidden lg:block" : ""
                  }`}
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
        </div>
      </section>
    );
  }

  if (blogs.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12 gap-4">
          <SectionHeader
            title="Explore Ireland's Best Destinations"
            subtitle="Travel Inspiration"
            className="mb-0 text-center md:text-left [&_span]:md:text-left [&_h2]:md:text-left"
          />
          <Link
            href="/blog"
            className="hidden md:inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors group pb-1"
          >
            View All Articles
            <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {blogs.map((blog, idx) => (
            <Link
              key={blog.id}
              href={`/blog/${blog.id}`}
              className={`group ${idx === 2 ? "block md:hidden lg:block" : ""}`}
            >
              <article className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 h-full flex flex-col">
                <div className="relative overflow-hidden h-60">
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

        <div className="mt-10 text-center md:hidden">
          <Link
            href="/blog"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors w-full"
          >
            View All Articles
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
}
