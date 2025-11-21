'use client'

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
  icon: React.ReactNode
  valueFontWeight?: string
}

const metricsData: MetricCard[] = [
  {
    id: "1",
    label: "Total Monthly Spend",
    value: "$12,420",
    trend: "99.8%",
    trendColor: "text-green-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-100",
    icon: <TrendingUp className="h-4 w-4" />,
    valueFontWeight: "font-medium",
  },
  {
    id: "2",
    label: "Potential savings",
    value: "$3,220",
    trend: "99.8%",
    trendColor: "text-green-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-100",
    icon: <TrendingUp className="h-4 w-4" />,
    valueFontWeight: "font-medium",
  },
  {
    id: "3",
    label: "Current Budget used",
    value: "80%",
    trend: "50.8%",
    trendColor: "text-red-600",
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-100",
    icon: <TrendingDown className="h-4 w-4" />,
    valueFontWeight: "font-medium",
  },
]

export default function CostMetricsCards() {
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
              {metric.icon}
              <span>{metric.trend}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

