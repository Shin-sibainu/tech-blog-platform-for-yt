import PostCard from './PostCard'
import PostCardSkeleton from './PostCardSkeleton'

interface Post {
  id: string
  title: string
  content: string
  published: boolean
  created_at: string
  published_at: string | null
  user_id: string
  profiles: {
    username: string
    avatar_url: string | null
  }
}

interface PostsGridProps {
  posts: Post[]
  loading?: boolean
}

export default function PostsGrid({ posts, loading = false }: PostsGridProps) {
  if (loading) {
    return (
      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div 
            key={i} 
            className={`animate-fadeIn animation-delay-${i * 100}`}
          >
            <PostCardSkeleton />
          </div>
        ))}
      </div>
    )
  }

  if (!posts.length) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="tech-gradient w-16 h-16 rounded-full flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">No articles yet</h3>
        <p className="text-muted-foreground max-w-sm">
          Be the first to share your knowledge and insights with the developer community.
        </p>
      </div>
    )
  }

  return (
    <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 auto-rows-fr">
      {posts.map((post, index) => (
        <div 
          key={post.id} 
          className={`animate-fadeIn animation-delay-${Math.min(index * 100, 500)}`}
        >
          <PostCard post={post} />
        </div>
      ))}
    </div>
  )
}