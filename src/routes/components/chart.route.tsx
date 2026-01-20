import { createFileRoute } from "@tanstack/react-router"
import Page from "@/pages/components/chart"

export const Route = createFileRoute("/components/chart")({
  component: Page,
})
