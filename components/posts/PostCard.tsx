import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'
import { ja } from 'date-fns/locale'

interface PostCardProps {
  post: {
    id: string
    title: string
    content: string
    published_at: string | null
    profiles: {
      username: string
      avatar_url: string | null
    }
  }
}

export default function PostCard({ post }: PostCardProps) {
  const excerpt = post.content.slice(0, 120).replace(/[#*`]/g, '') + '...'
  const publishedDate = post.published_at 
    ? formatDistanceToNow(new Date(post.published_at), { addSuffix: true, locale: ja })
    : ''

  const readingTime = Math.ceil(post.content.length / 1000)

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-gray-200/60 bg-white/50 backdrop-blur-sm transition-all duration-300 hover:border-gray-300/80 hover:shadow-xl hover:shadow-gray-200/40 hover:-translate-y-1">
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-indigo-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      
      <div className="relative p-6">
        {/* Header with tags */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center rounded-full bg-gradient-to-r from-blue-100 to-purple-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
              Tech
            </span>
            <span className="text-xs text-gray-500">
              {readingTime}分で読める
            </span>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {publishedDate}
          </div>
        </div>

        {/* Title */}
        <Link href={`/posts/${post.id}`} className="block">
          <h2 className="mb-3 text-xl font-bold leading-tight text-gray-900 transition-colors duration-200 group-hover:text-blue-600 line-clamp-2">
            {post.title}
          </h2>
        </Link>
        
        {/* Excerpt */}
        <p className="mb-6 text-sm leading-relaxed text-gray-600 line-clamp-3">
          {excerpt}
        </p>
        
        {/* Author */}
        <div className="flex items-center gap-3">
          <div className="relative">
            {post.profiles.avatar_url ? (
              <img 
                src={post.profiles.avatar_url} 
                alt={post.profiles.username}
                className="h-10 w-10 rounded-full border-2 border-white shadow-sm"
              />
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-blue-500 to-purple-500 text-sm font-semibold text-white shadow-sm">
                {post.profiles.username[0]?.toUpperCase()}
              </div>
            )}
            <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-green-400" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-900">
              {post.profiles.username}
            </span>
            <span className="text-xs text-gray-500">
              投稿者
            </span>
          </div>
          
          {/* Arrow icon */}
          <div className="ml-auto">
            <svg className="h-5 w-5 text-gray-400 transition-all duration-200 group-hover:translate-x-1 group-hover:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </div>
    </article>
  )
}