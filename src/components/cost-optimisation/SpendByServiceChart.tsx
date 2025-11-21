'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis } from "recharts"

const spendByServiceData = [
  { service: "Compute", "Jan-Feb": 3200, "Mar-Apr": 2800, "May-Jun": 3500 },
  { service: "Storage", "Jan-Feb": 1800, "Mar-Apr": 2000, "May-Jun": 1900 },
  { service: "Database", "Jan-Feb": 1200, "Mar-Apr": 1400, "May-Jun": 1300 },
  { service: "Networking", "Jan-Feb": 800, "Mar-Apr": 900, "May-Jun": 850 },
]

const chartConfig = {
  "Jan-Feb": {
    label: "Jan-Feb",
    color: "hsl(221 83% 53%)",
  },
  "Mar-Apr": {
    label: "Mar-Apr",
    color: "hsl(280 50% 50%)",
  },
  "May-Jun": {
    label: "May-Jun",
    color: "hsl(280 50% 70%)",
  },
}

export default function SpendByServiceChart() {
  return (
    <Card className="shadow-none">
      <CardHeader>
        <CardTitle>Spend by service</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[200px] w-full">
          <BarChart data={spendByServiceData}>
            <XAxis
              dataKey="service"
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
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="Jan-Feb" stackId="a" fill="hsl(221 83% 53%)" />
            <Bar dataKey="Mar-Apr" stackId="a" fill="hsl(280 50% 50%)" />
            <Bar dataKey="May-Jun" stackId="a" fill="hsl(280 50% 70%)" />
          </BarChart>
        </ChartContainer>
        <div className="flex items-center justify-center gap-4 mt-4">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded bg-blue-500" />
            <span className="text-xs text-muted-foreground">Jan-Feb</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded bg-purple-600" />
            <span className="text-xs text-muted-foreground">Mar-Apr</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded bg-purple-400" />
            <span className="text-xs text-muted-foreground">May-Jun</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

