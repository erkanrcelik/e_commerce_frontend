import api from '@/lib/axios'
import type {
  Address,
  CreateAddressRequest,
  UpdateAddressRequest,
} from '@/types/customer-address'

/**
 * Customer Address Service
 *
 * Handles all address-related API calls for customers.
 * Manages shipping addresses with full CRUD operations.
 *
 * Features:
 * - Get user addresses
 * - Create new address
 * - Update existing address
 * - Delete address
 * - Set default address
 * - Form validation
 * - Error handling
 */
export class CustomerAddressService {
  /**
   * Get user's addresses
   *
   * @returns Promise<Address[]> - User's addresses
   * @throws Error when request fails
   *
   * @example
   * ```typescript
   * const addresses = await CustomerAddressService.getAddresses()
   * ```
   */
  static async getAddresses(): Promise<Address[]> {
    try {
      const response = await api.get<Address[]>('/users/addresses')

      return response.data
    } catch (error) {
      throw error
    }
  }

  /**
   * Create new address
   *
   * @param addressData - Address data to create
   * @returns Promise<Address> - Created address
   * @throws Error when request fails
   *
   * @example
   * ```typescript
   * const newAddress = await CustomerAddressService.createAddress({
   *   title: 'Home',
   *   firstName: 'John',
   *   lastName: 'Doe',
   *   phone: '+905551234567',
   *   address: 'Atatürk Caddesi No:123',
   *   city: 'Istanbul',
   *   state: 'Kadıköy',
   *   postalCode: '34700',
   *   country: 'Turkey'
   * })
   * ```
   */
  static async createAddress(
    addressData: CreateAddressRequest
  ): Promise<Address> {
    try {
      const response = await api.post<Address>('/users/addresses', addressData)

      return response.data
    } catch (error) {
      throw error
    }
  }

  /**
   * Update existing address
   *
   * @param addressId - Address ID to update
   * @param addressData - Address data to update
   * @returns Promise<Address> - Updated address
   * @throws Error when request fails
   *
   * @example
   * ```typescript
   * const updatedAddress = await CustomerAddressService.updateAddress('507f1f77bcf86cd799439011', {
   *   title: 'Home Office',
   *   phone: '+905559876543'
   * })
   * ```
   */
  static async updateAddress(
    addressId: string,
    addressData: UpdateAddressRequest
  ): Promise<Address> {
    try {
      const response = await api.put<Address>(
        `/users/addresses/${addressId}`,
        addressData
      )

      return response.data
    } catch (error) {
      throw error
    }
  }

  /**
   * Delete address
   *
   * @param addressId - Address ID to delete
   * @returns Promise<void> - Success response
   * @throws Error when request fails
   *
   * @example
   * ```typescript
   * await CustomerAddressService.deleteAddress('507f1f77bcf86cd799439011')
   * ```
   */
  static async deleteAddress(addressId: string): Promise<void> {
    try {
      await api.delete(`/users/addresses/${addressId}`)
    } catch (error) {
      throw error
    }
  }

  /**
   * Set default address
   *
   * @param addressId - Address ID to set as default
   * @returns Promise<void> - Success response
   * @throws Error when request fails
   *
   * @example
   * ```typescript
   * await CustomerAddressService.setDefaultAddress('507f1f77bcf86cd799439011')
   * ```
   */
  static async setDefaultAddress(addressId: string): Promise<void> {
    try {
      await api.put(`/users/addresses/${addressId}/default`)
    } catch (error) {
      throw error
    }
  }
}
