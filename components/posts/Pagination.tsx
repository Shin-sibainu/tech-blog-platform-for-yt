import Link from 'next/link'

interface PaginationProps {
  currentPage: number
  totalPages: number
  basePath: string
}

export default function Pagination({ currentPage, totalPages, basePath }: PaginationProps) {
  const getPageNumbers = () => {
    const pages = []
    const maxVisible = 5
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2))
    const end = Math.min(totalPages, start + maxVisible - 1)
    
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1)
    }
    
    for (let i = start; i <= end; i++) {
      pages.push(i)
    }
    
    return pages
  }

  if (totalPages <= 1) return null

  return (
    <nav className="flex justify-center items-center space-x-2 mt-8">
      {currentPage > 1 && (
        <Link
          href={`${basePath}?page=${currentPage - 1}`}
          className="px-3 py-1 rounded border border-gray-300 hover:bg-gray-50"
        >
          前へ
        </Link>
      )}
      
      {currentPage > 3 && (
        <>
          <Link
            href={`${basePath}?page=1`}
            className="px-3 py-1 rounded hover:bg-gray-50"
          >
            1
          </Link>
          {currentPage > 4 && <span className="px-2">...</span>}
        </>
      )}
      
      {getPageNumbers().map(page => (
        <Link
          key={page}
          href={`${basePath}?page=${page}`}
          className={`px-3 py-1 rounded ${
            page === currentPage
              ? 'bg-blue-600 text-white'
              : 'hover:bg-gray-50'
          }`}
        >
          {page}
        </Link>
      ))}
      
      {currentPage < totalPages - 2 && (
        <>
          {currentPage < totalPages - 3 && <span className="px-2">...</span>}
          <Link
            href={`${basePath}?page=${totalPages}`}
            className="px-3 py-1 rounded hover:bg-gray-50"
          >
            {totalPages}
          </Link>
        </>
      )}
      
      {currentPage < totalPages && (
        <Link
          href={`${basePath}?page=${currentPage + 1}`}
          className="px-3 py-1 rounded border border-gray-300 hover:bg-gray-50"
        >
          次へ
        </Link>
      )}
    </nav>
  )
}