import api, {
  getAuthToken,
  getRefreshToken,
  removeAuthTokens,
  setAuthToken,
  setRefreshToken,
} from '@/lib/axios'
import type {
  AuthResponse,
  ForgotPasswordFormData,
  LoginFormData,
  ResetPasswordFormData,
} from '@/types/customer-auth'

/**
 * Authentication API service
 * Handles all authentication-related API calls
 * Updated according to the latest API documentation
 */
export class AuthService {
  /**
   * Register new user
   * @param userData - User registration data
   * @returns Promise with success message
   */
  static async register(userData: {
    email: string
    password: string
    firstName: string
    lastName: string
    phoneNumber?: string
    role?: string
  }): Promise<{ message: string }> {
    try {
      const response = await api.post<{ message: string }>(
        '/auth/register',
        userData
      )
      return response.data
    } catch (error) {
      throw error
    }
  }

  /**
   * Login user with email, password and platform
   * @param credentials - Login credentials with platform
   * @returns Promise with auth response including tokens
   */
  static async login(credentials: LoginFormData): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>('/auth/login', {
        ...credentials,
        platform: 'customer', // Admin platform for admin panel
      })

      const { accessToken, refreshToken } = response.data

      // Store tokens in cookies
      setAuthToken(accessToken)
      if (refreshToken) {
        setRefreshToken(refreshToken)
      }

      return response.data
    } catch (error) {
      throw error
    }
  }

  /**
   * Send forgot password email
   * @param emailData - Email for password reset
   * @returns Promise with success message
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
      throw error
    }
  }

  /**
   * Reset password with token, email and new password
   * @param resetData - Token, email and new password
   * @returns Promise with success message
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
      throw error
    }
  }

  /**
   * Verify email with token (GET request)
   * @param token - Email verification token
   * @param email - Email to verify
   * @returns Promise with success message
   */
  static async verifyEmail(
    token: string,
    email: string
  ): Promise<{ message: string }> {
    try {
      const response = await api.get<{ message: string }>(
        `/auth/verify-email?token=${token}&email=${encodeURIComponent(email)}`
      )
      return response.data
    } catch (error) {
      throw error
    }
  }

  /**
   * Logout user and invalidate tokens
   * @returns Promise<void>
   */
  static async logout(): Promise<void> {
    try {
      // Check if we have a valid token before making the API call
      const token = getAuthToken()
      if (token && token !== 'undefined') {
        // Call logout endpoint to invalidate token on server
        await api.post('/auth/logout')
      }
    } catch (error) {
      console.error('Logout error:', error)
      // Continue with local logout even if API call fails
      // This is important for offline scenarios or when backend is not available
    } finally {
      // Always remove tokens locally
      removeAuthTokens()
    }
  }

  /**
   * Refresh access token using refresh token
   * @returns Promise with new auth response
   */
  static async refreshToken(): Promise<AuthResponse> {
    try {
      const refreshToken = getRefreshToken()
      if (!refreshToken) {
        throw new Error('No refresh token available')
      }

      const response = await api.post<AuthResponse>('/auth/refresh', {
        refreshToken,
      })

      const { accessToken, refreshToken: newRefreshToken } = response.data

      // Store new tokens
      setAuthToken(accessToken)
      if (newRefreshToken) {
        setRefreshToken(newRefreshToken)
      }

      return response.data
    } catch (error) {
      throw error
    }
  }

  /**
   * Get user profile information
   * @returns Promise with user profile data
   */
  static async getUserInfo(): Promise<{
    id: string
    email: string
    firstName: string
    lastName: string
    phoneNumber?: string
    role: string
    isEmailVerified: boolean
    isActive: boolean
    createdAt: string
    updatedAt: string
  }> {
    try {
      const response = await api.get<{
        id: string
        email: string
        firstName: string
        lastName: string
        phoneNumber?: string
        role: string
        isEmailVerified: boolean
        isActive: boolean
        createdAt: string
        updatedAt: string
      }>('/auth/user-info')
      return response.data
    } catch (error) {
      throw error
    }
  }

  /**
   * Resend email verification
   * @param email - Email to resend verification to
   * @returns Promise with success message
   */
  static async resendVerification(email: string): Promise<{ message: string }> {
    try {
      const response = await api.post<{ message: string }>(
        '/auth/resend-verification',
        { email }
      )
      return response.data
    } catch (error) {
      throw error
    }
  }

  /**
   * Update user profile
   * @param profileData - Profile data to update
   * @returns Promise with success message
   */
  static async updateProfile(
    profileData: {
      firstName?: string
      lastName?: string
      phone?: string
    }
  ): Promise<{ message: string }> {
    try {
      const response = await api.put<{ message: string }>('/users/profile', profileData)
      return response.data
    } catch (error) {
      throw error
    }
  }

  /**
   * Change user password
   * @param passwordData - Password change data
   * @returns Promise with success message
   */
  static async changePassword(passwordData: {
    currentPassword: string
    newPassword: string
    confirmPassword: string
  }): Promise<{ message: string }> {
    try {
      const response = await api.put<{ message: string }>(
        '/users/profile/password',
        passwordData
      )
      return response.data
    } catch (error) {
      throw error
    }
  }
}
