import { Heart, LogOut, MessageCircle, ShoppingBag, User } from 'lucide-react'

import { Button } from '@/components/ui/button'

/**
 * Profile sidebar menu component
 * @param active Active tab
 * @param onChange Tab change function
 * @param onLogout Logout function
 */
export function ProfileSidebar({ active, onChange, onLogout }: {
  active: string
  onChange: (tab: string) => void
  onLogout: () => void
}) {
  return (
    <nav className="flex flex-col gap-2 w-full md:w-56">
      <Button variant={active === 'orders' ? 'default' : 'ghost'} className="justify-start" onClick={() => onChange('orders')}>
        <ShoppingBag className="w-4 h-4 mr-2" /> My Orders
      </Button>
      <Button variant={active === 'favorites' ? 'default' : 'ghost'} className="justify-start" onClick={() => onChange('favorites')}>
        <Heart className="w-4 h-4 mr-2" /> My Favorites
      </Button>
      <Button variant={active === 'comments' ? 'default' : 'ghost'} className="justify-start" onClick={() => onChange('comments')}>
        <MessageCircle className="w-4 h-4 mr-2" /> My Comments
      </Button>
      <Button variant={active === 'account' ? 'default' : 'ghost'} className="justify-start" onClick={() => onChange('account')}>
        <User className="w-4 h-4 mr-2" /> Account Settings
      </Button>
      <div className="mt-4">
        <Button variant="destructive" className="justify-start w-full" onClick={onLogout}>
          <LogOut className="w-4 h-4 mr-2" /> Logout
        </Button>
      </div>
    </nav>
  )
} 