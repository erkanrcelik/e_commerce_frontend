'use client'


/**
 * Payment Methods Component
 * 
 * Displays accepted payment methods in footer.
 * Shows customers available payment options for trust and convenience.
 * 
 * Features:
 * - List of accepted payment methods
 * - Clean badge design
 * - Responsive layout
 * - Trust indicator
 * 
 * @example
 * ```tsx
 * <PaymentMethods />
 * ```
 */
export function PaymentMethods() {
  /**
   * Accepted payment methods configuration
   */
  const paymentMethods = [
    { name: 'Visa', description: 'Visa cards accepted' },
    { name: 'Mastercard', description: 'Mastercard accepted' },
    { name: 'American Express', description: 'American Express accepted' },
    { name: 'PayPal', description: 'PayPal payments accepted' },
    { name: 'Apple Pay', description: 'Apple Pay available' },
    { name: 'Google Pay', description: 'Google Pay available' },
  ]

  return (
    <div>
      <h4 className="text-sm font-semibold text-white mb-3">We Accept</h4>
      <div className="flex flex-wrap items-center gap-2">
        {paymentMethods.map((method) => (
          <div
            key={method.name}
            className="px-2 py-1 bg-gray-700 rounded text-xs text-gray-300 hover:bg-gray-600 transition-colors"
            title={method.description}
          >
            {method.name}
          </div>
        ))}
      </div>
      
      {/* Additional payment info */}
      <div className="mt-3 text-xs text-gray-400">
        <p>All transactions are secure and encrypted</p>
      </div>
    </div>
  )
} 