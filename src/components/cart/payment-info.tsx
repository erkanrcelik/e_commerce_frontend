'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Check, CreditCard, Plus, Shield } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useAppSelector } from '@/hooks/redux'

/**
 * Payment form validation schema
 */
const paymentFormSchema = z.object({
  cardNumber: z
    .string()
    .min(16, 'Card number must be at least 16 characters')
    .max(19, 'Card number must be at most 19 characters')
    .regex(/^\d+$/, 'Please enter only numbers'),
  cardHolderName: z
    .string()
    .min(2, 'Card holder name must be at least 2 characters'),
  expiryMonth: z.string().min(1, 'Please select month'),
  expiryYear: z.string().min(1, 'Please select year'),
  cvv: z
    .string()
    .min(3, 'CVV must be at least 3 characters')
    .max(4, 'CVV must be at most 4 characters')
    .regex(/^\d+$/, 'Please enter only numbers'),
})

type PaymentFormData = z.infer<typeof paymentFormSchema>

/**
 * Payment information component
 *
 * Allows users to select or add payment methods with validation.
 * Focuses on payment method selection without address selection.
 *
 * @example
 * ```tsx
 * <PaymentInfo onValidationChange={setPaymentValid} />
 * ```
 */
interface PaymentInfoProps {
  onValidationChange?: (isValid: boolean) => void
}

export function PaymentInfo({ onValidationChange }: PaymentInfoProps) {
  const { user } = useAppSelector(state => state.auth)
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<string>('1')
  const [showAddCard, setShowAddCard] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    setValue,
  } = useForm<PaymentFormData>({
    resolver: zodResolver(paymentFormSchema),
    mode: 'onChange',
  })

  // Mock payment methods - in real app, these would come from user profile
  const savedPaymentMethods = [
    {
      id: '1',
      type: 'card',
      cardNumber: '**** **** **** 1234',
      cardBrand: 'Visa',
      expiryMonth: '12',
      expiryYear: '2025',
      isDefault: true,
    },
    {
      id: '2',
      type: 'card',
      cardNumber: '**** **** **** 5678',
      cardBrand: 'Mastercard',
      expiryMonth: '08',
      expiryYear: '2026',
      isDefault: false,
    },
  ]

  // Check if payment step is valid
  const isPaymentValid = Boolean(
    selectedPaymentMethod && selectedPaymentMethod !== ''
  )

  // Notify parent component about validation status
  useEffect(() => {
    if (onValidationChange) {
      onValidationChange(isPaymentValid)
    }
  }, [isPaymentValid, onValidationChange])

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '')
    if (value.length > 16) {
      value = value.slice(0, 16)
    }
    e.target.value = value.replace(/(\d{4})/g, '$1 ').trim()
  }

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '')
    if (value.length > 4) {
      value = value.slice(0, 4)
    }
    e.target.value = value
  }

  if (!user) {
    return (
      <div className="text-center py-12">
        <div className="w-20 h-20 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/20 dark:to-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <CreditCard className="w-10 h-10 text-purple-500" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
          Please login to continue
        </h3>
        <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto">
          You need to be logged in to manage your payment information
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Payment Methods */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
            <CreditCard className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1 text-center">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Payment Method
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Choose your payment method
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {savedPaymentMethods.map(method => (
            <div
              key={method.id}
              className={`p-6 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                selectedPaymentMethod === method.id
                  ? 'border-green-500 bg-green-50 dark:bg-green-900/20 shadow-lg'
                  : 'border-gray-200 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-600 bg-white dark:bg-gray-800'
              }`}
              onClick={() => setSelectedPaymentMethod(method.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <CreditCard className="w-5 h-5 text-gray-600" />
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {method.cardBrand}
                    </h4>
                    {method.isDefault && (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        Default
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {method.cardNumber}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Expires: {method.expiryMonth}/{method.expiryYear}
                  </p>
                </div>
                {selectedPaymentMethod === method.id && (
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <Button
          variant="outline"
          onClick={() => setShowAddCard(true)}
          className="mt-4 bg-gradient-to-r from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 border-green-200 text-green-700 dark:from-green-900/20 dark:to-emerald-900/20 dark:hover:from-green-900/30 dark:hover:to-emerald-900/30 dark:border-green-700 dark:text-green-300"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Card
        </Button>
      </div>

      {/* Add New Card Form */}
      {showAddCard && (
        <Card className="overflow-hidden">
          <CardHeader className="pb-4 px-6 pt-6">
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Add New Payment Method
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 px-6 pb-6">
            <form
              onSubmit={handleSubmit(() => {
                setShowAddCard(false)
                reset()
                toast.success('Payment method added successfully')
              })}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="cardNumber">Card Number *</Label>
                  <Input
                    id="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    onChange={handleCardNumberChange}
                    className={errors.cardNumber ? 'border-red-500' : ''}
                  />
                  {errors.cardNumber && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.cardNumber.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="cardHolderName">Card Holder Name *</Label>
                  <Input
                    id="cardHolderName"
                    placeholder="John Doe"
                    {...register('cardHolderName')}
                    className={errors.cardHolderName ? 'border-red-500' : ''}
                  />
                  {errors.cardHolderName && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.cardHolderName.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="expiryMonth">Expiry Month *</Label>
                  <Select
                    onValueChange={value => setValue('expiryMonth', value)}
                  >
                    <SelectTrigger
                      className={errors.expiryMonth ? 'border-red-500' : ''}
                    >
                      <SelectValue placeholder="Month" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 12 }, (_, i) => i + 1).map(
                        month => (
                          <SelectItem
                            key={month}
                            value={month.toString().padStart(2, '0')}
                          >
                            {month.toString().padStart(2, '0')}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                  {errors.expiryMonth && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.expiryMonth.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="expiryYear">Expiry Year *</Label>
                  <Select
                    onValueChange={value => setValue('expiryYear', value)}
                  >
                    <SelectTrigger
                      className={errors.expiryYear ? 'border-red-500' : ''}
                    >
                      <SelectValue placeholder="Year" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from(
                        { length: 10 },
                        (_, i) => new Date().getFullYear() + i
                      ).map(year => (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.expiryYear && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.expiryYear.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="cvv">CVV *</Label>
                  <Input
                    id="cvv"
                    placeholder="123"
                    onChange={handleCvvChange}
                    className={errors.cvv ? 'border-red-500' : ''}
                  />
                  {errors.cvv && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.cvv.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  type="submit"
                  disabled={!isValid}
                  className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                >
                  Save Card
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowAddCard(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Security Notice */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-blue-500 mt-0.5" />
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
              Secure Payment
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Your payment information is encrypted and secure. We use
              industry-standard SSL encryption to protect your data.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
