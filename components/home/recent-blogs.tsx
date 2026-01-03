"use client";

import { blogPosts } from "@/lib/blog-data";
import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";

export function RecentBlogs() {
    const recentPosts = blogPosts.slice(0, 3);

    return (
        <section className="py-16 md:py-24 bg-slate-50">
            <div className="container mx-auto px-5">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                    <div>
                        <span className="text-blue-600 font-semibold text-sm uppercase tracking-wide">Travel Inspiration</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2">Latest from our Blog</h2>
                    </div>
                    <Link href="/blog" className="hidden md:inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors group">
                        View All Articles
                        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {recentPosts.map((post) => (
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

                <div className="mt-10 text-center md:hidden">
                    <Link href="/blog" className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors w-full">
                        View All Articles
                        <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
