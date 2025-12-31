"use client";

import { Footer } from "@/components/layout/footer";
import { blogPosts } from "@/lib/blog-data";
import Link from "next/link";
import { Calendar, Clock, User } from "lucide-react";
import { Header2 } from "@/components/common/Header2";

export default function BlogListingPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header2 />

            {/* Hero Section */}
            <div className="relative py-24 bg-slate-900 text-white">
                <div className="absolute inset-0 overflow-hidden">
                    <img
                        src="/ireland-hero-bg.jpg"
                        alt="Ireland Landscape"
                        className="w-full h-full  object-cover opacity-30"
                    />
                </div>
                <div className="relative container mx-auto px-5 text-center z-10">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Ireland Travel Blog</h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        Discover the hidden gems, travel tips, and stories from the Emerald Isle.
                    </p>
                </div>
            </div>

            <main className="flex-grow container mx-auto px-5 py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogPosts.map((post) => (
                        <Link key={post.id} href={`/blog/${post.slug}`} className="group">
                            <article className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 h-full flex flex-col">
                                <div className="relative overflow-hidden h-60">
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-blue-600">
                                        {post.category}
                                    </div>
                                </div>

                                <div className="p-6 flex flex-col flex-grow">
                                    <div className="flex items-center gap-4 text-xs text-slate-500 mb-3">
                                        <div className="flex items-center gap-1">
                                            <Calendar className="w-3 h-3" />
                                            <span>{post.date}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Clock className="w-3 h-3" />
                                            <span>{post.readTime}</span>
                                        </div>
                                    </div>

                                    <h2 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                                        {post.title}
                                    </h2>

                                    <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3">
                                        {post.excerpt}
                                    </p>

                                    <div className="mt-auto flex items-center gap-2 text-sm font-medium text-blue-600 pt-4 border-t border-gray-100">
                                        <span>Read Article</span>
                                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </div>
                                </div>
                            </article>
                        </Link>
                    ))}
                </div>
            </main>

            <Footer />
        </div>
    );
}
