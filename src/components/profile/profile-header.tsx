import { User } from 'lucide-react';
import Image from 'next/image';

import { Card } from '@/components/ui/card';

/**
 * Profile header component (user card)
 * @param user User information
 */
export function ProfileHeader({
  user,
}: {
  user: { name: string; email: string; joined: string; avatar?: string }
}) {
  return (
    <Card className="p-6 flex items-center gap-4 mb-8 shadow-none border-b bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/30 dark:to-blue-900/30">
      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center overflow-hidden">
        {user.avatar ? (
          <Image
            src={user.avatar}
            alt={user.name}
            width={64}
            height={64}
            className="w-full h-full object-cover"
          />
        ) : (
          <User className="w-8 h-8 text-white" />
        )}
      </div>
      <div>
        <div className="text-xl font-bold text-gray-900 dark:text-white">
          {user.name}
        </div>
        <div className="text-gray-600 dark:text-gray-400">{user.email}</div>
        <div className="text-xs text-gray-400 mt-1">Üyelik: {user.joined}</div>
      </div>
    </Card>
  )
}
