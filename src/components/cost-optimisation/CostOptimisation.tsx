'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import CostMetricsCards from "@/components/cost-optimisation/CostMetricsCards"
import SpendByServiceChart from "@/components/cost-optimisation/SpendByServiceChart"
import SpendByProviderChart from "@/components/cost-optimisation/SpendByProviderChart"
import RecommendationsList from "@/components/cost-optimisation/RecommendationsList"

export default function CostOptimisation() {
  return (
    <main className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-4">
        <h1 className="text-xl sm:text-2xl font-semibold">Cost Optimisation</h1>
        <Select defaultValue="30">
          <SelectTrigger className="w-full sm:w-[150px]">
            <SelectValue placeholder="Last 30 days" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7">Last 7 days</SelectItem>
            <SelectItem value="30">Last 30 days</SelectItem>
            <SelectItem value="90">Last 90 days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <CostMetricsCards />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <SpendByServiceChart />
        <SpendByProviderChart />
      </div>

      <RecommendationsList />

      <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="text-xs sm:text-sm text-muted-foreground">
          Data last synced 2 mins ago
        </p>
        <a
          href="#"
          className="text-sm text-primary hover:underline"
        >
          View execution logs
        </a>
      </div>
    </main>
  )
}

