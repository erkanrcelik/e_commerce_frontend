import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { LoginForm } from '@/components/auth/login-form'
import { AuthService } from '@/services/customer-auth.service'

/**
 * Login page component
 * Handles server-side authentication and renders the login form
 */
export default async function LoginPage() {
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
      // Token is invalid, continue to login form
      console.log('Invalid token, showing login form')
    }
  }

  return <LoginForm />
}

/**
 * Page metadata
 */
export const metadata = {
  title: 'Login - playableFactory',
  description: 'Sign in to your playableFactory account to access your profile, orders, and exclusive deals.',
}
