import { Post } from "@/sanity/schema";
import PostThumbnail from "./BlogThumbnail";
import Fallback from "./PostFallBack";

export default function FeaturedBlog({ blogs, loading }: Readonly<{ blogs: Post[]; loading: boolean }>) {
  const hasPosts = !loading && blogs.length > 0;

  const featured = hasPosts ? blogs[0] : null;
  const secondary = hasPosts ? blogs.slice(1, 3) : [];

  return (
  <div className="space-y-8 md:space-y-12">
      {/* Featured full-width for clearer hierarchy */}
      <div>
        {featured ? (
          <PostThumbnail type="featured" post={featured} />
        ) : (
          <div className="flex min-h-[240px] items-center justify-center rounded-[var(--r-2)] border border-border/50 bg-card p-8">
            <Fallback isLoading={loading} />
          </div>
        )}
      </div>

      {/* Two-up secondary posts side-by-side to reduce vertical scanning cost */}
  <div className="grid gap-6 md:grid-cols-2">
        {secondary.length > 0
          ? secondary.map((blog) => (
              <PostThumbnail
                type="highlighted"
                  key={blog.slug?.current || blog.title}
                post={blog}
                className="h-full"
              />
            ))
          : (
            <>
              <div key="featured-skeleton-1" className="flex min-h-[180px] items-center justify-center rounded-[var(--r-2)] border border-border/50 bg-card p-6" data-skeleton="featured-1">
                <Fallback isLoading={loading} />
              </div>
              <div key="featured-skeleton-2" className="flex min-h-[180px] items-center justify-center rounded-[var(--r-2)] border border-border/50 bg-card p-6" data-skeleton="featured-2">
                <Fallback isLoading={loading} />
              </div>
            </>
          )}
      </div>
    </div>
  );
}
