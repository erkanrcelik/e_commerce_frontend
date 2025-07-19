import { RegisterForm } from '@/components/auth/register-form'

/**
 * Registration page component
 * Renders the registration form for new users
 */
export default function RegisterPage() {
  return <RegisterForm />
}

/**
 * Page metadata
 */
export const metadata = {
  title: 'Sign Up',
  description:
    'Create your account to start shopping and enjoy exclusive benefits.',
}
