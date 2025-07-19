import api, { removeAuthTokens, setAuthToken, setRefreshToken } from '@/lib/axios'
import type {
  AuthResponse,
  ForgotPasswordFormData,
  LoginFormData,
  RegisterFormData,
  ResetPasswordFormData,
} from '@/types/auth'

/**
 * Authentication API service
 * Handles all authentication-related API calls
 */
export class AuthService {
  /**
   * Login user with email and password
   */
  static async login(credentials: LoginFormData): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>('/auth/login', credentials)
      const { token, refreshToken } = response.data

      // Store tokens in cookies
      setAuthToken(token)
      if (refreshToken) {
        setRefreshToken(refreshToken)
      }

      return response.data
    } catch (error) {
      console.error('Login API error:', error)
      throw error
    }
  }

  /**
   * Register new user
   */
  static async register(userData: RegisterFormData): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>('/auth/register', userData)
      const { token, refreshToken } = response.data

      // Store tokens in cookies
      setAuthToken(token)
      if (refreshToken) {
        setRefreshToken(refreshToken)
      }

      return response.data
    } catch (error) {
      console.error('Register API error:', error)
      throw error
    }
  }

  /**
   * Send forgot password email
   */
  static async forgotPassword(
    emailData: ForgotPasswordFormData
  ): Promise<{ message: string }> {
    try {
      const response = await api.post<{ message: string }>(
        '/auth/forgot-password',
        emailData
      )
      return response.data
    } catch (error) {
      console.error('Forgot password API error:', error)
      throw error
    }
  }

  /**
   * Reset password with token
   */
  static async resetPassword(
    resetData: ResetPasswordFormData
  ): Promise<{ message: string }> {
    try {
      const response = await api.post<{ message: string }>(
        '/auth/reset-password',
        resetData
      )
      return response.data
    } catch (error) {
      console.error('Reset password API error:', error)
      throw error
    }
  }

  /**
   * Verify email with token
   */
  static async verifyEmail(token: string): Promise<{ message: string }> {
    try {
      const response = await api.get<{ message: string }>(
        `/auth/verify-email?token=${token}`
      )
      return response.data
    } catch (error) {
      console.error('Email verification API error:', error)
      throw error
    }
  }

  /**
   * Logout user
   */
  static async logout(): Promise<void> {
    try {
      // Call logout endpoint to invalidate token on server
      await api.post('/auth/logout')
    } catch (error) {
      console.error('Logout API error:', error)
      // Continue with local logout even if API call fails
    } finally {
      // Always remove tokens locally
      removeAuthTokens()
    }
  }

  /**
   * Get current user profile
   */
  static async getProfile(): Promise<AuthResponse['user']> {
    try {
      const response = await api.get<{ user: AuthResponse['user'] }>(
        '/auth/profile'
      )
      return response.data.user
    } catch (error) {
      console.error('Get profile API error:', error)
      throw error
    }
  }

  /**
   * Update user profile
   */
  static async updateProfile(profileData: {
    name?: string
    email?: string
  }): Promise<AuthResponse['user']> {
    try {
      const response = await api.put<{ user: AuthResponse['user'] }>(
        '/auth/profile',
        profileData
      )
      return response.data.user
    } catch (error) {
      console.error('Update profile API error:', error)
      throw error
    }
  }

  /**
   * Change password
   */
  static async changePassword(passwordData: {
    currentPassword: string
    newPassword: string
    confirmPassword: string
  }): Promise<{ message: string }> {
    try {
      const response = await api.put<{ message: string }>(
        '/auth/change-password',
        passwordData
      )
      return response.data
    } catch (error) {
      console.error('Change password API error:', error)
      throw error
    }
  }

  /**
   * Resend email verification
   */
  static async resendVerification(): Promise<{ message: string }> {
    try {
      const response = await api.post<{ message: string }>(
        '/auth/resend-verification'
      )
      return response.data
    } catch (error) {
      console.error('Resend verification API error:', error)
      throw error
    }
  }
} 