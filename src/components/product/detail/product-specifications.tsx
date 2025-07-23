import { Card } from '@/components/ui/card'
import type { Product } from '@/types/customer-product'

/**
 * Product Specifications Props
 */
interface ProductSpecificationsProps {
  /** Product to get specifications from */
  product: Product
}

/**
 * Product Specifications Component
 *
 * Displays product specifications from API data.
 * Only shows data that is returned by the API.
 *
 * Features:
 * - Technical specifications from API
 * - Product details from API
 * - Conditional rendering based on API data
 *
 * @example
 * ```tsx
 * <ProductSpecifications product={product} />
 * ```
 */
export function ProductSpecifications({ product }: ProductSpecificationsProps) {
  // Use specifications from API if available
  const specifications = product.specifications
    ? Object.entries(product.specifications).map(([key, value]) => ({
        label: key.charAt(0).toUpperCase() + key.slice(1),
        value: value,
      }))
    : []

  // Add basic product info
  const basicSpecs = [
    { label: 'Product ID', value: product._id },
    { label: 'Category', value: product.category?.name },
    {
      label: 'Stock Status',
      value: product.stock > 0 ? 'In Stock' : 'Out of Stock',
    },
    { label: 'Stock Quantity', value: product.stock.toString() },
    {
      label: 'Average Rating',
      value: product?.averageRating?.toFixed(1) || '0.0',
    },
    { label: 'Review Count', value: product?.reviewCount?.toString() || '0' },
  ]

  const allSpecifications = [...basicSpecs, ...specifications]

  if (allSpecifications.length === 0) {
    return null
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        Product Specifications
      </h2>

      <Card className="overflow-hidden">
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {allSpecifications.map((spec, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-4 px-6 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {spec.label}
              </span>
              <span className="text-sm text-gray-900 dark:text-white">
                {spec.value}
              </span>
            </div>
          ))}
        </div>
      </Card>

      {/* Product Variants - Only show if available */}
      {product.variants && product.variants.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Product Variants
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {product.variants.map((variant, index) => (
              <Card key={index} className="p-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    {variant.name}
                  </h4>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Price: ${variant.price}
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Stock: {variant.stock}
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
