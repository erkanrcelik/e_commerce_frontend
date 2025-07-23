'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { useAppSelector } from '@/hooks/redux'
import type { CartResponse } from '@/types/customer-cart'

import { BillingInfo } from './billing-info'
import { CartItems } from './cart-items'
import { CheckoutProgress } from './checkout-progress'
import { OrderReview } from './order-review'
import { OrderSummary } from './order-summary'
import { PaymentInfo } from './payment-info'

/**
 * Cart page component props
 */
interface CartPageProps {
  /** Initial cart screen data from SSR */
  initialData?: {
    cart: CartResponse
    recommendations: {
      frequentlyBoughtTogether: any[]
      personalized: any[]
      popular: any[]
    }
  }
}

/**
 * Cart page component
 *
 * Features:
 * - Multi-step checkout process with navigation
 * - Cart items management
 * - Billing information with validation
 * - Payment method selection
 * - Order review and confirmation
 * - SSR data integration
 *
 * @example
 * ```tsx
 * <CartPage initialData={cartScreenData} />
 * ```
 */
export function CartPage({ initialData }: CartPageProps) {
  const { items } = useAppSelector(state => state.cart)
  const [currentStep, setCurrentStep] = useState<
    'cart' | 'billing' | 'payment' | 'review'
  >('cart')
  const [billingValid, setBillingValid] = useState(false)
  const [paymentValid, setPaymentValid] = useState(false)

  const steps = [
    { id: 'cart', label: 'My Cart', description: 'Review your items' },
    {
      id: 'billing',
      label: 'Billing Information',
      description: 'Select delivery address',
    },
    { id: 'payment', label: 'Payment', description: 'Choose payment method' },
    { id: 'review', label: 'Order Review', description: 'Confirm your order' },
  ]

  const handleStepChange = (step: string) => {
    setCurrentStep(step as typeof currentStep)
  }

  const handleNext = () => {
    const currentIndex = steps.findIndex(step => step.id === currentStep)
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1].id as typeof currentStep)
    }
  }

  const handlePrevious = () => {
    const currentIndex = steps.findIndex(step => step.id === currentStep)
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1].id as typeof currentStep)
    }
  }

  const isStepDisabled = (stepId: string) => {
    switch (stepId) {
      case 'cart':
        return false
      case 'billing':
        return items.length === 0
      case 'payment':
        return items.length === 0
      case 'review':
        return items.length === 0
      default:
        return true
    }
  }

  const canProceedToNext = () => {
    switch (currentStep) {
      case 'cart':
        return items.length > 0
      case 'billing':
        return billingValid
      case 'payment':
        return paymentValid
      case 'review':
        return true
      default:
        return false
    }
  }

  const getNextStepLabel = () => {
    const currentIndex = steps.findIndex(step => step.id === currentStep)
    if (currentIndex < steps.length - 1) {
      return steps[currentIndex + 1].label
    }
    return 'Complete'
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 'cart':
        return (
          <CartItems 
            recommendations={initialData?.recommendations}
          />
        )
      case 'billing':
        return <BillingInfo onValidationChange={setBillingValid} />
      case 'payment':
        return <PaymentInfo onValidationChange={setPaymentValid} />
      case 'review':
        return <OrderReview />
      default:
        return <CartItems />
    }
  }

  const isFirstStep = currentStep === 'cart'
  const isLastStep = currentStep === 'review'

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Progress Indicator */}
        <div className="mb-8">
          <CheckoutProgress
            steps={steps}
            currentStep={currentStep}
            onStepChange={handleStepChange}
            isStepDisabled={isStepDisabled}
          />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="xl:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {steps.find(s => s.id === currentStep)?.label}
                  </h2>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Step {steps.findIndex(s => s.id === currentStep) + 1} of{' '}
                    {steps.length}
                  </div>
                </div>

                {renderStepContent()}
              </div>
            </div>
          </div>

          {/* Fixed Order Summary Sidebar with Navigation */}
          <div className="xl:col-span-1">
            <div className="sticky top-8 space-y-6">
              <OrderSummary showConfirmButton={isLastStep} />

              {/* Navigation Buttons */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center justify-between">
                  {!isFirstStep && (
                    <Button
                      variant="outline"
                      onClick={handlePrevious}
                      className="flex items-center gap-2"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Previous
                    </Button>
                  )}

                  <div className="flex items-center gap-3">
                    {!isLastStep && (
                      <Button
                        onClick={handleNext}
                        disabled={!canProceedToNext()}
                        className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 px-8"
                      >
                        {getNextStepLabel()}
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
