'use client'

import { Building2, Star } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import type { Seller } from '@/types/customer-seller'
import Image from 'next/image'

/**
 * Sellers Carousel Props
 */
interface SellersCarouselProps {
  /** Sellers to display in carousel */
  sellers: Seller[]
}

/**
 * Sellers Carousel Component
 *
 * Displays featured sellers in an auto-playing carousel.
 * Uses shadcn carousel with smooth animations.
 *
 * Features:
 * - Auto-playing carousel
 * - Seller cards with store information
 * - Rating display
 * - Link to seller pages
 * - Responsive design
 * - Smooth animations
 *
 * @example
 * ```tsx
 * <SellersCarousel sellers={sellers} />
 * ```
 */
export function SellersCarousel({ sellers }: SellersCarouselProps) {
  const [api, setApi] = useState<CarouselApi | null>(null)
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!api) return

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  useEffect(() => {
    if (!api) return

    // Auto-play functionality
    const interval = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext()
      } else {
        api.scrollTo(0) // Reset to first slide
      }
    }, 3000) // Change slide every 3 seconds

    return () => clearInterval(interval)
  }, [api])

  if (!sellers || sellers.length === 0) {
    return null
  }

  return (
    <section className="py-12 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Featured Sellers
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Discover amazing products from our trusted sellers
          </p>
        </div>

        <Carousel
          setApi={setApi}
          className="w-full"
          opts={{
            align: 'start',
            loop: true,
          }}
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {sellers.map(seller => (
              <CarouselItem
                key={seller.id}
                className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center overflow-hidden">
                        {seller.logoUrl ? (
                          <Image
                            src={seller.logoUrl}
                            alt={seller.storeName}
                            width={48}
                            height={48}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Building2 className="w-6 h-6 text-white" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                          {seller.storeName}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                          {seller.sellerName}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                        {seller.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          {seller.averageRating && seller.averageRating > 0 ? (
                            <>
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span className="text-sm font-medium text-gray-900 dark:text-white">
                                {seller.averageRating.toFixed(1)}
                              </span>
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                ({seller.reviewCount || 0})
                              </span>
                            </>
                          ) : (
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              No reviews yet
                            </span>
                          )}
                        </div>

                        {seller.productCount && (
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {seller.productCount} products
                          </span>
                        )}
                      </div>

                      <div className="pt-2">
                        <Link href={`/seller/${seller.id}`}>
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full"
                          >
                            View Store
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className="flex items-center justify-center mt-6">
            <CarouselPrevious className="relative translate-y-0" />
            <div className="flex items-center gap-2 mx-4">
              {Array.from({ length: count }).map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                    index + 1 === current
                      ? 'bg-purple-600'
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                />
              ))}
            </div>
            <CarouselNext className="relative translate-y-0" />
          </div>
        </Carousel>
      </div>
    </section>
  )
}
