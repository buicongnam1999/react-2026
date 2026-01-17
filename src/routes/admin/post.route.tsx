import { createFileRoute } from "@tanstack/react-router"
import Page from "@/pages/admin/post"

export const Route = createFileRoute("/admin/post")({
  component: Page,
})
