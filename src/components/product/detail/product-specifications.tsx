import { Card } from '@/components/ui/card'
import type { Product } from '@/types/product'

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
 * Displays product specifications in a table format.
 * 
 * Features:
 * - Technical specifications
 * - Product details
 * - Organized table layout
 * 
 * @example
 * ```tsx
 * <ProductSpecifications product={product} />
 * ```
 */
export function ProductSpecifications({ product }: ProductSpecificationsProps) {
  // Mock specifications based on product category
  const getSpecifications = () => {
    const baseSpecs = [
      { label: 'Ürün Kodu', value: product.sku },
      { label: 'Kategori', value: product.category?.name },
      { label: 'Stok Durumu', value: product.isInStock ? 'Stokta' : 'Stokta Yok' },
      { label: 'Stok Adedi', value: product.stock.toString() },
    ]

    // Add category-specific specifications
    if (product.categoryId === 'smartphones') {
      return [
        ...baseSpecs,
        { label: 'Ekran Boyutu', value: '6.1 inç' },
        { label: 'İşlemci', value: 'A17 Pro' },
        { label: 'RAM', value: '8 GB' },
        { label: 'Depolama', value: '256 GB' },
        { label: 'Kamera', value: '48 MP Ana + 12 MP Ultra Geniş' },
        { label: 'Pil', value: '4000 mAh' },
        { label: 'İşletim Sistemi', value: 'iOS 17' },
      ]
    }

    if (product.categoryId === 'laptops') {
      return [
        ...baseSpecs,
        { label: 'Ekran Boyutu', value: '13.3 inç' },
        { label: 'İşlemci', value: 'Apple M2' },
        { label: 'RAM', value: '8 GB' },
        { label: 'Depolama', value: '256 GB SSD' },
        { label: 'Grafik', value: 'Entegre' },
        { label: 'İşletim Sistemi', value: 'macOS' },
        { label: 'Ağırlık', value: '1.24 kg' },
      ]
    }

    if (product.categoryId === 'headphones') {
      return [
        ...baseSpecs,
        { label: 'Kablosuz', value: 'Evet' },
        { label: 'Gürültü Engelleme', value: 'Aktif' },
        { label: 'Pil Ömrü', value: '30 saat' },
        { label: 'Şarj Süresi', value: '3 saat' },
        { label: 'Bağlantı', value: 'Bluetooth 5.0' },
        { label: 'Ağırlık', value: '250 g' },
      ]
    }

    return baseSpecs
  }

  const specifications = getSpecifications()

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        Ürün Özellikleri
      </h2>

      <Card className="overflow-hidden">
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {specifications.map((spec, index) => (
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

      {/* Additional Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
            {product.averageRating}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Ortalama Puan
          </div>
        </Card>
        
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {product.totalReviews}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Değerlendirme
          </div>
        </Card>
        
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            {product.isInStock ? 'Var' : 'Yok'}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Stok Durumu
          </div>
        </Card>
      </div>
    </div>
  )
} 