import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
              プラットフォーム
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/" className="text-gray-500 hover:text-gray-700 transition-colors">
                  ホーム
                </Link>
              </li>
              <li>
                <Link href="/posts" className="text-gray-500 hover:text-gray-700 transition-colors">
                  記事一覧
                </Link>
              </li>
              <li>
                <Link href="/posts/new" className="text-gray-500 hover:text-gray-700 transition-colors">
                  記事を書く
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
              アカウント
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/login" className="text-gray-500 hover:text-gray-700 transition-colors">
                  ログイン
                </Link>
              </li>
              <li>
                <Link href="/signup" className="text-gray-500 hover:text-gray-700 transition-colors">
                  新規登録
                </Link>
              </li>
              <li>
                <Link href="/mypage" className="text-gray-500 hover:text-gray-700 transition-colors">
                  マイページ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
              Tech Blog
            </h3>
            <p className="mt-4 text-sm text-gray-500">
              技術記事を共有するためのシンプルなプラットフォーム
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-center text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Tech Blog. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}