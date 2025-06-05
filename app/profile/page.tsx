"use client"

import { useEffect, useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

type Profile = {
  id: string
  username: string | null
  avatar_url: string | null
  created_at: string
  updated_at: string
}

export default function ProfilePage() {
  const { user, loading } = useAuth()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [username, setUsername] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  useEffect(() => {
    const loadProfile = async () => {
      if (!user) return

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (error) {
        console.error('Error loading profile:', error)
        setMessage({ type: 'error', text: 'プロフィールの読み込みに失敗しました' })
      } else if (data) {
        setProfile(data)
        setUsername(data.username || '')
        setAvatarUrl(data.avatar_url || '')
      }
    }
    
    if (user) {
      loadProfile()
    }
  }, [user, supabase])


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    setSaving(true)
    setMessage(null)

    const { error } = await supabase
      .from('profiles')
      .update({
        username: username || null,
        avatar_url: avatarUrl || null,
      })
      .eq('id', user.id)

    if (error) {
      console.error('Error updating profile:', error)
      setMessage({ type: 'error', text: 'プロフィールの更新に失敗しました' })
    } else {
      setMessage({ type: 'success', text: 'プロフィールを更新しました' })
      setIsEditing(false)
      // Reload profile by re-fetching data
      const { data, error: loadError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (!loadError && data) {
        setProfile(data)
        setUsername(data.username || '')
        setAvatarUrl(data.avatar_url || '')
      }
    }

    setSaving(false)
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
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8">プロフィール</h1>

      {message && (
        <div
          className={`mb-4 p-4 rounded ${
            message.type === 'success'
              ? 'bg-green-100 text-green-700'
              : 'bg-red-100 text-red-700'
          }`}
        >
          {message.text}
        </div>
      )}

      {!isEditing ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
          <div className="mb-6">
            {profile?.avatar_url && (
              <Image
                src={profile.avatar_url}
                alt="Avatar"
                width={96}
                height={96}
                className="w-24 h-24 rounded-full mb-4"
              />
            )}
            <div className="space-y-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">メールアドレス</p>
              <p className="font-medium">{user.email}</p>
            </div>
            <div className="space-y-2 mt-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">ユーザー名</p>
              <p className="font-medium">{profile?.username || '未設定'}</p>
            </div>
            <div className="space-y-2 mt-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">アバターURL</p>
              <p className="font-medium break-all">{profile?.avatar_url || '未設定'}</p>
            </div>
          </div>
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            編集
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
          <div className="mb-6 space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                メールアドレス（変更不可）
              </label>
              <input
                type="email"
                id="email"
                value={user.email}
                disabled
                className="w-full px-3 py-2 border rounded bg-gray-100 dark:bg-gray-700"
              />
            </div>
            <div>
              <label htmlFor="username" className="block text-sm font-medium mb-2">
                ユーザー名
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="ユーザー名を入力"
              />
            </div>
            <div>
              <label htmlFor="avatar" className="block text-sm font-medium mb-2">
                アバターURL
              </label>
              <input
                type="url"
                id="avatar"
                value={avatarUrl}
                onChange={(e) => setAvatarUrl(e.target.value)}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://example.com/avatar.jpg"
              />
              {avatarUrl && (
                <Image
                  src={avatarUrl}
                  alt="Avatar preview"
                  width={96}
                  height={96}
                  className="mt-2 w-24 h-24 rounded-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                  }}
                />
              )}
            </div>
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={saving}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {saving ? '保存中...' : '保存'}
            </button>
            <button
              type="button"
              onClick={() => {
                setIsEditing(false)
                setUsername(profile?.username || '')
                setAvatarUrl(profile?.avatar_url || '')
                setMessage(null)
              }}
              className="bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-200 px-4 py-2 rounded hover:bg-gray-400 dark:hover:bg-gray-500"
            >
              キャンセル
            </button>
          </div>
        </form>
      )}
    </div>
  )
}