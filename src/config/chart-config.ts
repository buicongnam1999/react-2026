import type { ChartType } from "@/components/chart-dynamic"

export interface SeriesConfig {
    key: string
    label?: string
    color?: string
    stackId?: string
}

export interface AppChartConfig {
    type: ChartType
    xKey?: "label"
    series: SeriesConfig[]
    options?: {
        stacked?: boolean
        innerRadius?: number | string
        outerRadius?: number | string
    }
}

export const barChartConfig: AppChartConfig = {
    type: "bar",
    xKey: "label",
    series: [
        {
            key: "sales",
            label: "Sales",
            color: "hsl(var(--chart-1))",
        },
        {
            key: "profit",
            label: "Profit",
            color: "hsl(var(--chart-2))",
        },
    ],
}

export const lineChartConfig: AppChartConfig = {
    type: "line",
    xKey: "label",
    series: [
        {
            key: "users",
            label: "Users",
            color: "hsl(var(--chart-1))",
        },
        {
            key: "active",
            label: "Active",
            color: "hsl(var(--chart-2))",
        },
    ],
}

export const areaChartConfig: AppChartConfig = {
    type: "area",
    xKey: "label",
    series: [
        {
            key: "revenue",
            label: "Revenue",
            color: "hsl(var(--chart-1))",
        },
    ],
}

export const pieChartConfig: AppChartConfig = {
    type: "pie",
    series: [
        {
            key: "value",
            label: "Value",
        },
    ],
    options: {
        outerRadius: 120,
    },
}

export const radarChartConfig: AppChartConfig = {
    type: "radar",
    xKey: "label",
    series: [
        {
            key: "speed",
            label: "Speed",
            color: "hsl(var(--chart-1))",
        },
        {
            key: "strength",
            label: "Strength",
            color: "hsl(var(--chart-2))",
        },
    ],
}

export const radialChartConfig: AppChartConfig = {
    type: "radial",
    series: [
        {
            key: "value",
            label: "Progress",
        },
    ],
    options: {
        innerRadius: "30%",
        outerRadius: "90%",
    },
}
