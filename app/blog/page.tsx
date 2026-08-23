import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/nav/Navbar";
import { getAllPosts } from "@/lib/posts";
import Footer from "@/components/ui/Footer";

export const metadata = {
  title: "Blog",
  description:
    "Thoughts on software development, web, mobile, and things I am learning.",
  alternates: {
    canonical: "https://rohanbist.com.np/blog",
  },
  openGraph: {
    title: "Blog — Rohan Bist",
    description:
      "Thoughts on software development, web, mobile, and things I am learning.",
    url: "https://rohanbist.com.np/blog",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

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
        {/* Header */}
        <p
          style={{
            fontFamily: "'Sora', sans-serif",
            fontWeight: 400,
            fontSize: 11,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "var(--accent)",
            marginBottom: 40,
          }}
        >
          [ Blog ]
        </p>

        {/* Posts grid */}
        {posts.length === 0 ? (
          <p
            style={{
              fontFamily: "'Sora', sans-serif",
              fontSize: 14,
              color: "var(--text-body)",
            }}
          >
            No posts yet — check back soon.
          </p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 300px), 1fr))",
              gap: 24,
            }}
          >
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                style={{ textDecoration: "none" }}
                className="blog-card-link"
              >
                <div
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: 8,
                    overflow: "hidden",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    transition: "border-color 0.3s ease",
                  }}
                  className="blog-card"
                >
                  {/* Cover image */}
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      aspectRatio: "16 / 9",
                      background: "rgba(255,255,255,0.04)",
                      flexShrink: 0,
                    }}
                  >
                    {post.coverImage ? (
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        style={{ objectFit: "cover" }}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <div
                        style={{
                          width: "100%",
                          height: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "'Clash Display', sans-serif",
                            fontSize: 32,
                            color: "rgba(232,197,71,0.15)",
                            fontWeight: 700,
                            letterSpacing: "0.1em",
                          }}
                        >
                          RB
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Card body */}
                  <div
                    style={{
                      padding: "20px 22px 24px",
                      display: "flex",
                      flexDirection: "column",
                      flex: 1,
                    }}
                  >
                    {/* Tags */}
                    <div
                      style={{
                        display: "flex",
                        gap: 6,
                        flexWrap: "wrap",
                        marginBottom: 12,
                      }}
                    >
                      {post.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          style={{
                            fontFamily: "'Sora', sans-serif",
                            fontSize: 10,
                            color: "var(--accent)",
                            background: "rgba(232,197,71,0.08)",
                            border: "0.5px solid rgba(232,197,71,0.2)",
                            borderRadius: 999,
                            padding: "2px 8px",
                            letterSpacing: "0.06em",
                            textTransform: "uppercase",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Title */}
                    <h2
                      style={{
                        fontFamily: "'Clash Display', sans-serif",
                        fontWeight: 500,
                        fontSize: 18,
                        color: "var(--text-primary)",
                        lineHeight: 1.3,
                        marginBottom: 10,
                        transition: "color 0.2s ease",
                      }}
                      className="blog-card-title"
                    >
                      {post.title}
                    </h2>

                    {/* Description */}
                    <p
                      style={{
                        fontFamily: "'Sora', sans-serif",
                        fontWeight: 300,
                        fontSize: 13,
                        color: "var(--text-body)",
                        lineHeight: 1.6,
                        flex: 1,
                        marginBottom: 16,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      } as React.CSSProperties}
                    >
                      {post.description}
                    </p>

                    {/* Footer: date + reading time */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginTop: "auto",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "'Sora', sans-serif",
                          fontSize: 12,
                          color: "var(--text-body)",
                          fontWeight: 300,
                        }}
                      >
                        {new Date(post.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                      <span
                        style={{
                          fontFamily: "'Sora', sans-serif",
                          fontSize: 11,
                          color: "rgba(138,138,138,0.5)",
                          fontWeight: 300,
                        }}
                      >
                        {post.readingTime}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );

}