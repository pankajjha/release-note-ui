'use client';

import Link from 'next/link';
import { useState } from 'react';
import { getAvailableScopes } from '@/lib/directus';

interface NavigationProps {
  currentScope?: string;
  releaseKey?: string;
  activePage?: 'latest' | 'archive';
  /**
   * Choose your preferred design:
   * - 'glassmorphism': Modern glass effect with centered layout
   * - 'minimal': Clean full-width top bar with elegant styling
   * - 'floating': Floating pill on desktop, bottom nav on mobile
   */
  variant?: 'glassmorphism' | 'minimal' | 'floating';
}

export function Navigation({ 
  currentScope = 'all', 
  releaseKey, 
  activePage,
  variant = 'glassmorphism' // Change this to test different designs
}: NavigationProps) {
  const scopes = getAvailableScopes();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const buildScopeUrl = (scope: string) => {
    if (releaseKey) {
      return scope === 'all' 
        ? `/release-notes/${releaseKey}` 
        : `/release-notes/${releaseKey}?scope=${scope}`;
    }
    return scope === 'all' 
      ? '/release-notes/latest' 
      : `/release-notes/latest?scope=${scope}`;
  };

  const currentScopeLabel = scopes.find(s => s.value === currentScope)?.label || 'All Projects';

  // ═══════════════════════════════════════════════════════════════════════════
  // DESIGN A: GLASSMORPHISM CENTERED NAV
  // Modern glass effect with blur, centered on desktop, elegant mobile menu
  // ═══════════════════════════════════════════════════════════════════════════
  if (variant === 'glassmorphism') {
    return (
      <>
        {/* Desktop Navigation */}
        <nav className="sticky top-4 z-50 hidden md:flex justify-center mb-8">
          <div className="backdrop-blur-xl bg-white/70 border border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.08)] rounded-full px-2 py-2">
            <div className="flex items-center gap-1">
              <Link 
                href="/release-notes/latest"
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 no-underline ${
                  activePage === 'latest' 
                    ? 'bg-[#1A1A1A] text-white shadow-lg' 
                    : 'text-gray-600 hover:bg-black/5 hover:text-[#1A1A1A]'
                }`}
              >
                Latest
              </Link>
              
              <Link 
                href="/release-notes/archive"
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 no-underline ${
                  activePage === 'archive' 
                    ? 'bg-[#1A1A1A] text-white shadow-lg' 
                    : 'text-gray-600 hover:bg-black/5 hover:text-[#1A1A1A]'
                }`}
              >
                Archive
              </Link>

              <div className="w-px h-5 bg-gray-200/80 mx-2" />

              {/* Scope Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium text-gray-600 hover:bg-black/5 hover:text-[#1A1A1A] transition-all duration-300"
                >
                  <span className="w-2 h-2 rounded-full bg-gradient-to-r from-violet-500 to-purple-600" />
                  {currentScopeLabel}
                  <svg 
                    className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isDropdownOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-40" 
                      onClick={() => setIsDropdownOpen(false)} 
                    />
                    <div className="absolute top-full right-0 mt-2 z-50 backdrop-blur-xl bg-white/90 border border-white/40 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] py-2 min-w-[180px] animate-in fade-in slide-in-from-top-2 duration-200">
                      {scopes.map((scope) => (
                        <Link
                          key={scope.value}
                          href={buildScopeUrl(scope.value)}
                          onClick={() => setIsDropdownOpen(false)}
                          className={`flex items-center gap-3 px-4 py-2.5 text-sm no-underline transition-colors ${
                            currentScope === scope.value 
                              ? 'text-violet-600 font-medium bg-violet-50/50' 
                              : 'text-gray-600 hover:bg-gray-50/80'
                          }`}
                        >
                          {currentScope === scope.value && (
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                            </svg>
                          )}
                          <span className={currentScope === scope.value ? '' : 'ml-7'}>{scope.label}</span>
                        </Link>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </nav>

        {/* Mobile Navigation */}
        <nav className="sticky top-0 z-50 md:hidden mb-6">
          <div className="backdrop-blur-xl bg-white/80 border-b border-gray-200/50 px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Link 
                  href="/release-notes/latest"
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all no-underline ${
                    activePage === 'latest' 
                      ? 'bg-[#1A1A1A] text-white' 
                      : 'text-gray-600 bg-gray-100/80'
                  }`}
                >
                  Latest
                </Link>
                <Link 
                  href="/release-notes/archive"
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all no-underline ${
                    activePage === 'archive' 
                      ? 'bg-[#1A1A1A] text-white' 
                      : 'text-gray-600 bg-gray-100/80'
                  }`}
                >
                  Archive
                </Link>
              </div>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium text-gray-600 bg-gray-100/80"
              >
                <span className="w-2 h-2 rounded-full bg-gradient-to-r from-violet-500 to-purple-600" />
                {currentScopeLabel}
                <svg 
                  className={`w-4 h-4 transition-transform ${isMobileMenuOpen ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>

            {/* Mobile Scope Dropdown */}
            {isMobileMenuOpen && (
              <div className="mt-3 pt-3 border-t border-gray-200/50">
                <div className="grid grid-cols-2 gap-2">
                  {scopes.map((scope) => (
                    <Link
                      key={scope.value}
                      href={buildScopeUrl(scope.value)}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`px-4 py-2.5 rounded-xl text-sm text-center no-underline transition-colors ${
                        currentScope === scope.value 
                          ? 'bg-violet-100 text-violet-700 font-medium' 
                          : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {scope.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </nav>
      </>
    );
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // DESIGN B: MINIMAL TOP BAR
  // Clean, elegant full-width bar with subtle animations
  // ═══════════════════════════════════════════════════════════════════════════
  if (variant === 'minimal') {
    return (
      <nav className="sticky top-0 z-50 mb-8">
        <div className="backdrop-blur-lg bg-gradient-to-r from-white/90 via-white/95 to-white/90 border-b border-gray-100 shadow-sm">
          <div className="max-w-[980px] mx-auto px-4 md:px-6">
            <div className="flex items-center justify-between h-14 md:h-16">
              {/* Logo/Brand */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-500/25">
                  <span className="text-white font-bold text-sm">A</span>
                </div>
                <span className="hidden sm:block font-semibold text-gray-800 tracking-tight">Release Notes</span>
              </div>

              {/* Center Navigation - Desktop */}
              <div className="hidden md:flex items-center gap-1 bg-gray-100/80 rounded-lg p-1">
                <Link 
                  href="/release-notes/latest"
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 no-underline ${
                    activePage === 'latest' 
                      ? 'bg-white text-gray-900 shadow-sm' 
                      : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  Latest
                </Link>
                <Link 
                  href="/release-notes/archive"
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 no-underline ${
                    activePage === 'archive' 
                      ? 'bg-white text-gray-900 shadow-sm' 
                      : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  Archive
                </Link>
              </div>

              {/* Mobile Navigation Tabs */}
              <div className="flex md:hidden items-center gap-1 bg-gray-100/80 rounded-lg p-1">
                <Link 
                  href="/release-notes/latest"
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all no-underline ${
                    activePage === 'latest' 
                      ? 'bg-white text-gray-900 shadow-sm' 
                      : 'text-gray-500'
                  }`}
                >
                  Latest
                </Link>
                <Link 
                  href="/release-notes/archive"
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all no-underline ${
                    activePage === 'archive' 
                      ? 'bg-white text-gray-900 shadow-sm' 
                      : 'text-gray-500'
                  }`}
                >
                  Archive
                </Link>
              </div>

              {/* Scope Filter */}
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors border border-gray-200"
                >
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                  <span className="hidden sm:inline">{currentScopeLabel}</span>
                  <span className="sm:hidden">{currentScope === 'all' ? 'All' : currentScopeLabel}</span>
                  <svg 
                    className={`w-3 h-3 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isDropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsDropdownOpen(false)} />
                    <div className="absolute top-full right-0 mt-2 z-50 bg-white rounded-xl shadow-xl border border-gray-100 py-1 min-w-[160px] animate-in fade-in slide-in-from-top-2 duration-200">
                      {scopes.map((scope) => (
                        <Link
                          key={scope.value}
                          href={buildScopeUrl(scope.value)}
                          onClick={() => setIsDropdownOpen(false)}
                          className={`flex items-center gap-2 px-4 py-2.5 text-sm no-underline transition-colors ${
                            currentScope === scope.value 
                              ? 'text-violet-600 font-medium bg-violet-50' 
                              : 'text-gray-600 hover:bg-gray-50'
                          }`}
                        >
                          <span className={`w-2 h-2 rounded-full ${
                            scope.value === 'finance' ? 'bg-emerald-400' :
                            scope.value === 'yoddha' ? 'bg-orange-400' :
                            scope.value === 'sangam' ? 'bg-blue-400' :
                            'bg-gray-300'
                          }`} />
                          {scope.label}
                        </Link>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // DESIGN C: FLOATING PILL + MOBILE BOTTOM NAV
  // Floating pill on desktop, iOS-style bottom nav on mobile
  // ═══════════════════════════════════════════════════════════════════════════
  if (variant === 'floating') {
    return (
      <>
        {/* Desktop: Floating Pill Navigation */}
        <nav className="hidden md:block sticky top-6 z-50 mb-10">
          <div className="flex justify-end">
            <div className="bg-[#1A1A1A] rounded-2xl px-2 py-2 shadow-2xl shadow-black/20">
              <div className="flex items-center gap-1">
                <Link 
                  href="/release-notes/latest"
                  className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 no-underline ${
                    activePage === 'latest' 
                      ? 'bg-white text-[#1A1A1A]' 
                      : 'text-gray-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  Latest
                </Link>
                
                <Link 
                  href="/release-notes/archive"
                  className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 no-underline ${
                    activePage === 'archive' 
                      ? 'bg-white text-[#1A1A1A]' 
                      : 'text-gray-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  Archive
                </Link>

                <div className="w-px h-5 bg-gray-600 mx-1" />

                {/* Scope Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-300"
                  >
                    {currentScopeLabel}
                    <svg 
                      className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {isDropdownOpen && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setIsDropdownOpen(false)} />
                      <div className="absolute top-full right-0 mt-3 z-50 bg-[#1A1A1A] rounded-2xl shadow-2xl shadow-black/40 py-2 min-w-[180px] border border-gray-700/50 animate-in fade-in slide-in-from-top-2 duration-200">
                        {scopes.map((scope) => (
                          <Link
                            key={scope.value}
                            href={buildScopeUrl(scope.value)}
                            onClick={() => setIsDropdownOpen(false)}
                            className={`flex items-center gap-3 px-4 py-3 text-sm no-underline transition-colors ${
                              currentScope === scope.value 
                                ? 'text-white bg-white/10' 
                                : 'text-gray-400 hover:text-white hover:bg-white/5'
                            }`}
                          >
                            <span className={`w-2.5 h-2.5 rounded-full ${
                              scope.value === 'finance' ? 'bg-emerald-400' :
                              scope.value === 'yoddha' ? 'bg-orange-400' :
                              scope.value === 'sangam' ? 'bg-blue-400' :
                              'bg-gradient-to-r from-violet-400 to-purple-400'
                            }`} />
                            {scope.label}
                          </Link>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Mobile: Bottom Navigation Bar */}
        <div className="md:hidden">
          {/* Spacer to prevent content from being hidden behind bottom nav */}
          <div className="h-4" />
          
          {/* Fixed Bottom Nav */}
          <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-t border-gray-200 pb-safe">
            <div className="flex items-center justify-around px-4 py-3">
              <Link 
                href="/release-notes/latest"
                className={`flex flex-col items-center gap-1 px-4 py-1 no-underline transition-colors ${
                  activePage === 'latest' ? 'text-violet-600' : 'text-gray-400'
                }`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={activePage === 'latest' ? 2.5 : 1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="text-xs font-medium">Latest</span>
              </Link>

              <Link 
                href="/release-notes/archive"
                className={`flex flex-col items-center gap-1 px-4 py-1 no-underline transition-colors ${
                  activePage === 'archive' ? 'text-violet-600' : 'text-gray-400'
                }`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={activePage === 'archive' ? 2.5 : 1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
                <span className="text-xs font-medium">Archive</span>
              </Link>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`flex flex-col items-center gap-1 px-4 py-1 transition-colors ${
                  isMobileMenuOpen ? 'text-violet-600' : 'text-gray-400'
                }`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={isMobileMenuOpen ? 2.5 : 1.5} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                <span className="text-xs font-medium">{currentScope === 'all' ? 'Filter' : currentScopeLabel}</span>
              </button>
            </div>

            {/* Mobile Scope Sheet */}
            {isMobileMenuOpen && (
              <>
                <div 
                  className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40" 
                  onClick={() => setIsMobileMenuOpen(false)} 
                />
                <div className="absolute bottom-full left-0 right-0 z-50 bg-white rounded-t-3xl shadow-2xl border-t border-gray-100 animate-in slide-in-from-bottom-4 duration-300">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-gray-900">Filter by Project</h3>
                      <button 
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="p-2 rounded-full hover:bg-gray-100"
                      >
                        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {scopes.map((scope) => (
                        <Link
                          key={scope.value}
                          href={buildScopeUrl(scope.value)}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={`flex items-center gap-3 p-4 rounded-2xl text-sm no-underline transition-all ${
                            currentScope === scope.value 
                              ? 'bg-violet-100 text-violet-700 font-medium ring-2 ring-violet-200' 
                              : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                          }`}
                        >
                          <span className={`w-3 h-3 rounded-full ${
                            scope.value === 'finance' ? 'bg-emerald-400' :
                            scope.value === 'yoddha' ? 'bg-orange-400' :
                            scope.value === 'sangam' ? 'bg-blue-400' :
                            'bg-gradient-to-r from-violet-400 to-purple-400'
                          }`} />
                          {scope.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}
          </nav>
        </div>
      </>
    );
  }

  // Default fallback (shouldn't reach here)
  return null;
}
