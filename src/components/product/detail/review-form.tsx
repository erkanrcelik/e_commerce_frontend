'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Star, X } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useAppSelector } from '@/hooks/redux'
import { CustomerReviewService } from '@/services/customer-review.service'
import type { Product } from '@/types/customer-product'
import type { ReviewFormData } from '@/types/customer-review'

/**
 * Review form validation schema
 */
const reviewFormSchema = z.object({
  rating: z
    .number()
    .min(1, 'Rating is required')
    .max(5, 'Rating must be between 1-5'),
  title: z
    .string()
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title must be less than 100 characters'),
  comment: z
    .string()
    .min(10, 'Comment must be at least 10 characters')
    .max(1000, 'Comment must be less than 1000 characters'),
})

type ReviewFormSchema = z.infer<typeof reviewFormSchema>

/**
 * Review Form Props
 */
interface ReviewFormProps {
  /** Product to review */
  product: Product
  /** Callback when review is submitted */
  onReviewSubmitted?: () => void
  /** Trigger element */
  trigger?: React.ReactNode
}

/**
 * Review Form Component
 *
 * Modal form for creating product reviews with validation and submission handling.
 * Uses React Hook Form with Zod validation for form management.
 *
 * Features:
 * - Star rating selection
 * - Form validation with Zod
 * - Authentication check
 * - Loading states
 * - Error handling
 * - Success feedback
 *
 * @example
 * ```tsx
 * <ReviewForm
 *   product={product}
 *   onReviewSubmitted={handleReviewSubmitted}
 * />
 * ```
 */
export function ReviewForm({
  product,
  onReviewSubmitted,
  trigger,
}: ReviewFormProps) {
  const { user } = useAppSelector(state => state.auth)
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedRating, setSelectedRating] = useState(0)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<ReviewFormSchema>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: {
      rating: 0,
      title: '',
      comment: '',
    },
  })

  const watchedRating = watch('rating')

  /**
   * Handle star rating selection
   */
  const handleRatingSelect = (rating: number) => {
    setSelectedRating(rating)
    setValue('rating', rating)
  }

  /**
   * Handle form submission
   */
  const onSubmit = async (data: ReviewFormData) => {
    if (!user) {
      toast.error('Please login to write a review')
      return
    }

    setIsSubmitting(true)

    try {
      const reviewData = {
        productId: product._id,
        rating: data.rating,
        title: data.title,
        comment: data.comment,
      }

      await CustomerReviewService.createReview(reviewData)

      toast.success('Review submitted successfully!', {
        description: 'Your review has been submitted and is pending approval.',
      })

      // Reset form and close modal
      reset()
      setSelectedRating(0)
      setIsOpen(false)

      // Call callback if provided
      if (onReviewSubmitted) {
        onReviewSubmitted()
      }
    } catch (error: unknown) {
      console.error('  Submit review error:', error)
      toast.error('Failed to submit review')
    } finally {
      setIsSubmitting(false)
    }
  }

  /**
   * Handle modal close
   */
  const handleClose = () => {
    if (!isSubmitting) {
      setIsOpen(false)
      reset()
      setSelectedRating(0)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm">
            Write Review
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Write a Review</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              disabled={isSubmitting}
              className="h-6 w-6 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Product Info */}
          <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg flex-shrink-0"></div>
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">
                {product.name}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                ${product.price.toFixed(2)}
              </p>
            </div>
          </div>

          {/* Rating Selection */}
          <div className="space-y-2">
            <Label htmlFor="rating">Rating *</Label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map(rating => (
                <button
                  key={rating}
                  type="button"
                  onClick={() => handleRatingSelect(rating)}
                  className={`p-1 rounded transition-colors ${
                    rating <= (selectedRating || watchedRating)
                      ? 'text-yellow-400'
                      : 'text-gray-300 hover:text-yellow-400'
                  }`}
                >
                  <Star className="w-6 h-6 fill-current" />
                </button>
              ))}
            </div>
            <input
              {...register('rating', { valueAsNumber: true })}
              type="hidden"
            />
            {errors.rating && (
              <p className="text-sm text-red-500">{errors.rating.message}</p>
            )}
          </div>

          {/* Title Input */}
          <div className="space-y-2">
            <Label htmlFor="title">Review Title *</Label>
            <Input
              id="title"
              {...register('title')}
              placeholder="Brief summary of your experience"
              disabled={isSubmitting}
            />
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title.message}</p>
            )}
          </div>

          {/* Comment Input */}
          <div className="space-y-2">
            <Label htmlFor="comment">Review Comment *</Label>
            <Textarea
              id="comment"
              {...register('comment')}
              placeholder="Share your detailed experience with this product..."
              rows={4}
              disabled={isSubmitting}
            />
            {errors.comment && (
              <p className="text-sm text-red-500">{errors.comment.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex gap-3">
            <Button
              type="submit"
              disabled={isSubmitting || !selectedRating}
              className="flex-1"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Review'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
