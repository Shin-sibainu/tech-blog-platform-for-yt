'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const navItems = [
    { href: '/', label: 'Home', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { href: '/posts', label: 'Articles', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
    { href: '/mypage', label: 'Dashboard', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' }
  ]

  const mobileNavItems = [
    ...navItems,
    { href: '/posts/new', label: 'Write Article', icon: 'M12 4v16m8-8H4' }
  ]

  return (
    <nav className="relative">
      {/* モバイルメニューボタン */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden relative flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card text-card-foreground backdrop-blur-sm transition-all duration-200 hover:bg-accent hover:scale-105 active:scale-95"
        aria-label={isOpen ? 'メニューを閉じる' : 'メニューを開く'}
      >
        <div className="relative">
          <svg 
            className={`h-5 w-5 transition-all duration-200 ${isOpen ? 'rotate-45 opacity-0' : 'rotate-0 opacity-100'}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg 
            className={`absolute inset-0 h-5 w-5 transition-all duration-200 ${isOpen ? 'rotate-0 opacity-100' : '-rotate-45 opacity-0'}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
      </button>

      {/* デスクトップメニュー */}
      <div className="hidden md:flex items-center space-x-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href === '/posts' && pathname.startsWith('/posts'))
          return (
            <Link 
              key={item.href}
              href={item.href} 
              className={`group flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 hover-lift ${
                isActive 
                  ? 'tech-gradient text-white shadow-lg' 
                  : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
              </svg>
              <span className="hidden lg:block">{item.label}</span>
            </Link>
          )
        })}
      </div>

      {/* モバイルメニュー */}
      <div className={`absolute top-full right-0 mt-3 w-64 origin-top-right transition-all duration-200 md:hidden ${
        isOpen 
          ? 'scale-100 opacity-100 pointer-events-auto' 
          : 'scale-95 opacity-0 pointer-events-none'
      }`}>
        <div className="rounded-2xl border border-border bg-card/95 p-2 shadow-xl backdrop-blur-xl">
          {mobileNavItems.map((item) => {
            const isActive = pathname === item.href || (item.href === '/posts' && pathname.startsWith('/posts'))
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 hover:scale-[1.02] active:scale-95 ${
                  isActive 
                    ? 'bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-md' 
                    : 'text-card-foreground hover:bg-accent hover:text-accent-foreground'
                }`}
                onClick={() => setIsOpen(false)}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                </svg>
                {item.label}
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}