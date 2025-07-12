"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { ToxColor, tsFormatter, type ToxData } from "~core"
import { Card } from "@/components/ui/card"

export interface ChartProps {
  data: [number, ToxData[]][]
}

const chartConfig = {
  Youtube: {
    label: "Youtube",
    color: ToxColor.Youtube,
  },
  Twitter: {
    label: "Twitter",
    color: ToxColor.Twitter,
  },
  Instagram: {
    label: "Instagram",
    color: ToxColor.Instagram,
  },
} satisfies ChartConfig

export default function Chart({ data }: ChartProps) {
  const chartData = data.map(([ts, tox]) => {
    const portion: any = { ts }
    for (let { type, s } of tox) {
      portion[type] = s
    }
    return portion
  })
  return (
    <Card>
      <ChartContainer config={chartConfig}>
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="ts"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={tsFormatter}
          />
          <ChartTooltip content={<ChartTooltipContent hideLabel formatter={(value, name) => (
            <div className="text-muted-foreground flex min-w-[130px] items-center text-xs">
              {chartConfig[name as keyof typeof chartConfig]?.label ||
                name}
              <div className="text-foreground ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums">
                {typeof value === 'number' ? Math.round(value / 360) / 10 : value}
                <span className="text-muted-foreground font-normal">
                  h
                </span>
              </div>
            </div>
          )} />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar
            dataKey="Youtube"
            stackId="a"
            fill={ToxColor.Youtube}
            radius={[0, 0, 4, 4]}
          />
          <Bar
            dataKey="Twitter"
            stackId="a"
            fill={ToxColor.Twitter}
          />
          <Bar
            dataKey="Instagram"
            stackId="a"
            fill={ToxColor.Instagram}
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ChartContainer>
    </Card>
  )
}
