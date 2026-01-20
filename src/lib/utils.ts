import type { ChartConfig } from '@/components/ui/chart'
import type { AppChartConfig } from '@/config/chart-config'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const toChartContainerConfig = (
  appConfig: AppChartConfig
): ChartConfig =>
  Object.fromEntries(
    appConfig.series.map((s) => [
      s.key,
      {
        label: s.label,
        color: s.color,
      },
    ])
)