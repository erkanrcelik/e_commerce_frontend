import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'

/**
 * Campaign Info Props
 */
interface CampaignInfoProps {
  /** Discount percentage */
  discountPercentage: number
  /** Original price */
  originalPrice?: number
}

/**
 * Campaign Info Component
 *
 * Displays campaign information for products on sale.
 *
 * Features:
 * - Discount percentage badge
 * - Campaign details
 * - Visual appeal
 *
 * @example
 * ```tsx
 * <CampaignInfo
 *   discountPercentage={20}
 *   originalPrice={1000}
 * />
 * ```
 */
export function CampaignInfo({
  discountPercentage,
  originalPrice,
}: CampaignInfoProps) {
  return (
    <Card className="p-4 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 border-red-200 dark:border-red-800">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <Badge variant="destructive" className="text-sm font-bold">
              %{discountPercentage} İndirim
            </Badge>
            <span className="text-xs text-gray-600 dark:text-gray-400">
              Kampanya
            </span>
          </div>
          {originalPrice && (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Original price:{' '}
              <span className="line-through">${originalPrice.toFixed(2)}</span>
            </p>
          )}
        </div>
        <div className="text-right">
          <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">
              %{discountPercentage}
            </span>
          </div>
        </div>
      </div>
    </Card>
  )
}
