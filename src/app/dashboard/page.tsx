'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, XAxis, YAxis } from "recharts"
import { Cloud, CheckCircle2, Lightbulb, Bell, TrendingUp, AlertTriangle } from "lucide-react"

const cloudSpendData = [
  { name: "AWS", spend: 5420, trend: 99.8, color: "hsl(221.2 83.2% 53.3%)" },
  { name: "Azure", spend: 1340, trend: 54.8, color: "hsl(280 100% 70%)" },
  { name: "GCP", spend: 2940, trend: 64.8, color: "hsl(280 50% 50%)" },
  { name: "CPL", spend: 1025, trend: 99.8, color: "hsl(142.1 76.2% 36.3%)" },
]

const monthlySpendData = [
  { month: "Jan", spend: 1200, capacity: 6000 },
  { month: "Feb", spend: 1800, capacity: 6000 },
  { month: "Mar", spend: 2700, capacity: 6000 },
  { month: "Apr", spend: 500, capacity: 6000 },
  { month: "May", spend: 1500, capacity: 6000 },
  { month: "Jun", spend: 2700, capacity: 6000 },
  { month: "Jul", spend: 2000, capacity: 6000 },
  { month: "Aug", spend: 1600, capacity: 6000 },
  { month: "Sep", spend: 1900, capacity: 6000 },
  { month: "Oct", spend: 500, capacity: 6000 },
  { month: "Nov", spend: 1400, capacity: 6000 },
  { month: "Dec", spend: 1800, capacity: 6000 },
]

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

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primary">CloudPilot</h1>
          <nav className="flex gap-6">
            <a href="#" className="text-primary font-medium">Overview</a>
            <a href="#" className="text-muted-foreground hover:text-foreground">Cost Optimisation</a>
            <a href="#" className="text-muted-foreground hover:text-foreground">Automation</a>
            <a href="#" className="text-muted-foreground hover:text-foreground">Settings</a>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8 space-y-6">
        {/* Cloud Spend Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {cloudSpendData.map((provider) => (
            <Card key={provider.name} className="relative overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Cloud className="h-5 w-5" style={{ color: provider.color }} />
                    <CardTitle className="text-lg">{provider.name}</CardTitle>
                  </div>
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  <p className="text-3xl font-bold">${provider.spend.toLocaleString()}</p>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <span>{provider.trend}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chart Section */}
          <div className="lg:col-span-2 space-y-4">
            <Card>
            <div className="flex items-center justify-between p-5">
              <h2 className="text-xl font-semibold">Total Cloud Spend Over time</h2>
              <a href="#" className="text-primary text-sm hover:underline">Agent Summary</a>
            </div>
              <CardContent className="pt-6">
                <ChartContainer config={chartConfig} className="h-[300px] w-full">
                  <BarChart 
                    data={monthlySpendData}
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
          </div>

          {/* Insights and Alerts Sidebar */}
          <div className="space-y-4">
            {/* Agent Insights */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-yellow-500" />
                  <CardTitle className="text-lg">Agent Insights</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm">Compute Spend trend 1%</p>
                <p className="text-sm text-muted-foreground">Consider changing instance sizing</p>
              </CardContent>
            </Card>

            {/* Active Alerts */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-red-500" />
                  <CardTitle className="text-lg">Active Alerts</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-red-500" />
                  <p className="text-sm">CPU Spike in EC2</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-orange-500" />
                  <p className="text-sm">Network Latency in us-west</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-yellow-500" />
                  <p className="text-sm">High storage cost on Data Lake</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Active Alerts Section */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold">Active alerts</h3>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <TrendingUp className="h-4 w-4 text-primary" />
                    <span>5 additional alerts</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-3 bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800 rounded-md">
                  <AlertTriangle className="h-5 w-5 text-orange-500" />
                  <p className="text-sm">
                    Spend trending +12%. Consider reducing active instances.
                  </p>
                </div>
              </div>
              <Button>View Report</Button>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="border-t mt-8">
        <div className="container mx-auto px-6 py-4">
          <p className="text-sm text-muted-foreground">Data last synced 2 mins ago</p>
        </div>
      </footer>
    </div>
  )
}
