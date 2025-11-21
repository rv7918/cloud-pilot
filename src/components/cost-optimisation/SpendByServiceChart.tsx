'use client'

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis } from "recharts"

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
  const [spendByServiceData, setSpendByServiceData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/spendByService")
        if (!response.ok) throw new Error("Failed to fetch data")
        const data = await response.json()
        setSpendByServiceData(data)
      } catch (error) {
        console.error("Error fetching spend by service:", error)
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
          <CardTitle>Spend by service</CardTitle>
        </CardHeader>
        <CardContent>Loading...</CardContent>
      </Card>
    )
  }

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

