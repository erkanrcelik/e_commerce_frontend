'use client'

import { Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { getSearchSuggestions } from '@/data/mock-products'

/**
 * Search Bar Component
 * 
 * Provides product search functionality with autocomplete suggestions.
 * Features include search input, autocomplete dropdown, and search button.
 * 
 * @example
 * ```tsx
 * <SearchBar />
 * ```
 */
export function SearchBar() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const searchRef = useRef<HTMLDivElement>(null)

  // Update suggestions when query changes
  useEffect(() => {
    if (searchQuery.trim()) {
      const newSuggestions = getSearchSuggestions(searchQuery, 5)
      setSuggestions(newSuggestions)
      setShowSuggestions(newSuggestions.length > 0)
      setSelectedIndex(-1)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
      setSelectedIndex(-1)
    }
  }, [searchQuery])

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  /**
   * Handle search form submission
   * @param e - Form event
   */
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setShowSuggestions(false)
    }
  }

  /**
   * Handle suggestion click
   * @param suggestion - Selected suggestion
   */
  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion)
    router.push(`/search?q=${encodeURIComponent(suggestion)}`)
    setShowSuggestions(false)
  }

  /**
   * Handle keyboard navigation
   * @param e - Keyboard event
   */
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        )
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1)
        break
      case 'Enter':
        e.preventDefault()
        if (selectedIndex >= 0 && suggestions[selectedIndex]) {
          handleSuggestionClick(suggestions[selectedIndex])
        } else if (searchQuery.trim()) {
          handleSearch(e as React.FormEvent)
        }
        break
      case 'Escape':
        setShowSuggestions(false)
        setSelectedIndex(-1)
        break
    }
  }

  return (
    <div ref={searchRef} className="flex-1 max-w-2xl relative">
      <form onSubmit={handleSearch} className="relative">
        <div className="relative flex items-center bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          {/* Search Input */}
          <Input
            type="text"
            placeholder="Search for anything..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 border-none rounded-none h-12 px-4 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent"
            aria-label="Search products"
          />

          {/* Search Button */}
          <Button 
            type="submit"
            className="rounded-none h-12 px-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </Button>
        </div>
      </form>

      {/* Autocomplete Suggestions */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 z-50 max-h-60 overflow-y-auto">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className={`w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                index === selectedIndex 
                  ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400' 
                  : 'text-gray-900 dark:text-white'
              }`}
            >
              <div className="flex items-center">
                <Search className="w-4 h-4 mr-3 text-gray-400" />
                <span>{suggestion}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
} 