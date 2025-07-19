'use client'

import { Toaster } from 'sonner'

/**
 * Toast provider component props
 */
interface ToastProviderProps {
  children: React.ReactNode
}

/**
 * Toast notification provider component
 * Provides toast notifications throughout the app using Sonner
 * SSR-safe and compatible with Next.js
 */
export function ToastProvider({ children }: ToastProviderProps) {
  return (
    <>
      {children}
      <Toaster
        position="top-right"
        richColors
        closeButton
        expand={false}
        duration={4000}
        toastOptions={{
          style: {
            background: 'hsl(var(--background))',
            border: '1px solid hsl(var(--border))',
            color: 'hsl(var(--foreground))',
          },
          className: 'class',
          descriptionClassName: 'class',
        }}
      />
    </>
  )
} 