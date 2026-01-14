import Page from "@/pages/admin/post"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/admin/post/page")({
  component: Page,
})
