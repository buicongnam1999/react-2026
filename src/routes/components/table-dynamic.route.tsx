import { createFileRoute } from "@tanstack/react-router"
import Page from "@/pages/components/table"

export const Route = createFileRoute("/components/table-dynamic")({
  component: Page,
})
