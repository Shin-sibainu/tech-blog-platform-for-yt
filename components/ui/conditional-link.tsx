'use client'

import { useAuth } from '@/contexts/AuthContext'
import Link from 'next/link'

interface ConditionalLinkProps {
  children: React.ReactNode
  className?: string
  authenticatedHref: string
  unauthenticatedHref: string
}

export function ConditionalLink({ 
  children, 
  className, 
  authenticatedHref, 
  unauthenticatedHref 
}: ConditionalLinkProps) {
  const { user, loading } = useAuth()
  
  if (loading) {
    return (
      <div className={className}>
        {children}
      </div>
    )
  }
  
  const href = user ? authenticatedHref : unauthenticatedHref
  
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  )
}