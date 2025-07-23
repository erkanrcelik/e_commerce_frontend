'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

import { AuthLayout } from '@/components/layout/auth-layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { clearError, forgotPassword } from '@/features/auth/authSlice'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { useToast } from '@/hooks/use-toast'
import {
  forgotPasswordSchema,
  type ForgotPasswordFormData,
} from '@/utils/validation'


/**
 * Forgot password form component
 * Handles password reset request
 * E-commerce focused with shopping benefits messaging
 */
export function ForgotPasswordForm() {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { status } = useAppSelector(state => state.auth)
  const { showSuccess, showError, showLoading, dismiss } = useToast()
  const isLoading = status === 'loading'

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  })

  /**
   * Handle form submission
   * @param data - Form data from React Hook Form
   */
  const onSubmit = async (data: ForgotPasswordFormData) => {
    let loadingToastId: string | number | undefined

    try {
      // Clear any previous errors
      dispatch(clearError())

      // Show loading toast
      loadingToastId = showLoading({
        message: 'Sending reset email...',
        description: 'Please wait while we send the password reset link to your email',
      })

      // Dispatch forgot password action
      const result = await dispatch(forgotPassword(data))

      // Dismiss loading toast
      if (loadingToastId) dismiss(loadingToastId)

      if (forgotPassword.fulfilled.match(result)) {
        // Success
        showSuccess({
          message: 'Reset email sent! 📧',
          description:
            "We've sent a verification code to your email address. Please check your inbox to continue shopping.",
          duration: 5000,
        })

        // Reset form
        reset()

        // Redirect to verify code page with email
        router.push(`/verify-code?email=${encodeURIComponent(data.email)}`)
      } else if (forgotPassword.rejected.match(result)) {
        // Error
        const errorMessage =
          result.payload?.message || 'Failed to send reset email'
        showError({
          message: 'Failed to send reset email',
          description: errorMessage,
          action: {
            label: 'Try again',
            onClick: () => {
              void window.location.reload()
            },
          },
        })
      }
    } catch (error) {
      console.error('  Forgot password error:', error)
      // Dismiss loading toast if still showing
      if (loadingToastId) dismiss(loadingToastId)

      showError({
        message: 'Unexpected error',
        description: 'Something went wrong. Please try again.',
      })
    }
  }

  return (
    <AuthLayout
      title="Forgot your password?"
      subtitle="No worries! Enter your email and we'll send you a reset link to get back to shopping"
    >
      <form
        onSubmit={e => {
          void handleSubmit(onSubmit)(e)
        }}
        className="space-y-4"
      >
        {/* Email Field */}
        <div className="space-y-2">
          <Label htmlFor="email">Email address</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email address"
            {...register('email')}
            className={errors.email ? 'border-destructive' : ''}
            disabled={isLoading}
          />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <Button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700" disabled={isLoading}>
          {isLoading ? 'Sending...' : 'Send reset link'}
        </Button>
      </form>

      {/* Footer Content */}
      <div className="text-center text-sm text-muted-foreground">
        <p className="mb-2">Remember your password?{' '}
          <Link
            href="/login"
            className="text-purple-600 hover:text-purple-500 underline underline-offset-2 font-medium"
          >
            Sign in here
          </Link>
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          We'll help you get back to shopping quickly! 🛍️
        </p>
      </div>
    </AuthLayout>
  )
}
