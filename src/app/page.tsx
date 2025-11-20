import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {  Lightbulb, Bell } from "lucide-react"
import Header from "./components/Header"
import CloudSpendCard from "./components/CloudSpendCard"
import CloudSpendChart from "./components/CloudSpendChart"
import Footer from "./components/Footer"
import ActiveAlerts from "./components/ActiveAlerts"
import { getCloudSpendData } from "./api/cloudMonthlySpend/route"

const cloudSpendData = [
  { name: "AWS", spend: 5420, trend: 99.8, color: "hsl(221.2 83.2% 53.3%)", bgColor: "#EFF6FF" },
  { name: "Azure", spend: 1340, trend: 54.8, color: "hsl(280 100% 70%)", bgColor: "#EEF2FF" },
  { name: "GCP", spend: 2940, trend: 64.8, color: "hsl(280 50% 50%)", bgColor: "#FAF5FF" },
  { name: "CPL", spend: 1025, trend: 99.8, color: "hsl(142.1 76.2% 36.3%)", bgColor: "#ECFDF5" },
]

export default async function Home() {
  const monthlySpendData = await getCloudSpendData()

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
