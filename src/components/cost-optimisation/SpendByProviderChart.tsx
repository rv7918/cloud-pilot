'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { AreaChart, Area, XAxis, YAxis } from "recharts"

const spendByProviderData = [
  { period: "1-10 Aug", spend: 15000 },
  { period: "11-20 Aug", spend: 18000 },
  { period: "21-30 Aug", spend: 23849 },
  { period: "1-10 Nov", spend: 25000 },
]

const chartConfig = {
  spend: {
    label: "Spend",
    color: "hsl(221 83% 53%)",
  },
}

export default function SpendByProviderChart() {
  return (
    <Card className="shadow-none">
      <CardHeader>
        <CardTitle>Spend by provider</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[200px] w-full">
          <AreaChart data={spendByProviderData}>
            <XAxis
              dataKey="period"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
              domain={[0, 30000]}
              ticks={[0, 10000, 20000, 30000]}
              tickFormatter={(value) => `${value / 1000}k`}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Area
              type="monotone"
              dataKey="spend"
              stroke="hsl(221 83% 53%)"
              fill="hsl(221 83% 53%)"
              fillOpacity={0.2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

