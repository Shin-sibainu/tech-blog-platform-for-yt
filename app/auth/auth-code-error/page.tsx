import Link from 'next/link'

export default function AuthErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            認証エラー
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            認証処理中にエラーが発生しました
          </p>
        </div>

        <div className="mt-8 space-y-4">
          <p className="text-gray-700">
            お手数ですが、もう一度ログインしてください。
          </p>
          
          <div className="space-y-2">
            <Link 
              href="/auth/login" 
              className="inline-block w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              ログインページへ
            </Link>
            
            <Link 
              href="/" 
              className="inline-block w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              ホームへ戻る
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}