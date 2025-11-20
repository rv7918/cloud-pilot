'use client';

import { Card, CardContent } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis } from "recharts"

const chartConfig = {
    spend: {
      label: "Spend",
      color: "hsl(280 65% 30%)",
    },
    capacity: {
      label: "Capacity",
      color: "hsl(0 0% 88%)",
    },
  }

export default function CloudSpendChart(props: {
    data: any;
}) {
    return (
        <Card>
        <div className="flex items-center justify-between p-5">
          <h2 className="text-xl font-semibold">Total Cloud Spend Over time</h2>
          <a href="#" className="text-primary text-sm hover:underline">Agent Summary</a>
        </div>
          <CardContent className="pt-6">
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <BarChart 
                data={props.data}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                barCategoryGap="30%"
              >
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  domain={[0, 6000]}
                  ticks={[0, 2000, 4000, 6000]}
                  tickFormatter={(value) => `${value / 1000}k`}
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar
                  dataKey="spend"
                  stackId="a"
                  fill="hsl(211, 100.00%, 43.30%)"
                  radius={[0, 0, 0, 0]}
                  maxBarSize={10}
                />
                <Bar
                  dataKey="capacity"
                  stackId="a"
                  fill="hsl(240 24% 92%)"
                  radius={[0, 0, 0, 0]}
                  maxBarSize={10}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
    )
}

