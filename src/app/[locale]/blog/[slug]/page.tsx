import React from "react";
import BlogDetailsPage from "./blog-details-page";
import { fetchBlogBySlug, getAllSlugs } from "@/lib/fetchers/blog";
import { getLocale } from "next-intl/server";
import { type LanguageCode } from "@/lib/helpers/localized-content";
import { notFound } from "next/navigation";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getAllSlugs(); 
  return slugs.map((slug) => ({ slug }));
}

export default async function BlogDetails({
  params,
}: {
  // params: { slug: string };
    params: Promise<{ slug: string }>;

}) {
  const { slug } =  await params;
  const locale = (await getLocale()) as LanguageCode;
  const blog = await fetchBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  return <BlogDetailsPage locale={locale} blog={blog} />;
}
