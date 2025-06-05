import { getPostById } from '@/lib/posts/actions'
import MarkdownPreview from '@/components/editor/MarkdownPreview'
import PostAccessControl from '@/components/posts/PostAccessControl'
import { formatDistanceToNow } from 'date-fns'
import { ja } from 'date-fns/locale'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'

interface PostPageProps {
  params: Promise<{
    id: string
  }>
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const resolvedParams = await params
  const { post } = await getPostById(resolvedParams.id)
  
  if (!post) {
    return {
      title: '記事が見つかりません',
    }
  }
  
  return {
    title: `${post.title} | Tech Blog`,
    description: post.content.slice(0, 160).replace(/[#*`]/g, ''),
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const resolvedParams = await params
  const { post, error } = await getPostById(resolvedParams.id)
  
  if (error || !post) {
    notFound()
  }
  
  // Note: We'll handle unpublished post access in the client component
  // The server component can't check if the current user is the author
  
  const publishedDate = post.published_at 
    ? formatDistanceToNow(new Date(post.published_at), { addSuffix: true, locale: ja })
    : ''
  
  return (
    <PostAccessControl post={post}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <article>
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {post.title}
            </h1>
            
            <div className="flex items-center gap-4 text-gray-600 mb-6">
              <div className="flex items-center gap-2">
                {post.profiles.avatar_url ? (
                  <img 
                    src={post.profiles.avatar_url} 
                    alt={post.profiles.username}
                    className="w-10 h-10 rounded-full"
                  />
                ) : (
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white">
                    {post.profiles.username[0]?.toUpperCase()}
                  </div>
                )}
                <span className="font-medium">
                  {post.profiles.username}
                </span>
              </div>
              
              <time>
                {publishedDate || '下書き'}
              </time>
            </div>
            
            <div className="border-b border-gray-200 pb-6 mb-6">
              <Link 
                href="/posts"
                className="text-blue-600 hover:text-blue-700 text-sm"
              >
                ← 記事一覧に戻る
              </Link>
            </div>
          </header>
          
          <div className="prose-content">
            <MarkdownPreview content={post.content} />
          </div>
        </article>
        
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <Link 
              href="/posts"
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              記事一覧に戻る
            </Link>
            
            <div className="text-sm text-gray-500">
              投稿者: {post.profiles.username}
            </div>
          </div>
        </div>
      </div>
    </PostAccessControl>
  )
}