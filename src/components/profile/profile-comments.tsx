'use client'

import { MessageCircle } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Card } from '@/components/ui/card'
import { CustomerReviewService } from '@/services/customer-review.service'
import type { Review } from '@/types/customer-review'

/**
 * My Comments component
 */
export function ProfileComments() {
  const [comments, setComments] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true)
        const response = await CustomerReviewService.getUserReviews({
          page: 1,
          limit: 20,
        })
        setComments(response.data)
      } catch (err) {
        console.error('Load comments error:', err)
        setError('Yorumlar yüklenirken bir hata oluştu')
      } finally {
        setLoading(false)
      }
    }

    fetchComments()
  }, [])

  if (loading) {
    return (
      <Card className="p-8 text-center flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
        <div className="text-gray-600 dark:text-gray-400">
          Yorumlar yükleniyor...
        </div>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="p-8 text-center flex flex-col items-center justify-center">
        <div className="text-red-600 mb-2">Hata</div>
        <div className="text-gray-600 dark:text-gray-400">{error}</div>
      </Card>
    )
  }

  if (!comments.length) {
    return (
      <Card className="p-8 text-center flex flex-col items-center justify-center">
        <MessageCircle className="w-10 h-10 text-gray-300 mb-2" />
        <div className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
          Henüz yorumunuz yok
        </div>
        <div className="text-gray-500 dark:text-gray-400">
          Yorumlarınız burada görünecek.
        </div>
      </Card>
    )
  }

  return (
    <div className="grid gap-4">
      {comments.map(comment => (
        <Card key={comment._id} className="p-4 flex flex-col gap-2">
          <div className="font-semibold text-gray-900 dark:text-white">
            {comment.productId?.name || 'Ürün'}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {comment.comment}
          </div>
          <div className="text-xs text-gray-400">
            {new Date(comment.createdAt).toLocaleDateString('tr-TR')}
          </div>
          {comment.productId && (
            <a
              href={`/products/${comment.productId}`}
              className="text-purple-600 dark:text-purple-400 hover:underline text-xs font-medium"
            >
              Ürünü Gör
            </a>
          )}
        </Card>
      ))}
    </div>
  )
}
