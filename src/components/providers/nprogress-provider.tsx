'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import NProgress from 'nprogress'
import { Suspense, useEffect } from 'react'

/**
 * NProgress Provider
 * 
 * Shows progress bar above header during page transitions
 */
function NProgressInner() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    NProgress.configure({ 
      showSpinner: false,
      minimum: 0.1,
      easing: 'ease',
      speed: 500,
      trickleSpeed: 200
    })
  }, [])

  useEffect(() => {
    NProgress.start()
    
    // Complete progress with a short delay
    const timer = setTimeout(() => {
      NProgress.done()
    }, 100)

    return () => {
      clearTimeout(timer)
      NProgress.done()
    }
  }, [pathname, searchParams])

  return null
}

export function NProgressProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Suspense fallback={null}>
        <NProgressInner />
      </Suspense>
      {children}
    </>
  )
} 