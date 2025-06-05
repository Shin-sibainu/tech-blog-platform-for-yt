"use client"

import { useEffect, useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { getUserPostsClient, deletePostClient } from '@/lib/posts/client-actions'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

type Post = {
  id: string
  title: string
  content: string
  is_published: boolean
  created_at: string
  updated_at: string
  published_at: string | null
}

type Stats = {
  totalPosts: number
  publishedPosts: number
  draftPosts: number
}

export default function MyPage() {
  const { user, loading } = useAuth()
  const [posts, setPosts] = useState<Post[]>([])
  const [stats, setStats] = useState<Stats>({
    totalPosts: 0,
    publishedPosts: 0,
    draftPosts: 0,
  })
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all')
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  useEffect(() => {
    if (user) {
      loadPosts()
    }
  }, [user, filter])

  const loadPosts = async () => {
    if (!user) return

    setIsLoading(true)
    
    // Get all posts first for statistics
    const { posts: allPosts, error: allError } = await getUserPostsClient(user.id, true)
    
    if (allError) {
      console.error('Error loading posts:', allError)
      setIsLoading(false)
      return
    }

    // Calculate statistics from all posts
    const totalPosts = allPosts.length
    const publishedPosts = allPosts.filter(post => post.is_published).length
    const draftPosts = totalPosts - publishedPosts
    setStats({ totalPosts, publishedPosts, draftPosts })

    // Filter posts based on current filter
    let filteredPosts = allPosts
    if (filter === 'published') {
      filteredPosts = allPosts.filter(post => post.is_published)
    } else if (filter === 'draft') {
      filteredPosts = allPosts.filter(post => !post.is_published)
    }

    setPosts(filteredPosts)
    setIsLoading(false)
  }

  const handleDelete = async (postId: string) => {
    if (!confirm('この記事を削除してもよろしいですか？')) return

    const { success, error } = await deletePostClient(postId)

    if (!success) {
      console.error('Error deleting post:', error)
      alert('記事の削除に失敗しました')
    } else {
      loadPosts()
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">読み込み中...</div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">マイページ</h1>
        
        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">総記事数</h3>
            <p className="text-3xl font-bold text-blue-600">{stats.totalPosts}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">公開済み</h3>
            <p className="text-3xl font-bold text-green-600">{stats.publishedPosts}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">下書き</h3>
            <p className="text-3xl font-bold text-gray-600">{stats.draftPosts}</p>
          </div>
        </div>

        {/* Filter buttons */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded ${
              filter === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            すべて
          </button>
          <button
            onClick={() => setFilter('published')}
            className={`px-4 py-2 rounded ${
              filter === 'published'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            公開済み
          </button>
          <button
            onClick={() => setFilter('draft')}
            className={`px-4 py-2 rounded ${
              filter === 'draft'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            下書き
          </button>
        </div>

        {/* Posts list */}
        {isLoading ? (
          <div className="text-center py-8">記事を読み込み中...</div>
        ) : posts.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {filter === 'all' ? 'まだ記事がありません' : 
               filter === 'published' ? '公開済みの記事がありません' : 
               '下書きの記事がありません'}
            </p>
            <Link
              href="/posts/new"
              className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              記事を書く
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold mb-2">
                      <Link
                        href={`/posts/${post.id}`}
                        className="hover:text-blue-600"
                      >
                        {post.title}
                      </Link>
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
                      {post.content.substring(0, 150)}...
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className={`px-2 py-1 rounded ${
                        post.is_published
                          ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                          : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                      }`}>
                        {post.is_published ? '公開済み' : '下書き'}
                      </span>
                      <span>
                        作成: {new Date(post.created_at).toLocaleDateString('ja-JP')}
                      </span>
                      {post.published_at && (
                        <span>
                          公開: {new Date(post.published_at).toLocaleDateString('ja-JP')}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Link
                      href={`/posts/${post.id}/edit`}
                      className="text-blue-600 hover:text-blue-700 px-3 py-1 border border-blue-600 rounded hover:bg-blue-50 dark:hover:bg-blue-900"
                    >
                      編集
                    </Link>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="text-red-600 hover:text-red-700 px-3 py-1 border border-red-600 rounded hover:bg-red-50 dark:hover:bg-red-900"
                    >
                      削除
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}