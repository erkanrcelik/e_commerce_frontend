import type { Metadata } from 'next'

import { ProfileComments } from '@/components/profile/profile-comments'

export const metadata: Metadata = {
  title: 'My Comments - playableFactory',
  description: 'View your comments',
  keywords: ['comment', 'comments', 'review'],
}

/**
 * Comments Page
 *
 * User comments management page
 */
export default function CommentsPageComponent() {
  return <ProfileComments />
}
