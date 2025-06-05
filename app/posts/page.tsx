import { getPublishedPosts } from '@/lib/posts/actions'
import PostCard from '@/components/posts/PostCard'
import Pagination from '@/components/posts/Pagination'

interface PostsPageProps {
  searchParams: {
    page?: string
  }
}

export default async function PostsPage({ searchParams }: PostsPageProps) {
  const currentPage = Number(searchParams.page) || 1
  const postsPerPage = 10
  
  const { posts, totalCount, error } = await getPublishedPosts(currentPage, postsPerPage)
  const totalPages = Math.ceil(totalCount / postsPerPage)
  
  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">エラーが発生しました</h1>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    )
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">記事一覧</h1>
        <p className="mt-2 text-gray-600">最新の技術記事をチェックしよう</p>
      </div>
      
      {posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">まだ記事がありません</p>
        </div>
      ) : (
        <>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
          
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            basePath="/posts"
          />
        </>
      )}
    </div>
  )
}