'use client'

import Link from 'next/link'
import Navigation from './Navigation'
import UserMenu from '@/components/auth/UserMenu'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { Code2, Terminal, Zap } from 'lucide-react'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 glass border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link 
              href="/" 
              className="group flex items-center gap-3 transition-all duration-300 hover-lift"
            >
              <div className="relative flex h-10 w-10 items-center justify-center rounded-xl tech-gradient shadow-lg transition-all duration-300 group-hover:rotate-12 group-hover:scale-110">
                <Code2 className="h-5 w-5 text-white" />
                <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-accent animate-pulse">
                  <Zap className="h-2 w-2 text-white ml-0.5 mt-0.5" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="tech-gradient-text text-xl font-bold">
                  DevSpace
                </span>
                <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors flex items-center gap-1">
                  <Terminal className="h-3 w-3" />
                  Code • Share • Grow
                </span>
              </div>
            </Link>
          </div>
          
          <Navigation />

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <UserMenu />
          </div>
        </div>
      </div>
    </header>
  )
}