import type { ChartType } from "@/components/chart-dynamic"
import ChartDynamic from "@/components/chart-dynamic";
import { CodeEditor } from "@/components/code-editor";
import SelectApp from "@/components/select-app";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const chartCodeMirror = `
  // chart.model.ts

  type ChartData = {
      label: string;
      [key: string]: number | string;
  }

  // using

  <ChartDynamic data={[
    { label: "Jan", sales: 400, profit: 120 },
    { label: "Feb", sales: 300, profit: 90 },
    { label: "Mar", sales: 500, profit: 200 },
  ]} type={chartType} title="Example Chart Dynamic" />


  // dynamic chart

  import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
  import { pieChartConfig } from '@/config/chart-config';
  import { toChartContainerConfig } from '@/lib/utils';
  import type { ChartData } from '@/models/chart.model';
  import {
      Area,
      AreaChart,
      Bar,
      BarChart,
      CartesianGrid,
      Cell,
      Line,
      LineChart,
      Pie,
      PieChart,
      PolarAngleAxis,
      PolarGrid,
      PolarRadiusAxis,
      Radar,
      RadarChart,
      RadialBar,
      RadialBarChart,
      ResponsiveContainer,
      Tooltip,
      XAxis,
      YAxis,
  } from "recharts";
  import { ChartContainer, ChartLegend, ChartTooltip, ChartTooltipContent } from './ui/chart';

  export type ChartType = "bar" | "line" | "area" | "pie" | "radar" | "radial";

  const COLORS = [
      "#2563eb",
      "#22c55e",
      "#f97316",
      "#8b5cf6",
      "#ef4444",
  ]

  interface IChartDynamicProps {
      data: ChartData[]
      type: ChartType
      title?: string
  }

  export default function ChartDynamic({ data, type, title }: IChartDynamicProps) {
      const seriesKeys = data.length
          ? Object.keys(data[0]).filter((k) => k !== "label")
          : []

      const renderSeries = () =>
          seriesKeys.map((key, index) => {
              const color = COLORS[index % COLORS.length]

              if (type === "bar") {
                  return <Bar key={key} dataKey={key} fill={color} />
              }

              if (type === "line") {
                  return (
                      <Line
                          key={key}
                          type="monotone"
                          dataKey={key}
                          stroke={color}
                          strokeWidth={2}
                      />
                  )
              }

              return (
                  <Area
                      key={key}
                      type="monotone"
                      dataKey={key}
                      stroke={color}
                      fill={color}
                      fillOpacity={0.3}
                  />
              )
          })

      const renderChart = () => {
          switch (type) {
              case "bar":
                  return (
                      <BarChart data={data}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="label" />
                          <YAxis />
                          <Tooltip />
                          {renderSeries()}
                      </BarChart>
                  )

              case "line":
                  return (
                      <LineChart data={data}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="label" />
                          <YAxis />
                          <Tooltip />
                          {renderSeries()}
                      </LineChart>
                  )

              case "area":
                  return (
                      <AreaChart data={data}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="label" />
                          <YAxis />
                          <Tooltip />
                          {renderSeries()}
                      </AreaChart>
                  )
              case "pie":
                  const pie = toChartContainerConfig(pieChartConfig)
                  return (
                      <ChartContainer config={pie} className="[&_.recharts-pie-label-text]:fill-foreground mx-auto aspect-square max-h-[250px] pb-0">
                          <PieChart>
                              <ChartTooltip content={<ChartTooltipContent hideLabel nameKey="label" />} />
                              <Pie
                                  data={data}
                                  dataKey={seriesKeys[0]}
                                  nameKey="label"
                                  outerRadius={100}
                                  labelLine={false}
                                  label={({ payload, ...props }) => {
                                      return (
                                          <text
                                              cx={props.cx}
                                              cy={props.cy}
                                              x={props.x}
                                              y={props.y}
                                              textAnchor={props.textAnchor}
                                              dominantBaseline={props.dominantBaseline}
                                              fill="hsla(var(--foreground))"
                                          >
                                              {payload.visitors}
                                          </text>
                                      )
                                  }}
                              >
                                  {data.map((_, index) => (
                                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                                  ))}
                              </Pie>
                              <ChartLegend className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center" />
                              <Tooltip />
                          </PieChart>
                      </ChartContainer>

                  )
              case "radar":
                  return (
                      <RadarChart data={data}>
                          <PolarGrid />
                          <PolarAngleAxis dataKey="label" />
                          <PolarRadiusAxis />
                          <Tooltip />
                          {seriesKeys.map((key, index) => {
                              const color = COLORS[index % COLORS.length]
                              return (
                                  <Radar
                                      key={key}
                                      name={key}
                                      dataKey={key}
                                      stroke={color}
                                      fill={color}
                                      fillOpacity={0.3}
                                  />
                              )
                          })}
                      </RadarChart>
                  )
              case "radial":
                  return (
                      <RadialBarChart
                          innerRadius="30%"
                          outerRadius="90%"
                          data={data}
                      >
                          <RadialBar dataKey={seriesKeys[0]} />
                          <Tooltip />
                      </RadialBarChart>
                  )
          }
      }

      return (
          <Card>
              <CardHeader>
                  <CardTitle>{title}</CardTitle>
              </CardHeader>
              <CardContent className="h-[320px]">
                  <ResponsiveContainer width="100%" height="100%">
                      {renderChart()}
                  </ResponsiveContainer>
              </CardContent>
          </Card>
      )
  }
`

export default function ChartPage() {
  const [chartType, setChartType] = useState<ChartType>("bar");

  return <div className="grid grid-cols-3 h-full gap-2">
    <div>
      <div>
        <Label>Select Chart Type</Label>
      </div>
      <div className="mt-[10px] w-80">
        <SelectApp label="Select Chart Type" options={[{
          label: "Bar Chart", value: "bar"
        },
        {
          label: "Line Chart", value: "line"
        },
        {
          label: "Area Chart", value: "area"
        },
        {
          label: "Pie Chart", value: "pie"
        },
        {
          label: "Radar Chart", value: "radar"
        },
        {
          label: "Radial Chart", value: "radial"
        }]} value={chartType} onValueChange={(value: ChartType) => setChartType(value)}
          triggerClassName="w-80"
        />
      </div>
      <div className="mt-30">
        <ChartDynamic data={[
          { label: "Jan", sales: 400, profit: 120 },
          { label: "Feb", sales: 300, profit: 90 },
          { label: "Mar", sales: 500, profit: 200 },
        ]} type={chartType} title="Example Chart Dynamic" />
      </div>
    </div>
    <div className="w-full col-span-2">
      <CodeEditor
        value={chartCodeMirror}
        height="90vh"
      />
    </div>
  </div>
}
