'use client'

import { Grid, List } from 'lucide-react'

import { Button } from '@/components/ui/button'

/**
 * View Toggle Props
 */
interface ViewToggleProps {
  /** Current view mode */
  value: 'grid' | 'list'
  /** View mode change handler */
  onChange: (view: 'grid' | 'list') => void
  /** Additional CSS classes */
  className?: string
}

/**
 * View Toggle Component
 * 
 * Toggle between grid and list view for product display.
 * 
 * Features:
 * - Grid and list view options
 * - Visual indicators for current view
 * - Responsive design
 * 
 * @example
 * ```tsx
 * <ViewToggle
 *   value={viewMode}
 *   onChange={setViewMode}
 * />
 * ```
 */
export function ViewToggle({
  value,
  onChange,
  className
}: ViewToggleProps) {
  return (
    <div className={`flex items-center border rounded-lg ${className || ''}`}>
      <Button
        variant={value === 'grid' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onChange('grid')}
        className="rounded-r-none border-r"
      >
        <Grid className="w-4 h-4" />
      </Button>
      <Button
        variant={value === 'list' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onChange('list')}
        className="rounded-l-none"
      >
        <List className="w-4 h-4" />
      </Button>
    </div>
  )
} 