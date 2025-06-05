'use client'

import { createClient } from '@/lib/supabase/client'

export async function getUserPostsClient(userId: string, includeUnpublished: boolean = false) {
  try {
    const supabase = createClient()
    
    let query = supabase
      .from('posts')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    
    if (!includeUnpublished) {
      query = query.eq('is_published', true)
    }
    
    const { data: posts, error } = await query
    
    if (error) {
      console.error('Error fetching user posts:', error)
      return { posts: [], error: error.message || 'Failed to fetch user posts' }
    }
    
    return { posts: posts || [], error: null }
  } catch (err) {
    console.error('Unexpected error in getUserPosts:', err)
    return { posts: [], error: 'An unexpected error occurred' }
  }
}

export async function deletePostClient(postId: string) {
  try {
    const supabase = createClient()
    
    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', postId)
    
    if (error) {
      console.error('Error deleting post:', error)
      return { success: false, error: error.message || '記事の削除に失敗しました。' }
    }
    
    return { success: true, error: null }
  } catch (err) {
    console.error('Unexpected error in deletePost:', err)
    return { success: false, error: '予期しないエラーが発生しました。' }
  }
}

export async function createPostClient(postData: {
  title: string
  content: string
  is_published: boolean
  published_at: string | null
}) {
  try {
    const supabase = createClient()
    
    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError || !user) {
      return { data: null, error: 'ユーザーが認証されていません。' }
    }
    
    // Create post
    const { data: post, error } = await supabase
      .from('posts')
      .insert({
        user_id: user.id,
        title: postData.title,
        content: postData.content,
        is_published: postData.is_published,
        published_at: postData.published_at
      })
      .select()
      .single()
    
    if (error) {
      console.error('Error creating post:', error)
      return { data: null, error: error.message || '記事の作成に失敗しました。' }
    }
    
    return { data: post, error: null }
  } catch (err) {
    console.error('Unexpected error in createPost:', err)
    return { data: null, error: '予期しないエラーが発生しました。' }
  }
}

export async function updatePostClient(id: string, postData: {
  title?: string
  content?: string
  is_published?: boolean
  published_at?: string | null
}) {
  try {
    const supabase = createClient()
    
    // Update post
    const { data: post, error } = await supabase
      .from('posts')
      .update(postData)
      .eq('id', id)
      .select()
      .single()
    
    if (error) {
      console.error('Error updating post:', error)
      return { data: null, error: error.message || '記事の更新に失敗しました。' }
    }
    
    return { data: post, error: null }
  } catch (err) {
    console.error('Unexpected error in updatePost:', err)
    return { data: null, error: '予期しないエラーが発生しました。' }
  }
}

export async function getPostByIdClient(id: string) {
  try {
    const supabase = createClient()
    
    const { data: post, error } = await supabase
      .from('posts')
      .select('*, profiles:user_id(username, avatar_url)')
      .eq('id', id)
      .single()
    
    if (error) {
      console.error('Error fetching post:', error)
      return { post: null, error: error.message || 'Failed to fetch post' }
    }
    
    return { post, error: null }
  } catch (err) {
    console.error('Unexpected error in getPostById:', err)
    return { post: null, error: 'An unexpected error occurred' }
  }
}