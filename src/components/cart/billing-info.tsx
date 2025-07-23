'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Building, Check, Home, MapPin, Plus } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { AddressForm } from '@/components/profile/address-form'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { useAppSelector } from '@/hooks/redux'
import { CustomerAddressService } from '@/services/customer-address.service'
import type { Address, CreateAddressRequest } from '@/types/customer-address'

/**
 * Address form validation schema
 */
const addressFormSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(50, 'Title cannot exceed 50 characters'),
  firstName: z
    .string()
    .min(1, 'First name is required')
    .max(50, 'First name cannot exceed 50 characters'),
  lastName: z
    .string()
    .min(1, 'Last name is required')
    .max(50, 'Last name cannot exceed 50 characters'),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format'),
  address: z
    .string()
    .min(10, 'Address must be at least 10 characters')
    .max(200, 'Address cannot exceed 200 characters'),
  city: z
    .string()
    .min(1, 'City is required')
    .max(50, 'City cannot exceed 50 characters'),
  state: z
    .string()
    .min(1, 'State is required')
    .max(50, 'State cannot exceed 50 characters'),
  postalCode: z
    .string()
    .min(3, 'Postal code must be at least 3 characters')
    .max(10, 'Postal code cannot exceed 10 characters'),
  country: z
    .string()
    .min(1, 'Country is required')
    .max(50, 'Country cannot exceed 50 characters'),
})

type AddressFormData = z.infer<typeof addressFormSchema>

/**
 * Billing information component
 *
 * Allows users to select or add billing/shipping addresses with validation.
 * Uses user's saved addresses from profile.
 *
 * @example
 * ```tsx
 * <BillingInfo onValidationChange={setBillingValid} />
 * ```
 */
interface BillingInfoProps {
  onValidationChange?: (isValid: boolean) => void
}

export function BillingInfo({ onValidationChange }: BillingInfoProps) {
  const { user } = useAppSelector(state => state.auth)
  const [addresses, setAddresses] = useState<Address[]>([])
  const [loadingAddresses, setLoadingAddresses] = useState(true)
  const [selectedBillingAddress, setSelectedBillingAddress] =
    useState<string>('')
  const [selectedShippingAddress, setSelectedShippingAddress] =
    useState<string>('')
  const [isSameAsBilling, setIsSameAsBilling] = useState(false)
  const [showAddAddress, setShowAddAddress] = useState(false)
  const [addingAddress, setAddingAddress] = useState(false)

  const {
    // register,
    // handleSubmit,
    // formState: { errors, isValid },
    // reset,
  } = useForm<AddressFormData>({
    resolver: zodResolver(addressFormSchema),
    mode: 'onChange',
  })

  /**
   * Load user addresses
   */
  const loadAddresses = useCallback(async () => {
    if (!user) return

    try {
      setLoadingAddresses(true)
      const userAddresses = await CustomerAddressService.getAddresses()
      setAddresses(userAddresses)

      // Auto-select default address if available
      const defaultAddress = userAddresses.find(addr => addr.isDefault)
      if (defaultAddress) {
        setSelectedBillingAddress(defaultAddress._id)
        setSelectedShippingAddress(defaultAddress._id)
      }
    } catch (error: unknown) {
      console.error('  Load addresses error:', error)
      const errorMessage = error && typeof error === 'object' && 'response' in error 
        ? (error as { response?: { data?: { message?: string } } }).response?.data?.message 
        : 'Failed to load addresses'
      toast.error(errorMessage)
    } finally {
      setLoadingAddresses(false)
    }
  }, [user])

  /**
   * Handle adding new address
   */
  const handleAddAddress = async (addressData: CreateAddressRequest | any) => {
    try {
      setAddingAddress(true)
      const newAddress = await CustomerAddressService.createAddress(
        addressData as CreateAddressRequest
      )
      setAddresses(prev => [...prev, newAddress])
      setShowAddAddress(false)
      toast.success('Address added successfully')

      // Auto-select the new address
      setSelectedBillingAddress(newAddress._id)
      if (isSameAsBilling) {
        setSelectedShippingAddress(newAddress._id)
      }
    } catch (error: unknown) {
      console.error('  Save address error:', error)
      toast.error('Failed to save address')
    } finally {
      setAddingAddress(false)
    }
  }

  // Check if billing step is valid
  const isBillingValid = Boolean(
    selectedBillingAddress && (isSameAsBilling || selectedShippingAddress)
  )

  // Notify parent component about validation status
  useEffect(() => {
    if (onValidationChange) {
      onValidationChange(isBillingValid)
    }
  }, [isBillingValid, onValidationChange])

  // Load addresses on component mount
  useEffect(() => {
    if (user) {
      void loadAddresses()
    }
  }, [user, loadAddresses])

  // Update shipping address when "same as billing" is toggled
  useEffect(() => {
    if (isSameAsBilling && selectedBillingAddress) {
      setSelectedShippingAddress(selectedBillingAddress)
    }
  }, [isSameAsBilling, selectedBillingAddress])

  if (!user) {
    return (
      <div className="text-center py-12">
        <div className="w-20 h-20 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/20 dark:to-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <Home className="w-10 h-10 text-purple-500" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
          Please login to continue
        </h3>
        <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto">
          You need to be logged in to manage your billing information
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Billing Address */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
            <Home className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1 text-center">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Billing Information
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Select delivery address
            </p>
          </div>
        </div>

        {loadingAddresses ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
            <span className="ml-3 text-gray-600 dark:text-gray-400">
              Loading addresses...
            </span>
          </div>
        ) : addresses.length === 0 ? (
          <div className="text-center py-12">
            <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No addresses found
            </h4>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Add a delivery address to continue with checkout
            </p>
            <Button
              onClick={() => setShowAddAddress(true)}
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Address
            </Button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {addresses.map(address => (
                <div
                  key={address._id}
                  className={`p-6 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                    selectedBillingAddress === address._id
                      ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 shadow-lg'
                      : 'border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600 bg-white dark:bg-gray-800'
                  }`}
                  onClick={() => setSelectedBillingAddress(address._id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {address.title}
                        </h4>
                        {address.isDefault && (
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                            Default
                          </span>
                        )}
                      </div>
                      <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                        <p>
                          {address.firstName} {address.lastName}
                        </p>
                        <p>{address.street}</p>
                        <p>
                          {address.city}, {address.state} {address.postalCode}
                        </p>
                        <p>{address.country}</p>
                        <p className="mt-2">{address.phone}</p>
                      </div>
                    </div>
                    {selectedBillingAddress === address._id && (
                      <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <Button
              variant="outline"
              onClick={() => setShowAddAddress(true)}
              className="mt-4 bg-gradient-to-r from-purple-50 to-blue-50 hover:from-purple-100 hover:to-blue-100 border-purple-200 text-purple-700 dark:from-purple-900/20 dark:to-blue-900/20 dark:hover:from-purple-900/30 dark:hover:to-blue-900/30 dark:border-purple-700 dark:text-purple-300"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New Address
            </Button>
          </>
        )}
      </div>

      {/* Same as Billing Checkbox */}
      {addresses.length > 0 && selectedBillingAddress && (
        <div className="flex items-center space-x-2">
          <Checkbox
            id="same-as-billing"
            checked={isSameAsBilling}
            onCheckedChange={checked => setIsSameAsBilling(checked as boolean)}
          />
          <Label
            htmlFor="same-as-billing"
            className="text-sm text-gray-600 dark:text-gray-400"
          >
            Use same address for shipping
          </Label>
        </div>
      )}

      {/* Shipping Address (if different from billing) */}
      {addresses.length > 0 && selectedBillingAddress && !isSameAsBilling && (
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center flex-shrink-0">
              <Building className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Shipping Address
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Select shipping address
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {addresses.map(address => (
              <div
                key={address._id}
                className={`p-6 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                  selectedShippingAddress === address._id
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-lg'
                    : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 bg-white dark:bg-gray-800'
                }`}
                onClick={() => setSelectedShippingAddress(address._id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {address.title}
                      </h4>
                      {address.isDefault && (
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                          Default
                        </span>
                      )}
                    </div>
                    <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                      <p>
                        {address.firstName} {address.lastName}
                      </p>
                      <p>{address.street}</p>
                      <p>
                        {address.city}, {address.state} {address.postalCode}
                      </p>
                      <p>{address.country}</p>
                      <p className="mt-2">{address.phone}</p>
                    </div>
                  </div>
                  {selectedShippingAddress === address._id && (
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add New Address Form */}
      {showAddAddress && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Address</CardTitle>
          </CardHeader>
          <CardContent>
            <AddressForm
              onSubmit={handleAddAddress}
              onCancel={() => setShowAddAddress(false)}
              loading={addingAddress}
            />
          </CardContent>
        </Card>
      )}
    </div>
  )
}
