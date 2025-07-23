'use client'

import { ZoomIn } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
// Temporarily use simple type for build compatibility
type ProductImage = { url: string; alt: string; id?: string }

/**
 * Product Image Gallery Props
 */
interface ProductImageGalleryProps {
  /** Product images to display */
  images: ProductImage[]
}

/**
 * Product Image Gallery Component
 *
 * Displays product images with thumbnail navigation and zoom functionality.
 *
 * Features:
 * - Main image display
 * - Thumbnail navigation
 * - Zoom functionality
 * - Image carousel
 * - Responsive design
 *
 * @example
 * ```tsx
 * <ProductImageGallery images={product.images} />
 * ```
 */
export function ProductImageGallery({ images }: ProductImageGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)

  const currentImage = images[currentImageIndex]

  const toggleZoom = () => {
    setIsZoomed(!isZoomed)
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
        <Image
          src={currentImage?.url || '/placeholder-product.jpg'}
          alt={currentImage?.alt || 'Product image'}
          fill
          className={`object-cover transition-transform duration-300 ${
            isZoomed ? 'scale-110' : 'scale-100'
          }`}
        />
        <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors" />

        {/* Zoom Button */}
        <Button
          variant="secondary"
          size="sm"
          onClick={toggleZoom}
          className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ZoomIn className="w-4 h-4" />
        </Button>
      </div>

      {/* Thumbnail Images */}
      <div className="grid grid-cols-4 gap-2">
        {images.map((image, index) => (
          <button
            key={image.id}
            onClick={() => setCurrentImageIndex(index)}
            className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
              currentImageIndex === index
                ? 'border-purple-500 ring-2 ring-purple-200 dark:ring-purple-800'
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
            }`}
          >
            <Image
              src={image.url}
              alt={image.alt}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  )
}
