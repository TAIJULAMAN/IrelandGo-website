"use client";

import Link from "next/link";
import Image from "next/image";
import { Calendar, Search } from "lucide-react";
import { useGetAllBlogsQuery } from "@/Redux/features/blogs/blogsApi";
import { BlogPagination } from "./blog-pagination";
import { BlogCategorySelect } from "./blog-category-select";
import { BlogSearchInput } from "./blog-search-input";
import { useState } from "react";
import Loading from "../common/loading";
import { BlogGrid, type Blog } from "./blog-grid";

const POSTS_PER_PAGE = 8;

export function BlogList() {
  const { data, isLoading } = useGetAllBlogsQuery(undefined);
  const blogs: Blog[] = data?.data?.data || [];

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    ...Array.from(new Set(blogs.map((b) => b.category))),
  ].filter(Boolean);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const filteredBlogs = blogs.filter((blog) => {
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch =
      blog.title.toLowerCase().includes(searchLower) ||
      blog.category.toLowerCase().includes(searchLower);

    const matchesCategory =
      selectedCategory === "All" || blog.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(filteredBlogs.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const currentBlogs = filteredBlogs.slice(
    startIndex,
    startIndex + POSTS_PER_PAGE,
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  return (
    <main className="flex-grow max-w-7xl mx-auto w-full px-5 sm:px-8 md:px-10 lg:px-12 xl:px-12 py-6 md:py-10 relative z-10">
      <div className="mb-8 flex flex-col sm:flex-row justify-end items-center gap-3">
        <BlogCategorySelect
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={(value) => {
            setSelectedCategory(value);
            setCurrentPage(1);
          }}
        />

        <BlogSearchInput
          searchQuery={searchQuery}
          onSearchChange={handleSearch}
        />
      </div>

      {isLoading ? (
        <Loading />
      ) : filteredBlogs?.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
          <Search className="mx-auto h-10 w-10 text-gray-300 mb-3" />
          <p className="text-gray-500 text-base sm:text-lg">
            {searchQuery
              ? "No articles match your search."
              : "No blog posts yet. Check back soon!"}
          </p>
        </div>
      ) : (
        <>
          <BlogGrid blogs={currentBlogs} />

          <BlogPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </main>
  );
}
