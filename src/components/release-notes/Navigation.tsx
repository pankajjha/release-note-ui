'use client';

import Link from 'next/link';
import { useState } from 'react';
import { getAvailableScopes } from '@/lib/directus';

interface NavigationProps {
  currentScope?: string;
  releaseKey?: string;
  activePage?: 'latest' | 'archive';
}

export function Navigation({ 
  currentScope = 'all', 
  releaseKey, 
  activePage 
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

  // Scope colors for visual distinction
  const getScopeColor = (scope: string) => {
    switch (scope.toLowerCase()) {
      case 'finance': return 'bg-emerald-500';
      case 'yoddha': return 'bg-orange-500';
      case 'sangam': return 'bg-blue-500';
      default: return 'bg-gradient-to-r from-indigo-500 to-purple-500';
    }
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="sticky top-4 z-50 hidden md:flex justify-center mb-8">
        <div className="glass-card-elevated rounded-full px-2 py-2">
          <div className="flex items-center gap-1">
            {/* Brand */}
            <Link 
              href="/release-notes/latest"
              className="flex items-center gap-2 px-4 py-2 no-underline"
            >
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-sm">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="font-display font-semibold text-warm-800">Weekly</span>
            </Link>

            <div className="w-px h-5 bg-warm-200 mx-2" />

            {/* Nav Links */}
            <Link 
              href="/release-notes/latest"
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 no-underline ${
                activePage === 'latest' 
                  ? 'bg-warm-900 text-white shadow-lg' 
                  : 'text-warm-600 hover:bg-warm-100 hover:text-warm-900'
              }`}
            >
              Latest
            </Link>
            
            <Link 
              href="/release-notes/archive"
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 no-underline ${
                activePage === 'archive' 
                  ? 'bg-warm-900 text-white shadow-lg' 
                  : 'text-warm-600 hover:bg-warm-100 hover:text-warm-900'
              }`}
            >
              Archive
            </Link>

            <div className="w-px h-5 bg-warm-200 mx-2" />

            {/* Scope Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium text-warm-600 hover:bg-warm-100 hover:text-warm-900 transition-all duration-300"
              >
                <span className={`w-2 h-2 rounded-full ${getScopeColor(currentScope)}`} />
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
                  <div className="absolute top-full right-0 mt-2 z-50 glass-card-elevated rounded-2xl py-2 min-w-[180px] animate-in fade-in slide-in-from-top-2 duration-200">
                    {scopes.map((scope) => (
                      <Link
                        key={scope.value}
                        href={buildScopeUrl(scope.value)}
                        onClick={() => setIsDropdownOpen(false)}
                        className={`flex items-center gap-3 px-4 py-2.5 text-sm no-underline transition-colors ${
                          currentScope === scope.value 
                            ? 'text-primary font-medium bg-primary/5' 
                            : 'text-warm-600 hover:bg-warm-50'
                        }`}
                      >
                        <span className={`w-2.5 h-2.5 rounded-full ${getScopeColor(scope.value)}`} />
                        {scope.label}
                        {currentScope === scope.value && (
                          <svg className="w-4 h-4 ml-auto text-primary" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                          </svg>
                        )}
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
        <div className="glass-card-elevated px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Brand */}
            <Link 
              href="/release-notes/latest"
              className="flex items-center gap-2 no-underline"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-sm">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="font-display font-semibold text-warm-800">Weekly</span>
            </Link>

            {/* Nav Tabs */}
            <div className="flex items-center gap-1 bg-warm-100 rounded-full p-1">
              <Link 
                href="/release-notes/latest"
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all no-underline ${
                  activePage === 'latest' 
                    ? 'bg-white text-warm-900 shadow-sm' 
                    : 'text-warm-600'
                }`}
              >
                Latest
              </Link>
              <Link 
                href="/release-notes/archive"
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all no-underline ${
                  activePage === 'archive' 
                    ? 'bg-white text-warm-900 shadow-sm' 
                    : 'text-warm-600'
                }`}
              >
                Archive
              </Link>
            </div>

            {/* Filter Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex items-center gap-2 px-3 py-2 rounded-full text-xs font-medium text-warm-600 bg-warm-100"
            >
              <span className={`w-2 h-2 rounded-full ${getScopeColor(currentScope)}`} />
              {currentScope === 'all' ? 'All' : currentScopeLabel}
            </button>
          </div>

          {/* Mobile Scope Dropdown */}
          {isMobileMenuOpen && (
            <div className="mt-3 pt-3 border-t border-warm-200/50">
              <div className="grid grid-cols-2 gap-2">
                {scopes.map((scope) => (
                  <Link
                    key={scope.value}
                    href={buildScopeUrl(scope.value)}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm text-center no-underline transition-colors ${
                      currentScope === scope.value 
                        ? 'bg-primary/10 text-primary font-medium ring-1 ring-primary/20' 
                        : 'bg-warm-50 text-warm-600 hover:bg-warm-100'
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${getScopeColor(scope.value)}`} />
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
