import { Heart } from 'lucide-react'
import Image from 'next/image'

import { Card } from '@/components/ui/card'

/**
 * Favorite product interface
 */
interface FavoriteProduct {
  id: string
  name: string
  price: number
  image: string
  slug: string
}

/**
 * My Favorites component
 * @param favorites Favorite products
 */
export function ProfileFavorites({ favorites }: { favorites: FavoriteProduct[] }) {
  if (!favorites.length) {
    return (
      <Card className="p-8 text-center flex flex-col items-center justify-center">
        <Heart className="w-10 h-10 text-gray-300 mb-2" />
        <div className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">No favorite products yet</div>
        <div className="text-gray-500 dark:text-gray-400">Your favorite products will appear here.</div>
      </Card>
    )
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {favorites.map(product => (
        <Card key={product.id} className="p-4 flex flex-col items-center">
          <div className="relative w-24 h-24 mb-2">
            <Image src={product.image} alt={product.name} fill className="object-cover rounded" />
          </div>
          <div className="font-semibold text-gray-900 dark:text-white text-center">{product.name}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">${product.price}</div>
          <a href={`/products/${product.slug}`} className="text-purple-600 dark:text-purple-400 hover:underline text-sm font-medium">View Product</a>
        </Card>
      ))}
    </div>
  )
} 