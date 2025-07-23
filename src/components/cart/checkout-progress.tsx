'use client'

import { Check } from 'lucide-react'

import { cn } from '@/utils'

/**
 * Step interface for checkout progress
 */
interface Step {
  id: string
  label: string
  description: string
}

/**
 * Checkout progress component
 *
 * Shows the current step in the checkout process with navigation
 *
 * @example
 * ```tsx
 * <CheckoutProgress
 *   steps={steps}
 *   currentStep="cart"
 *   onStepChange={handleStepChange}
 * />
 * ```
 */
interface CheckoutProgressProps {
  steps: Step[]
  currentStep: string
  onStepChange: (step: string) => void
  isStepDisabled: (stepId: string) => boolean
}

export function CheckoutProgress({
  steps,
  currentStep,
  onStepChange,
  isStepDisabled,
}: CheckoutProgressProps) {
  const currentStepIndex = steps.findIndex(step => step.id === currentStep)

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Checkout
        </h1>
        <div className="text-sm text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700">
          Step {currentStepIndex + 1} of {steps.length}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="relative mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const isActive = step.id === currentStep
            const isCompleted = index < currentStepIndex
            const isDisabled = isStepDisabled(step.id)
            const canNavigate = index <= currentStepIndex || !isDisabled

            return (
              <div key={step.id} className="flex items-center">
                {/* Step Circle */}
                <div className="flex flex-col items-center">
                  <button
                    onClick={() => canNavigate && onStepChange(step.id)}
                    disabled={!canNavigate}
                    className={cn(
                      'flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 shadow-lg',
                      {
                        'bg-gradient-to-r from-purple-500 to-blue-500 border-purple-500 text-white shadow-purple-500/25':
                          isActive,
                        'bg-gradient-to-r from-green-500 to-emerald-500 border-green-500 text-white shadow-green-500/25':
                          isCompleted,
                        'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:border-purple-300 dark:hover:border-purple-600':
                          !isActive && !isCompleted && canNavigate,
                        'bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-400 dark:text-gray-500 cursor-not-allowed':
                          !canNavigate,
                      }
                    )}
                  >
                    {isCompleted ? (
                      <Check className="w-6 h-6" />
                    ) : (
                      <span className="text-sm font-semibold">{index + 1}</span>
                    )}
                  </button>

                  {/* Step Label */}
                  <div className="mt-3 text-center">
                    <div
                      className={cn('text-sm font-semibold', {
                        'text-purple-600 dark:text-purple-400': isActive,
                        'text-green-600 dark:text-green-400': isCompleted,
                        'text-gray-500 dark:text-gray-400':
                          !isActive && !isCompleted,
                      })}
                    >
                      {step.label}
                    </div>
                    <div className="text-xs text-gray-400 dark:text-gray-500 mt-1 hidden sm:block max-w-24">
                      {step.description}
                    </div>
                  </div>
                </div>

                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="flex-1 mx-6">
                    <div
                      className={cn(
                        'h-1 rounded-full transition-all duration-300',
                        {
                          'bg-gradient-to-r from-green-500 to-emerald-500':
                            index < currentStepIndex,
                          'bg-gradient-to-r from-purple-500 to-blue-500':
                            index === currentStepIndex,
                          'bg-gray-200 dark:bg-gray-600':
                            index > currentStepIndex,
                        }
                      )}
                    />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
