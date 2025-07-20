'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Building, Check, Home, Plus } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { Address } from '@/types/cart'

/**
 * Address form validation schema
 */
const addressFormSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  addressLine1: z.string().min(5, 'Address must be at least 5 characters'),
  addressLine2: z.string().optional(),
  city: z.string().min(2, 'City must be at least 2 characters'),
  state: z.string().min(2, 'State must be at least 2 characters'),
  postalCode: z.string().min(5, 'Postal code must be at least 5 characters'),
  country: z.string().min(2, 'Country must be at least 2 characters'),
  phone: z.string().min(10, 'Phone number must be at least 10 characters'),
})

type AddressFormData = z.infer<typeof addressFormSchema>

/**
 * Billing information component
 * 
 * Allows users to select or add billing/shipping addresses with validation
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
  const [selectedBillingAddress, setSelectedBillingAddress] = useState<string>('1')
  const [selectedShippingAddress, setSelectedShippingAddress] = useState<string>('2')
  const [isSameAsBilling, setIsSameAsBilling] = useState(false)
  const [showAddAddress, setShowAddAddress] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<AddressFormData>({
    resolver: zodResolver(addressFormSchema),
    mode: 'onChange',
  })

  // Mock addresses - in real app, these would come from user profile
  const savedAddresses: Address[] = [
    {
      id: '1',
      type: 'billing',
      firstName: 'Ahmet',
      lastName: 'Yılmaz',
      addressLine1: 'Atatürk Caddesi No:123',
      city: 'İstanbul',
      state: 'İstanbul',
      postalCode: '34000',
      country: 'Türkiye',
      phone: '+90 555 123 4567',
      isDefault: true,
    },
    {
      id: '2',
      type: 'shipping',
      firstName: 'Fatma',
      lastName: 'Demir',
      addressLine1: 'Cumhuriyet Sokak No:45',
      addressLine2: 'Apt: 5',
      city: 'Ankara',
      state: 'Ankara',
      postalCode: '06000',
      country: 'Türkiye',
      phone: '+90 555 987 6543',
      isDefault: false,
    },
    {
      id: '3',
      type: 'billing',
      firstName: 'Mehmet',
      lastName: 'Kaya',
      addressLine1: 'İstiklal Caddesi No:78',
      city: 'İzmir',
      state: 'İzmir',
      postalCode: '35000',
      country: 'Türkiye',
      phone: '+90 555 456 7890',
      isDefault: false,
    },
  ]

  const billingAddresses = savedAddresses.filter(addr => addr.type === 'billing')
  const shippingAddresses = savedAddresses.filter(addr => addr.type === 'shipping')

  // Check if billing step is valid
  const isBillingValid = Boolean(selectedBillingAddress && (isSameAsBilling || selectedShippingAddress))

  // Notify parent component about validation status
  useEffect(() => {
    if (onValidationChange) {
      onValidationChange(isBillingValid)
    }
  }, [isBillingValid, onValidationChange])

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onSubmit = (_data: AddressFormData) => {
    // New address data would be sent to backend here
    setShowAddAddress(false)
    reset()
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {billingAddresses.map((address) => (
            <div
              key={address.id}
              className={`p-6 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                selectedBillingAddress === address.id
                  ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 shadow-lg'
                  : 'border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600 bg-white dark:bg-gray-800'
              }`}
              onClick={() => setSelectedBillingAddress(address.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {address.firstName} {address.lastName}
                    </h4>
                    {address.isDefault && (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        Default
                      </span>
                    )}
                  </div>
                  <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                    <p>{address.addressLine1}</p>
                    {address.addressLine2 && <p>{address.addressLine2}</p>}
                    <p>{address.city}, {address.state} {address.postalCode}</p>
                    <p>{address.country}</p>
                    <p className="mt-2">{address.phone}</p>
                  </div>
                </div>
                {selectedBillingAddress === address.id && (
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
      </div>

      {/* Add New Address Form */}
      {showAddAddress && (
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl p-6">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Add New Address
          </h4>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  {...register('firstName')}
                  className={errors.firstName ? 'border-red-500' : ''}
                />
                {errors.firstName && (
                  <p className="text-sm text-red-500 mt-1">{errors.firstName.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  {...register('lastName')}
                  className={errors.lastName ? 'border-red-500' : ''}
                />
                {errors.lastName && (
                  <p className="text-sm text-red-500 mt-1">{errors.lastName.message}</p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="addressLine1">Address Line 1 *</Label>
              <Input
                id="addressLine1"
                {...register('addressLine1')}
                className={errors.addressLine1 ? 'border-red-500' : ''}
              />
              {errors.addressLine1 && (
                <p className="text-sm text-red-500 mt-1">{errors.addressLine1.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="addressLine2">Address Line 2</Label>
              <Input
                id="addressLine2"
                {...register('addressLine2')}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  {...register('city')}
                  className={errors.city ? 'border-red-500' : ''}
                />
                {errors.city && (
                  <p className="text-sm text-red-500 mt-1">{errors.city.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="state">State *</Label>
                <Input
                  id="state"
                  {...register('state')}
                  className={errors.state ? 'border-red-500' : ''}
                />
                {errors.state && (
                  <p className="text-sm text-red-500 mt-1">{errors.state.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="postalCode">Postal Code *</Label>
                <Input
                  id="postalCode"
                  {...register('postalCode')}
                  className={errors.postalCode ? 'border-red-500' : ''}
                />
                {errors.postalCode && (
                  <p className="text-sm text-red-500 mt-1">{errors.postalCode.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="country">Country *</Label>
                <Input
                  id="country"
                  {...register('country')}
                  className={errors.country ? 'border-red-500' : ''}
                />
                {errors.country && (
                  <p className="text-sm text-red-500 mt-1">{errors.country.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="phone">Phone *</Label>
                <Input
                  id="phone"
                  {...register('phone')}
                  className={errors.phone ? 'border-red-500' : ''}
                />
                {errors.phone && (
                  <p className="text-sm text-red-500 mt-1">{errors.phone.message}</p>
                )}
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                type="submit"
                disabled={!isValid}
                className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
              >
                Save Address
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowAddAddress(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Same as Billing Checkbox */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6">
        <div className="flex items-center space-x-3">
          <Checkbox
            id="sameAsBilling"
            checked={isSameAsBilling}
            onCheckedChange={(checked) => setIsSameAsBilling(checked as boolean)}
            className="data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
          />
          <Label htmlFor="sameAsBilling" className="text-sm font-medium text-gray-900 dark:text-white">
            Shipping address same as billing address
          </Label>
        </div>
      </div>

      {/* Shipping Address (if different from billing) */}
      {!isSameAsBilling && (
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
              <Building className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Shipping Address
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Select your shipping address
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {shippingAddresses.map((address) => (
              <div
                key={address.id}
                className={`p-6 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                  selectedShippingAddress === address.id
                    ? 'border-green-500 bg-green-50 dark:bg-green-900/20 shadow-lg'
                    : 'border-gray-200 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-600 bg-white dark:bg-gray-800'
                }`}
                onClick={() => setSelectedShippingAddress(address.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {address.firstName} {address.lastName}
                      </h4>
                      {address.isDefault && (
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                          Default
                        </span>
                      )}
                    </div>
                    <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                      <p>{address.addressLine1}</p>
                      {address.addressLine2 && <p>{address.addressLine2}</p>}
                      <p>{address.city}, {address.state} {address.postalCode}</p>
                      <p>{address.country}</p>
                      <p className="mt-2">{address.phone}</p>
                    </div>
                  </div>
                  {selectedShippingAddress === address.id && (
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
} 