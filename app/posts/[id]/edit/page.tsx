'use client'

import { useState, useEffect, use } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import ProtectedRoute from '@/components/auth/ProtectedRoute'
import MarkdownEditor from '@/components/editor/MarkdownEditor'
import { getPostByIdClient, updatePostClient } from '@/lib/posts/client-actions'
import Link from 'next/link'

interface EditPostPageProps {
  params: Promise<{
    id: string
  }>
}

export default function EditPostPage({ params }: EditPostPageProps) {
  const resolvedParams = use(params)
  const router = useRouter()
  const { user } = useAuth()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [isPublished, setIsPublished] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadPost = async () => {
      const { post, error } = await getPostByIdClient(resolvedParams.id)
      
      if (error || !post) {
        setError('記事が見つかりません')
        setIsLoading(false)
        return
      }

      // Check if user is the author
      if (user && post.user_id !== user.id) {
        setError('この記事を編集する権限がありません')
        setIsLoading(false)
        return
      }

      setTitle(post.title)
      setContent(post.content)
      setIsPublished(post.is_published)
      setIsLoading(false)
    }
    
    loadPost()
  }, [resolvedParams.id, user])


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)

    try {
      const updateData: {
        title: string
        content: string
        is_published: boolean
        published_at?: string
      } = {
        title,
        content,
        is_published: isPublished,
      }

      // If changing from draft to published, set published_at
      if (isPublished && !isPublished) {
        updateData.published_at = new Date().toISOString()
      }

      const result = await updatePostClient(resolvedParams.id, updateData)

      if (result.error) {
        setError(result.error)
      } else if (result.data) {
        router.push(`/posts/${result.data.id}`)
      }
    } catch {
      setError('記事の更新中にエラーが発生しました。')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <ProtectedRoute>
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center">読み込み中...</div>
        </div>
      </ProtectedRoute>
    )
  }

  if (error) {
    return (
      <ProtectedRoute>
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
          <Link
            href="/mypage"
            className="text-blue-600 hover:text-blue-700"
          >
            マイページに戻る
          </Link>
        </div>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">記事を編集</h1>
          <Link
            href="/mypage"
            className="text-gray-600 hover:text-gray-800"
          >
            キャンセル
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              タイトル
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="記事のタイトルを入力"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              本文（Markdown対応）
            </label>
            <MarkdownEditor
              value={content}
              onChange={setContent}
              height="400px"
            />
          </div>

          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={isPublished}
                onChange={(e) => setIsPublished(e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm">公開する</span>
            </label>
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              disabled={isSubmitting || !title || !content}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? '更新中...' : '更新する'}
            </button>
            <Link
              href="/mypage"
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
            >
              キャンセル
            </Link>
          </div>
        </form>
      </div>
    </ProtectedRoute>
  )
}