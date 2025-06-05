'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

interface PostAccessControlProps {
  post: {
    id: string
    user_id: string
    is_published: boolean
    title: string
  }
  children: React.ReactNode
}

export default function PostAccessControl({ post, children }: PostAccessControlProps) {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !post.is_published) {
      // If post is not published, only the author can view it
      if (!user || user.id !== post.user_id) {
        router.push('/posts')
      }
    }
  }, [user, loading, post, router])

  // Show loading while checking auth
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  // If post is not published and user is not the author
  if (!post.is_published && (!user || user.id !== post.user_id)) {
    return null
  }

  return (
    <>
      {!post.is_published && user?.id === post.user_id && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                この記事は下書きです。あなたにのみ表示されています。
              </p>
            </div>
          </div>
        </div>
      )}
      {children}
    </>
  )
}