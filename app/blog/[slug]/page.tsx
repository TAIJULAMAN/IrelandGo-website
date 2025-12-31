"use client";

import { blogPosts } from "@/lib/blog-data";
import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/footer";
import { Calendar, Clock, User, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Header2 } from "@/components/common/Header2";

export default function BlogDetailPage() {
    // Correctly handle dynamic routes in Next.js 13+ client components
    const params = useParams();
    const slug = params.slug;

    const post = blogPosts.find((p) => p.slug === slug);

    if (!post && slug) { // Only checking if slug exists, otherwise let it render or loading state
        return (
            <div className="min-h-screen flex flex-col bg-white">
                <Header2 />
                <div className="flex-grow flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">Post Not Found</h1>
                        <Link href="/blog" className="text-blue-600 hover:underline">Return to Blog</Link>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }

    if (!post) return null;
    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Header2 />

            <main className="flex-grow pt-24 pb-16">
                <article className="container mx-auto px-5">
                    {/* Breadcrumb / Back Link */}
                    <div className="mb-8">
                        <Link href="/blog" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to all articles
                        </Link>
                    </div>

                    {/* Header */}
                    <header className="mb-10 text-center">
                        <div className="inline-block bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full mb-4">
                            {post.category}
                        </div>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                            {post.title}
                        </h1>

                        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500">
                            <div className="flex items-center gap-2">
                                <User className="w-4 h-4" />
                                <span>{post.author}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                <span>{post.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                <span>{post.readTime}</span>
                            </div>
                        </div>
                    </header>

                    {/* Featured Image */}
                    <div className="rounded-3xl overflow-hidden shadow-lg mb-12 aspect-video">
                        <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Content */}
                    <div
                        className="prose prose-lg prose-slate max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-p:text-slate-700 prose-img:rounded-xl"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />

                </article>
            </main>

            <Footer />
        </div>
    );
}
