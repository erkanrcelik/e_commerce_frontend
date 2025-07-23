'use client'

import { Edit, MessageSquare, Star, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useAppSelector } from '@/hooks/redux'
import { CustomerReviewService } from '@/services/customer-review.service'
import type { Review } from '@/types/customer-review'

export function ProfileReviews() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [deletingReview, setDeletingReview] = useState<string | null>(null)
  const { user } = useAppSelector(state => state.auth)

  const loadReviews = async (page: number = 1) => {
    try {
      setLoading(true)
      const response = await CustomerReviewService.getMyReviews({
        page,
        limit: 10,
      })
      setReviews(response.data)
      setTotalPages(response.totalPages)
      setCurrentPage(page)
    } catch (error) {
      console.error('Load reviews error:', error)
      toast.error('Failed to load reviews')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteReview = async (reviewId: string) => {
    try {
      setDeletingReview(reviewId)
      await CustomerReviewService.deleteReview(reviewId)
      setReviews(prev => prev.filter(review => review._id !== reviewId))
      toast.success('Review deleted successfully')
    } catch (error) {
      console.error('Delete review error:', error)
      toast.error('Failed to delete review')
    } finally {
      setDeletingReview(null)
    }
  }

  const handlePageChange = (page: number) => {
    loadReviews(page)
  }

  const getRatingStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating
            ? 'text-yellow-400 fill-yellow-400'
            : 'text-gray-300 dark:text-gray-600'
        }`}
      />
    ))
  }

  const getStatusBadge = (isApproved: boolean) => {
    return (
      <Badge variant={isApproved ? 'default' : 'secondary'}>
        {isApproved ? 'Approved' : 'Pending'}
      </Badge>
    )
  }

  useEffect(() => {
    if (user) {
      loadReviews()
    }
  }, [user])

  if (!user) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Login Required
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Please login to view your reviews
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          My Reviews
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Manage your product reviews
        </p>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && reviews.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No reviews yet
            </h3>
            <p className="text-sm text-muted-foreground">
              You haven&apos;t written any reviews yet.
            </p>
            <p className="text-sm text-muted-foreground">
              Share your thoughts about products you&apos;ve purchased.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Reviews List */}
      {!loading && reviews.length > 0 && (
        <div className="space-y-4">
          {reviews.map(review => (
            <Card key={review._id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {review.productId?.name}
                      </h3>
                      {getStatusBadge(review.isApproved)}
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      {getRatingStars(review.rating)}
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {review.rating}/5
                      </span>
                    </div>

                    <p className="text-gray-600 dark:text-gray-300 mb-3">
                      {review.comment}
                    </p>

                    {review.productId && (
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Product: {review.productId.name}
                      </div>
                    )}

                    <div className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 ml-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        // TODO: Implement edit functionality
                        toast.info('Edit functionality coming soon!')
                      }}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteReview(review._id)}
                      disabled={deletingReview === review._id}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Pagination */}
      {!loading && totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </Button>

          <span className="text-sm text-gray-500 dark:text-gray-400">
            Page {currentPage} of {totalPages}
          </span>

          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  )
}
