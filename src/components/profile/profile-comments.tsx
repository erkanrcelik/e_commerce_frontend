import { MessageCircle } from 'lucide-react'

import { Card } from '@/components/ui/card'

/**
 * Comment interface
 */
interface Comment {
  id: string
  productName: string
  productSlug: string
  text: string
  date: string
}

/**
 * My Comments component
 * @param comments User comments
 */
export function ProfileComments({ comments }: { comments: Comment[] }) {
  if (!comments.length) {
    return (
      <Card className="p-8 text-center flex flex-col items-center justify-center">
        <MessageCircle className="w-10 h-10 text-gray-300 mb-2" />
        <div className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">No comments yet</div>
        <div className="text-gray-500 dark:text-gray-400">Your comments will appear here.</div>
      </Card>
    )
  }
  return (
    <div className="grid gap-4">
      {comments.map(comment => (
        <Card key={comment.id} className="p-4 flex flex-col gap-2">
          <div className="font-semibold text-gray-900 dark:text-white">{comment.productName}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">{comment.text}</div>
          <div className="text-xs text-gray-400">{comment.date}</div>
          <a href={`/products/${comment.productSlug}`} className="text-purple-600 dark:text-purple-400 hover:underline text-xs font-medium">View Product</a>
        </Card>
      ))}
    </div>
  )
} 