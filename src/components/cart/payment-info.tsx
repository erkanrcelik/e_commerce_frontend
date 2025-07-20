'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Check, CreditCard, Lock, Plus, Shield } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import type { PaymentMethod } from '@/types/cart'

/**
 * Payment form validation schema
 */
const paymentFormSchema = z.object({
  cardNumber: z.string()
    .min(16, 'Card number must be at least 16 characters')
    .max(19, 'Card number must be at most 19 characters')
    .regex(/^\d+$/, 'Please enter only numbers'),
  cardHolderName: z.string().min(2, 'Card holder name must be at least 2 characters'),
  expiryMonth: z.string().min(1, 'Please select month'),
  expiryYear: z.string().min(1, 'Please select year'),
  cvv: z.string()
    .min(3, 'CVV must be at least 3 characters')
    .max(4, 'CVV must be at most 4 characters')
    .regex(/^\d+$/, 'Please enter only numbers'),
})

type PaymentFormData = z.infer<typeof paymentFormSchema>

/**
 * Payment information component
 * 
 * Allows users to select or add payment methods with validation
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
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('1')
  const [showAddCard, setShowAddCard] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<PaymentFormData>({
    resolver: zodResolver(paymentFormSchema),
    mode: 'onChange',
  })

  // Mock payment methods - in real app, these would come from user profile
  const savedPaymentMethods: PaymentMethod[] = [
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
  const isPaymentValid = Boolean(selectedPaymentMethod && selectedPaymentMethod !== '')

  // Notify parent component about validation status
  useEffect(() => {
    if (onValidationChange) {
      onValidationChange(isPaymentValid)
    }
  }, [isPaymentValid, onValidationChange])

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onSubmit = (_data: PaymentFormData) => {
    // New payment method data would be sent to backend here
    setShowAddCard(false)
    reset()
  }

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    const matches = v.match(/\d{4,16}/g)
    const match = matches && matches[0] || ''
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    if (parts.length) {
      return parts.join(' ')
    } else {
      return v
    }
  }

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value)
    e.target.value = formatted
  }

  return (
    <div className="space-y-8">
      {/* Payment Methods */}
      <div>
        <div className="flex items-center gap-2 mb-6">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
            <CreditCard className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Payment Method
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Choose your secure payment method
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {savedPaymentMethods.map((method) => (
            <div
              key={method.id}
              className={`p-6 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                selectedPaymentMethod === method.id
                  ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 shadow-lg'
                  : 'border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600 bg-white dark:bg-gray-800'
              }`}
              onClick={() => setSelectedPaymentMethod(method.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded flex items-center justify-center">
                        <CreditCard className="w-4 h-4 text-white" />
                      </div>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {method.cardBrand} {method.cardNumber}
                      </span>
                    </div>
                    {method.isDefault && (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        Default
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Expires: {method.expiryMonth}/{method.expiryYear}
                  </p>
                </div>
                {selectedPaymentMethod === method.id && (
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
          onClick={() => setShowAddCard(true)}
          className="mt-4 bg-gradient-to-r from-purple-50 to-blue-50 hover:from-purple-100 hover:to-blue-100 border-purple-200 text-purple-700 dark:from-purple-900/20 dark:to-blue-900/20 dark:hover:from-purple-900/30 dark:hover:to-blue-900/30 dark:border-purple-700 dark:text-purple-300"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Card
        </Button>
      </div>

      {/* Add New Card Form */}
      {showAddCard && (
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl p-6">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Add New Card
          </h4>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="cardNumber">Card Number *</Label>
              <Input
                id="cardNumber"
                placeholder="1234 5678 9012 3456"
                {...register('cardNumber')}
                onChange={handleCardNumberChange}
                className={errors.cardNumber ? 'border-red-500' : ''}
              />
              {errors.cardNumber && (
                <p className="text-sm text-red-500 mt-1">{errors.cardNumber.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="cardHolderName">Card Holder Name *</Label>
              <Input
                id="cardHolderName"
                placeholder="Full Name"
                {...register('cardHolderName')}
                className={errors.cardHolderName ? 'border-red-500' : ''}
              />
              {errors.cardHolderName && (
                <p className="text-sm text-red-500 mt-1">{errors.cardHolderName.message}</p>
              )}
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="expiryMonth">Month *</Label>
                <Select>
                  <SelectTrigger className={errors.expiryMonth ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Month" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                      <SelectItem key={month} value={month.toString().padStart(2, '0')}>
                        {month.toString().padStart(2, '0')}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.expiryMonth && (
                  <p className="text-sm text-red-500 mt-1">{errors.expiryMonth.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="expiryYear">Year *</Label>
                <Select>
                  <SelectTrigger className={errors.expiryYear ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i).map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.expiryYear && (
                  <p className="text-sm text-red-500 mt-1">{errors.expiryYear.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="cvv">CVV *</Label>
                <Input
                  id="cvv"
                  placeholder="123"
                  maxLength={4}
                  {...register('cvv')}
                  className={errors.cvv ? 'border-red-500' : ''}
                />
                {errors.cvv && (
                  <p className="text-sm text-red-500 mt-1">{errors.cvv.message}</p>
                )}
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                type="submit"
                disabled={!isValid}
                className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
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
        </div>
      )}

      {/* Alternative Payment Methods */}
      <div>
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Alternative Payment Methods
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button
            variant="outline"
            className="h-16 justify-start p-4 border-2 hover:border-purple-300 dark:hover:border-purple-600 bg-white dark:bg-gray-800"
            onClick={() => setSelectedPaymentMethod('paypal')}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">P</span>
              </div>
              <div className="text-left">
                <div className="font-semibold text-gray-900 dark:text-white">PayPal</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Fast and secure</div>
              </div>
            </div>
          </Button>
          
          <Button
            variant="outline"
            className="h-16 justify-start p-4 border-2 hover:border-purple-300 dark:hover:border-purple-600 bg-white dark:bg-gray-800"
            onClick={() => setSelectedPaymentMethod('apple_pay')}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-black rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <div className="text-left">
                <div className="font-semibold text-gray-900 dark:text-white">Apple Pay</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Pay with Touch ID</div>
              </div>
            </div>
          </Button>
          
          <Button
            variant="outline"
            className="h-16 justify-start p-4 border-2 hover:border-purple-300 dark:hover:border-purple-600 bg-white dark:bg-gray-800"
            onClick={() => setSelectedPaymentMethod('google_pay')}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">G</span>
              </div>
              <div className="text-left">
                <div className="font-semibold text-gray-900 dark:text-white">Google Pay</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Quick payment</div>
              </div>
            </div>
          </Button>
          
          <Button
            variant="outline"
            className="h-16 justify-start p-4 border-2 hover:border-purple-300 dark:hover:border-purple-600 bg-white dark:bg-gray-800"
            onClick={() => setSelectedPaymentMethod('bank_transfer')}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-500 rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">B</span>
              </div>
              <div className="text-left">
                <div className="font-semibold text-gray-900 dark:text-white">Bank Transfer</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">EFT/Wire Transfer</div>
              </div>
            </div>
          </Button>
        </div>
      </div>

      {/* Security Notice */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">
              Secure Payment
            </h4>
            <p className="text-sm text-green-700 dark:text-green-300">
              All your payment information is protected with SSL encryption. 
              Your card details are never stored and are kept secure with 256-bit encryption.
            </p>
            <div className="flex items-center gap-2 mt-3">
              <Lock className="w-4 h-4 text-green-600" />
              <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                SSL Encrypted Connection
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 