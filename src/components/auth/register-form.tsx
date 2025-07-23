'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

import { AuthLayout } from '@/components/layout/auth-layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { clearError, registerUser } from '@/features/auth/authSlice'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { useToast } from '@/hooks/use-toast'
import { registerSchema, type RegisterFormData } from '@/utils/validation'


/**
 * Register form component
 * Handles user registration with comprehensive form validation
 * E-commerce focused with shopping benefits messaging
 */
export function RegisterForm() {
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
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      phoneNumber: '',
      acceptTerms: false,
    },
  })

  /**
   * Handle form submission
   * @param data - Form data from React Hook Form
   */
  const onSubmit = async (data: RegisterFormData) => {
    let loadingToastId: string | number | undefined

    try {
      // Clear any previous errors
      dispatch(clearError())

      // Show loading toast
      loadingToastId = showLoading({
        message: 'Creating your account...',
        description: 'Please wait while we set up your shopping account',
      })

      // Prepare registration data
      const registrationData = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        phoneNumber: data.phoneNumber || undefined,
        role: 'customer' as const,
      }

      // Dispatch register action
      const result = await dispatch(registerUser(registrationData))

      // Dismiss loading toast
      if (loadingToastId) dismiss(loadingToastId)

      if (registerUser.fulfilled.match(result)) {
        // Success
        showSuccess({
          message: 'Welcome to playableFactory! 🎉',
          description: 'Your account has been created successfully. Please check your email to verify your account and start shopping!',
          duration: 5000,
        })

        // Reset form
        reset()

        // Redirect to login page
        router.push('/login')
      } else if (registerUser.rejected.match(result)) {
        // Error
        const errorMessage = result.payload?.message || 'Registration failed'
        showError({
          message: 'Registration failed',
          description: errorMessage,
          action: {
            label: 'Try again',
            onClick: () => {
              // Focus on first name field
              const firstNameInput = document.getElementById('firstName')
              firstNameInput?.focus()
            },
          },
        })
      }
    } catch (error) {
      console.error('  Registration error:', error)
      showError({
        message: 'Unexpected error',
        description: 'Something went wrong. Please try again.',
      })
    }
  }

  return (
    <AuthLayout
      title="Join playableFactory"
      subtitle="Create your account to start shopping, track orders, and enjoy exclusive deals"
    >
      <form
        onSubmit={e => {
          void handleSubmit(onSubmit)(e)
        }}
        className="space-y-4"
      >
        {/* Name Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First name</Label>
            <Input
              id="firstName"
              type="text"
              placeholder="Enter your first name"
              {...register('firstName')}
              className={errors.firstName ? 'border-destructive' : ''}
              disabled={isLoading}
            />
            {errors.firstName && (
              <p className="text-sm text-destructive">{errors.firstName.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName">Last name</Label>
            <Input
              id="lastName"
              type="text"
              placeholder="Enter your last name"
              {...register('lastName')}
              className={errors.lastName ? 'border-destructive' : ''}
              disabled={isLoading}
            />
            {errors.lastName && (
              <p className="text-sm text-destructive">{errors.lastName.message}</p>
            )}
          </div>
        </div>

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

        {/* Phone Field */}
        <div className="space-y-2">
          <Label htmlFor="phoneNumber">Phone number (optional)</Label>
          <Input
            id="phoneNumber"
            type="tel"
            placeholder="Enter your phone number"
            {...register('phoneNumber')}
            className={errors.phoneNumber ? 'border-destructive' : ''}
            disabled={isLoading}
          />
          {errors.phoneNumber && (
            <p className="text-sm text-destructive">{errors.phoneNumber.message}</p>
          )}
        </div>

        {/* Password Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Create a password"
              {...register('password')}
              className={errors.password ? 'border-destructive' : ''}
              disabled={isLoading}
            />
            {errors.password && (
              <p className="text-sm text-destructive">{errors.password.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm password</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              {...register('confirmPassword')}
              className={errors.confirmPassword ? 'border-destructive' : ''}
              disabled={isLoading}
            />
            {errors.confirmPassword && (
              <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>
            )}
          </div>
        </div>

        {/* Terms Checkbox */}
        <div className="flex items-start space-x-2">
          <input
            id="acceptTerms"
            type="checkbox"
            {...register('acceptTerms')}
            className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500 mt-1"
            disabled={isLoading}
          />
          <Label
            htmlFor="acceptTerms"
            className="text-sm font-normal cursor-pointer"
          >
            I agree to the{' '}
            <Link
              href="/terms"
              className="text-purple-600 hover:text-purple-500 underline underline-offset-2"
            >
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link
              href="/privacy"
              className="text-purple-600 hover:text-purple-500 underline underline-offset-2"
            >
              Privacy Policy
            </Link>
          </Label>
        </div>
        {errors.acceptTerms && (
          <p className="text-sm text-destructive">{errors.acceptTerms.message}</p>
        )}

        {/* Submit Button */}
        <Button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700" disabled={isLoading}>
          {isLoading ? 'Creating account...' : 'Create your account'}
        </Button>
      </form>

      {/* Footer Content */}
      <div className="text-center text-sm text-muted-foreground">
        <p className="mb-2">Already have an account?{' '}
          <Link
            href="/login"
            className="text-purple-600 hover:text-purple-500 underline underline-offset-2 font-medium"
          >
            Sign in here
          </Link>
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Get 10% off your first order when you create an account! 🎉
        </p>
      </div>
    </AuthLayout>
  )
}
