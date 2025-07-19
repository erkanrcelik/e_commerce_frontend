import { User } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

/**
 * Account Settings component
 * @param user User information
 */
export function ProfileAccount({ user }: { user: { name: string; email: string; joined: string } }) {
  return (
    <Card className="p-8 max-w-lg mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <User className="w-6 h-6 text-purple-600" />
        <div className="text-lg font-semibold text-gray-900 dark:text-white">Account Settings</div>
      </div>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
          <input type="text" className="w-full px-3 py-2 border rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white" defaultValue={user.name} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
          <input type="email" className="w-full px-3 py-2 border rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white" defaultValue={user.email} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Member Since</label>
          <input type="text" className="w-full px-3 py-2 border rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-400" value={user.joined} disabled />
        </div>
        <Button type="submit" className="w-full mt-4">Update Information</Button>
      </form>
    </Card>
  )
} 