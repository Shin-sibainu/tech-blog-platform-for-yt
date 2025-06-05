'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'

interface ProtectedRouteProps {
  children: React.ReactNode
  redirectTo?: string
}

export default function ProtectedRoute({ 
  children, 
  redirectTo = '/auth/login' 
}: ProtectedRouteProps) {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [hasRedirected, setHasRedirected] = useState(false)

  useEffect(() => {
    // Add a small delay to prevent premature redirects
    const timer = setTimeout(() => {
      if (!loading && !user && !hasRedirected) {
        setHasRedirected(true)
        router.push(redirectTo)
      }
    }, 100)

    return () => clearTimeout(timer)
  }, [user, loading, router, redirectTo, hasRedirected])

  // Show loading for longer to ensure auth state is stable
  if (loading || (!user && !hasRedirected)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return <>{children}</>
}