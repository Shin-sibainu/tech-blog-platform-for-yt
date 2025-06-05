'use client'

import Link from 'next/link'
import Navigation from './Navigation'
import UserMenu from '@/components/auth/UserMenu'
import { ThemeToggle } from '@/components/ui/theme-toggle'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200/20 bg-white/70 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link 
              href="/" 
              className="group flex items-center gap-3 text-xl font-bold transition-all duration-200 hover:scale-105"
            >
              <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 shadow-lg transition-transform duration-200 group-hover:rotate-3 group-hover:shadow-xl">
                <svg 
                  className="h-5 w-5 text-white" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2.5} 
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" 
                  />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                  Tech Blog
                </span>
                <span className="text-xs font-medium text-gray-500 group-hover:text-gray-600 transition-colors">
                  Share & Learn
                </span>
              </div>
            </Link>
          </div>
          
          <Navigation />

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <UserMenu />
          </div>
        </div>
      </div>
    </header>
  )
}