'use client'

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, TrendingDown } from "lucide-react"

type MetricCard = {
  id: string
  label: string
  value: string
  trend: string
  trendColor: string
  bgColor: string
  borderColor: string
  iconType: string
  valueFontWeight?: string
}

export default function CostMetricsCards() {
  const [metricsData, setMetricsData] = useState<MetricCard[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchMetrics() {
      try {
        const response = await fetch("/api/costMetrics")
        if (!response.ok) throw new Error("Failed to fetch metrics")
        const data = await response.json()
        setMetricsData(data)
      } catch (error) {
        console.error("Error fetching cost metrics:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchMetrics()
  }, [])

  const getIcon = (iconType: string) => {
    if (iconType === "TrendingUp") {
      return <TrendingUp className="h-4 w-4" />
    }
    return <TrendingDown className="h-4 w-4" />
  }

  if (loading) {
    return <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">Loading...</div>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {metricsData.map((metric) => (
        <Card
          key={metric.id}
          className={`${metric.bgColor} ${metric.borderColor} shadow-none`}
        >
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground mb-2">{metric.label}</p>
            <p className={`text-3xl ${metric.valueFontWeight || 'font-bold'} mb-2`}>{metric.value}</p>
            <div className={`flex items-center gap-1 text-sm ${metric.trendColor}`}>
              {getIcon(metric.iconType)}
              <span>{metric.trend}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

