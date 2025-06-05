interface Post {
  id: string
  title: string
  content: string
  published: boolean
  created_at: string
  user_id: string
  profiles: {
    display_name: string | null
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
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-gray-200 animate-pulse rounded-lg h-64"></div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}