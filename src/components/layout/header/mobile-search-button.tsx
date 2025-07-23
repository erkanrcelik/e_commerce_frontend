'use client'

import { Search } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

/**
 * Mobile Search Button Component
 *
 * Provides mobile search functionality with a slide-out sheet interface.
 * Opens a search sheet when clicked on mobile devices.
 *
 * @example
 * ```tsx
 * <MobileSearchButton />
 * ```
 */
export function MobileSearchButton() {
  const [searchQuery, setSearchQuery] = useState('')

  /**
   * Handle search form submission
   * @param e - Form event
   */
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // TODO: Implement search navigation
    }
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-10 w-10 rounded-xl"
          aria-label="Open search"
        >
          <Search className="w-5 h-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:w-96 p-6">
        <SheetHeader className="mb-6">
          <SheetTitle>Search Products</SheetTitle>
        </SheetHeader>

        <div className="space-y-6">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <Input
                type="text"
                placeholder="Search for anything..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="h-12 text-lg pr-16"
                autoFocus
              />
              <Button
                type="submit"
                className="absolute right-2 top-2 h-8 px-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                size="sm"
              >
                <Search className="w-4 h-4" />
              </Button>
            </div>
          </form>

          {/* Popular Searches */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Popular Searches
            </h4>
            <div className="flex flex-wrap gap-2">
              {['Headphones', 'Smart Watch', 'Laptop', 'Phone'].map(term => (
                <Button
                  key={term}
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  onClick={() => setSearchQuery(term)}
                >
                  {term}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
