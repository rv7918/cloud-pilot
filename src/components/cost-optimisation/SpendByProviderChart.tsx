'use client'

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { AreaChart, Area, XAxis, YAxis } from "recharts"

const chartConfig = {
  spend: {
    label: "Spend",
    color: "hsl(221 83% 53%)",
  },
}

export default function SpendByProviderChart() {
  const [spendByProviderData, setSpendByProviderData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/spendByProvider")
        if (!response.ok) throw new Error("Failed to fetch data")
        const data = await response.json()
        setSpendByProviderData(data)
      } catch (error) {
        console.error("Error fetching spend by provider:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) {
    return (
      <Card className="shadow-none">
        <CardHeader>
          <CardTitle>Spend by provider</CardTitle>
        </CardHeader>
        <CardContent>Loading...</CardContent>
      </Card>
    )
  }

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

