import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { RegisterForm } from '@/components/auth/register-form'
import { AuthService } from '@/services/customer-auth.service'

/**
 * Register page component
 * Handles server-side authentication check and renders the registration form
 */
export default async function RegisterPage() {
  // Check if user is already authenticated
  const cookieStore = await cookies()
  const token = cookieStore.get('accessToken')?.value

  if (token) {
    try {
      // Verify token on server side
      await AuthService.getUserInfo()
      // If token is valid, redirect to home
      redirect('/')
    } catch (error) {
      // Token is invalid, continue to register form
      console.log('Invalid token, showing register form')
    }
  }

  return <RegisterForm />
}

/**
 * Page metadata
 */
export const metadata = {
  title: 'Create Account - playableFactory',
  description: 'Join playableFactory today! Create your account to access exclusive deals, track orders, and enjoy premium shopping experience.',
}
