import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {  Lightbulb, Bell } from "lucide-react"
import Header from "@/components/Header"
import CloudSpendCard from "@/components/CloudSpendCard"
import CloudSpendChart from "@/components/CloudSpendChart"
import Footer from "@/components/Footer"
import ActiveAlerts from "@/components/ActiveAlerts"
import { getCloudSpendData } from "./api/cloudMonthlySpend/route"
import { getCloudData } from "./api/cloudSpend/route"

export default async function Home() {
  const monthlySpendData = await getCloudSpendData()
  const cloudSpendData = await getCloudData()

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header />

      <main className="container mx-auto px-6 py-8 space-y-6">
        {/* Cloud Spend Cards */}
        <CloudSpendCard data={cloudSpendData} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chart Section */}
          <div className="lg:col-span-2 space-y-4">
            <CloudSpendChart data={monthlySpendData} />
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
        <ActiveAlerts />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
