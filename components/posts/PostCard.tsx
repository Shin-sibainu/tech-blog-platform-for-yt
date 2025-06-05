import Link from 'next/link'
import Image from 'next/image'
import { formatDistanceToNow } from 'date-fns'
import { Clock, User, ArrowRight, Code, Zap } from 'lucide-react'

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
  const excerpt = post.content.slice(0, 150).replace(/[#*`]/g, '') + '...'
  const publishedDate = post.published_at 
    ? formatDistanceToNow(new Date(post.published_at), { addSuffix: true })
    : ''

  const readingTime = Math.ceil(post.content.length / 1000)

  // Extract tech keywords for tags
  const techKeywords = ['React', 'JavaScript', 'TypeScript', 'Node.js', 'Python', 'Next.js']
  const foundKeywords = techKeywords.filter(keyword => 
    post.title.includes(keyword) || post.content.includes(keyword)
  ).slice(0, 2)

  return (
    <article className="group tech-card overflow-hidden p-0 hover-lift">
      {/* Tech gradient header */}
      <div className="h-2 tech-gradient"></div>
      
      <div className="p-6">
        {/* Header with badges */}
        <div className="mb-4 flex items-start justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <div className="tech-badge tech-badge-primary">
              <Code className="w-3 h-3 mr-1" />
              Tech
            </div>
            {foundKeywords.map(keyword => (
              <div key={keyword} className="tech-badge">
                {keyword}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            {readingTime}min read
          </div>
        </div>

        {/* Title */}
        <Link href={`/posts/${post.id}`} className="block group/title">
          <h2 className="mb-3 text-xl font-bold leading-tight text-foreground transition-colors duration-200 group-hover/title:tech-gradient-text line-clamp-2">
            {post.title}
          </h2>
        </Link>
        
        {/* Excerpt */}
        <p className="mb-6 text-sm leading-relaxed text-muted-foreground line-clamp-3">
          {excerpt}
        </p>
        
        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              {post.profiles.avatar_url ? (
                <Image 
                  src={post.profiles.avatar_url} 
                  alt={post.profiles.username}
                  width={32}
                  height={32}
                  className="h-8 w-8 rounded-full border-2 border-border shadow-sm"
                />
              ) : (
                <div className="flex h-8 w-8 items-center justify-center rounded-full tech-gradient text-xs font-semibold text-white shadow-sm">
                  {post.profiles.username[0]?.toUpperCase()}
                </div>
              )}
              <div className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border border-background bg-accent">
                <Zap className="h-1.5 w-1.5 text-white ml-0.25 mt-0.25" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-foreground">
                {post.profiles.username}
              </span>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <User className="h-2.5 w-2.5" />
                {publishedDate}
              </span>
            </div>
          </div>
          
          {/* Read more indicator */}
          <div className="flex items-center gap-1 text-xs font-medium text-primary transition-all duration-200 group-hover:gap-2">
            <span>Read</span>
            <ArrowRight className="h-3 w-3" />
          </div>
        </div>
      </div>
    </article>
  )
}