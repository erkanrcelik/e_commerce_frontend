'use client'

import { Search } from 'lucide-react'
import React, { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

/**
 * Search Bar Component
 * 
 * Provides product search functionality with clean, minimal design.
 * Features include search input and search button.
 * 
 * @example
 * ```tsx
 * <SearchBar />
 * ```
 */
export function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('')

  /**
   * Handle search form submission
   * @param e - Form event
   */
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // TODO: Implement search navigation
      // console.log('Searching for:', searchQuery)
    }
  }

  return (
    <form onSubmit={handleSearch} className="flex-1 max-w-2xl">
      <div className="relative flex items-center bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        {/* Search Input */}
        <Input
          type="text"
          placeholder="Search for anything..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
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
  )
} 