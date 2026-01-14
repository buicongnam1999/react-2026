import { createFileRoute } from '@tanstack/react-router'
import UserPage from '@/pages/admin/user'

export const Route = createFileRoute('/admin/user/page')({
  component: UserPage,
})
