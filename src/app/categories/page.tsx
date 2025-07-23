import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { CustomerCategoryService } from '@/services/customer-category.service'

export const metadata: Metadata = {
  title: 'All Categories - playableFactory',
  description: 'Browse all product categories and discover new products.',
}

/**
 * Categories Page
 *
 * Displays all categories with navigation to category-specific pages.
 * Shows category information and allows browsing by category.
 *
 * Features:
 * - All categories display
 * - Category navigation
 * - Category information
 * - Responsive design
 */
export default async function CategoriesPage() {
  try {
    // Get all categories
    const categoriesResponse = await CustomerCategoryService.getCategories({
      limit: 50,
      isActive: true,
    })

    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Categories Header */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Breadcrumb */}
            <nav className="mb-6">
              <ol className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                <li>
                  <Link
                    href="/"
                    className="hover:text-purple-600 transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <li>/</li>
                <li className="text-gray-900 dark:text-white font-medium">
                  All Categories
                </li>
              </ol>
            </nav>

            {/* Page Header */}
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                All Categories
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Browse our complete collection of products organized by
                categories. Find exactly what you&apos;re looking for with our
                comprehensive product catalog.
              </p>
            </div>

            {/* Categories Grid */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Product Categories
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {categoriesResponse.data.map(category => (
                  <Link
                    key={category._id}
                    href={`/categories/${category._id}`}
                    className="group block bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors overflow-hidden"
                  >
                    {/* Category Image */}
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={category.image || '/placeholder-category.jpg'}
                        alt={category.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                    </div>
                    
                    {/* Category Info */}
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-purple-600 transition-colors">
                          {category.name}
                        </h3>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {category.productCount} products
                        </span>
                      </div>
                      {category.description && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-4">
                          {category.description}
                        </p>
                      )}
                      <div className="flex items-center text-sm text-purple-600 group-hover:text-purple-700 transition-colors">
                        Browse category
                        <svg
                          className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error('Failed to fetch categories:', error)
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Categories
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Unable to load categories at the moment. Please try again later.
            </p>
          </div>
        </div>
      </div>
    )
  }
}
