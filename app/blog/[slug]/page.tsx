"use client";

import { Calendar, ArrowLeft, Tag } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useGetSingleBlogQuery } from "@/Redux/features/blogs/blogsApi";
import Loading from "@/components/common/loading";

export default function BlogDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const { data, isLoading, isError } = useGetSingleBlogQuery(slug, {
    skip: !slug,
  });

  const blog = data?.data;

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  // Loading state
  if (isLoading) {
    return <Loading />;
  }

  // Error / Not found
  if (isError || !blog) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Post Not Found
            </h1>
            <Link href="/blog" className="text-blue-600 hover:underline">
              Return to Blog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <main className="flex-grow pt-24 sm:pt-28 md:pt-32 pb-16">
        <article>
          {/* Breadcrumb */}
          <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-10 lg:px-12 xl:px-12">
            <div className="mb-5">
              <nav className="flex items-center gap-2 text-sm text-gray-500">
                <Link
                  href="/"
                  className="hover:text-blue-600 transition-colors"
                >
                  Home
                </Link>
                <span>/</span>
                <Link
                  href="/blog"
                  className="hover:text-blue-600 transition-colors"
                >
                  Blog
                </Link>
                <span>/</span>
                <span className="text-gray-900 font-medium truncate max-w-[200px]">
                  {blog.title}
                </span>
              </nav>
            </div>
          </div>

          {/* Title */}
          <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-10 lg:px-12 xl:px-12">
            <div className="mb-5">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
                {blog.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(blog.createdAt)}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Tag className="w-4 h-4" />
                  <span>{blog.category}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Image - wider than content */}
          {blog.image?.[0] && (
            <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-10 lg:px-12 xl:px-12 mb-10">
              <div className="">
                <div className="relative rounded-lg overflow-hidden aspect-[16/10] sm:aspect-[16/9] shadow-md">
                  <Image
                    src={blog.image[0]}
                    alt={blog.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          )}

          {/* Content area */}
          <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-10 lg:px-12 xl:px-12">
            <div className="max-w-3xl mx-auto">
              {/* Main content */}
              <div
                className="prose prose-lg prose-gray max-w-none
                                prose-headings:font-bold prose-headings:text-gray-900
                                prose-p:text-gray-700 prose-p:leading-relaxed
                                prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
                                prose-img:rounded-lg prose-img:shadow-sm
                            "
              >
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                  {blog.content}
                </p>
              </div>

              {/* Additional images gallery */}
              {blog.image && blog.image.length > 1 && (
                <div className="mt-10">
                  <div
                    className={`grid gap-4 ${blog.image.length === 2 ? "grid-cols-2" : "grid-cols-2 md:grid-cols-3"}`}
                  >
                    {blog.image.slice(1).map((img: string, idx: number) => (
                      <div
                        key={idx}
                        className="relative rounded-lg overflow-hidden aspect-[4/3] shadow-sm"
                      >
                        <Image
                          src={img}
                          alt={`${blog.title} - Image ${idx + 2}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Divider */}
              <hr className="my-10 border-gray-200" />

              {/* Back to blog */}
              <div className="flex items-center justify-between">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors group"
                >
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                  Back to all articles
                </Link>
                <div className="inline-block bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1.5 rounded-full">
                  {blog.category}
                </div>
              </div>
            </div>
          </div>
        </article>
      </main>{" "}
    </div>
  );
}
