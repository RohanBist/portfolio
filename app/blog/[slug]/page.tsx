import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import Navbar from "@/components/nav/Navbar";
import Footer from "@/components/ui/Footer";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const post = getPostBySlug(params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `https://rohanbist.com.np/blog/${params.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://rohanbist.com.np/blog/${params.slug}`,
      type: "article",
      publishedTime: post.date,
      images: post.coverImage
        ? [{ url: post.coverImage, width: 1200, height: 630 }]
        : [],
    },
  };
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  return (
    <>
      <Navbar />
      <main
        style={{
          background: "var(--bg)",
          minHeight: "100vh",
          padding: "120px clamp(24px, 5vw, 64px) 80px",
        }}
      >
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        {/* Back */}
        <Link
          href="/blog"
          style={{
            fontFamily: "'Sora', sans-serif",
            fontSize: 13,
            color: "var(--text-body)",
            textDecoration: "none",
            display: "inline-block",
            marginBottom: 40,
          }}
          className="back-link"
        >
          ← All posts
        </Link>

        {/* Tags */}
        <div style={{ display: "flex", gap: 6, marginBottom: 20, flexWrap: "wrap" }}>
          {post.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontFamily: "'Sora', sans-serif",
                fontSize: 11,
                color: "var(--accent)",
                background: "rgba(232,197,71,0.08)",
                border: "0.5px solid rgba(232,197,71,0.2)",
                borderRadius: 999,
                padding: "3px 10px",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h1
          style={{
            fontFamily: "'Clash Display', sans-serif",
            fontWeight: 600,
            fontSize: "clamp(28px, 4vw, 48px)",
            color: "var(--text-primary)",
            lineHeight: 1.2,
            marginBottom: 16,
          }}
        >
          {post.title}
        </h1>

        {/* Meta */}
        <div
          style={{
            display: "flex",
            gap: 16,
            marginBottom: 40,
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontFamily: "'Sora', sans-serif",
              fontSize: 13,
              color: "var(--text-body)",
              fontWeight: 300,
            }}
          >
            {new Date(post.date).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </span>
          <span style={{ color: "rgba(138,138,138,0.3)" }}>·</span>
          <span
            style={{
              fontFamily: "'Sora', sans-serif",
              fontSize: 13,
              color: "var(--text-body)",
              fontWeight: 300,
            }}
          >
            {post.readingTime}
          </span>
        </div>

        {/* Cover image */}
        {post.coverImage && (
          <div
            style={{
              position: "relative",
              width: "100%",
              aspectRatio: "16 / 9",
              borderRadius: 8,
              overflow: "hidden",
              marginBottom: 48,
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 640px) 100vw, 680px"
              priority
            />
          </div>
        )}

        {/* Divider */}
        <div
          style={{
            width: "100%",
            height: 1,
            background: "rgba(255,255,255,0.06)",
            marginBottom: 48,
          }}
        />

        {/* Content */}
        <div className="prose">
          <MDXRemote source={post.content} />
        </div>

        {/* Bottom back link */}
        <div
          style={{
            marginTop: 64,
            paddingTop: 32,
            borderTop: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          
        </div>
      </div>
      </main>
      <Footer />
    </>
  );
}