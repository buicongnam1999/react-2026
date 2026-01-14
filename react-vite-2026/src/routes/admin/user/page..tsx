import { createFileRoute } from '@tanstack/react-router'
import Page from '@/pages/admin/user/page'

export const Route = createFileRoute('/admin/user/page')({
  component: Page,
})
