'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

import { AuthLayout } from '@/components/layout/auth-layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { clearError, loginUser } from '@/features/auth/authSlice'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { useToast } from '@/hooks/use-toast'
import { loginSchema, type LoginFormData } from '@/utils/validation'

/**
 * Login form component
 * Handles user authentication with email and password
 * E-commerce focused with shopping benefits messaging
 */
export function LoginForm() {
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
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  })

  /**
   * Handle form submission
   * @param data - Form data from React Hook Form
   */
  const onSubmit = async (data: LoginFormData) => {
    let loadingToastId: string | number | undefined

    try {
      // Clear any previous errors
      dispatch(clearError())

      // Show loading toast
      loadingToastId = showLoading({
        message: 'Signing you in...',
        description: 'Please wait while we verify your credentials',
      })

      // Dispatch login action
      const result = await dispatch(loginUser(data))

      // Dismiss loading toast
      if (loadingToastId) dismiss(loadingToastId)

      if (loginUser.fulfilled.match(result)) {
        // Success
        showSuccess({
          message: 'Welcome back! 🛍️',
          description: 'You have been successfully signed in. Start shopping!',
          duration: 3000,
        })

        // Reset form
        reset()

        // Redirect to dashboard
        router.push('/')
      } else if (loginUser.rejected.match(result)) {
        // Error
        const errorMessage = result.payload?.message || 'Login failed'
        showError({
          message: 'Sign in failed',
          description: errorMessage,
          action: {
            label: 'Try again',
            onClick: () => {
              // Focus on email field
              const emailInput = document.getElementById('email')
              emailInput?.focus()
            },
          },
        })
      }
    } catch (error) {
      console.error('  Login error:', error)
      showError({
        message: 'Unexpected error',
        description: 'Something went wrong. Please try again.',
      })
    }
  }

  return (
    <AuthLayout
      title="Welcome back to playableFactory"
      subtitle="Sign in to access your account, track orders, and enjoy exclusive deals"
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
            placeholder="Enter your email"
            {...register('email')}
            className={errors.email ? 'border-destructive' : ''}
            disabled={isLoading}
          />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email.message}</p>
          )}
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link
              href="/forgot-password"
              className="text-sm underline-offset-2 hover:underline text-muted-foreground hover:text-purple-600 dark:hover:text-purple-400"
            >
              Forgot password?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="Enter your password"
            {...register('password')}
            className={errors.password ? 'border-destructive' : ''}
            disabled={isLoading}
          />
          {errors.password && (
            <p className="text-sm text-destructive">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Remember Me Checkbox */}
        <div className="flex items-center space-x-2">
          <input
            id="rememberMe"
            type="checkbox"
            {...register('rememberMe')}
            className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
            disabled={isLoading}
          />
          <Label
            htmlFor="rememberMe"
            className="text-sm font-normal cursor-pointer"
          >
            Keep me signed in for 30 days
          </Label>
        </div>

        {/* Submit Button */}
        <Button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700" disabled={isLoading}>
          {isLoading ? 'Signing in...' : 'Sign in to your account'}
        </Button>
      </form>

      {/* Footer Content */}
      <div className="text-center text-sm text-muted-foreground">
        <p className="mb-2">Don&apos;t have an account?{' '}
          <Link
            href="/register"
            className="text-purple-600 hover:text-purple-500 underline underline-offset-2 font-medium"
          >
            Create one now
          </Link>
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          New customers get 10% off their first order! 🎉
        </p>
      </div>
    </AuthLayout>
  )
}
