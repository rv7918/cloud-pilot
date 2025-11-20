'use client'

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import AutomationSideBar from "@/components/AutomationSideBar"
import { MinusIcon, PlusIcon } from "lucide-react"

type Rule = {
  id: string
  ruleName: string
  trigger: string
  action: string
  cloud: string
  status: "Active" | "Paused"
}

const rulesData: Rule[] = [
  {
    id: "1",
    ruleName: "Auto-Scale EC2",
    trigger: "CPU > 70%",
    action: "Add Instance",
    cloud: "AWS",
    status: "Active",
  },
  {
    id: "2",
    ruleName: "Backup SQL DB",
    trigger: "2:00 AM Daily",
    action: "Copy to Blob",
    cloud: "Azure",
    status: "Active",
  },
  {
    id: "3",
    ruleName: "Budget Alert",
    trigger: "Spend > $10K",
    action: "Send Slack / mail",
    cloud: "GCP",
    status: "Paused",
  },
  {
    id: "4",
    ruleName: "Storage Alert",
    trigger: "Storage < 20%",
    action: "Send Slack / mail",
    cloud: "Azure",
    status: "Paused",
  },
]

const getCloudBadgeColor = (cloud: string) => {
  switch (cloud) {
    case "AWS":
      return "bg-blue-100 text-blue-700"
    case "Azure":
      return "bg-blue-100 text-blue-700"
    case "GCP":
      return "bg-purple-100 text-purple-700"
    default:
      return "bg-gray-100 text-gray-700"
  }
}

export default function AutomationRules() {
  const [showConfig, setShowConfig] = useState(true)

  return (
    <main className="container mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Automation Rules</h1>
      </div>

      <div className="flex flex-wrap items-center gap-4 mb-4">
            <Select>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Cloud Provider" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="aws">AWS</SelectItem>
                <SelectItem value="azure">Azure</SelectItem>
                <SelectItem value="gcp">GCP</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="paused">Paused</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="status">Status</SelectItem>
                <SelectItem value="cloud">Cloud</SelectItem>
              </SelectContent>
            </Select>

            <div className="ml-auto flex items-center gap-4">
              <Select>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Last 30 days" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">Last 7 days</SelectItem>
                  <SelectItem value="30">Last 30 days</SelectItem>
                  <SelectItem value="90">Last 90 days</SelectItem>
                </SelectContent>
              </Select>

              <Button onClick={() => setShowConfig(!showConfig)}>
                {showConfig ? 'Hide Configuration' : 'Show Configuration'}
                {showConfig ? <MinusIcon className="w-4 h-4" /> : <PlusIcon className="w-4 h-4" />}
              </Button>
            </div>
          </div>
      <div className={`grid grid-cols-2 ${showConfig ? 'lg:grid-cols-3' : 'lg:grid-cols-2'} gap-6`}>
        {/* Main Content */}
        
        <div className="lg:col-span-2 space-y-4">
          {/* Filters */}
         

          {/* Rules Table */}
          <Card>
            <CardHeader>
              <CardTitle>Rules</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">Rule Name</th>
                      <th className="text-left py-3 px-4 font-medium">Trigger</th>
                      <th className="text-left py-3 px-4 font-medium">Action</th>
                      <th className="text-left py-3 px-4 font-medium">Cloud</th>
                      <th className="text-left py-3 px-4 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rulesData.map((rule) => (
                      <tr key={rule.id} className="border-b">
                        <td className="py-3 px-4">{rule.ruleName}</td>
                        <td className="py-3 px-4">{rule.trigger}</td>
                        <td className="py-3 px-4">{rule.action}</td>
                        <td className="py-3 px-4">
                          <Badge className={getCloudBadgeColor(rule.cloud)}>
                            {rule.cloud}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <div
                              className={`h-2 w-2 rounded-full ${
                                rule.status === "Active"
                                  ? "bg-green-500"
                                  : "bg-orange-500"
                              }`}
                            />
                            <span>{rule.status}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                Data last synced 2 mins ago
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Rule Configuration Sidebar */}
        <AutomationSideBar showConfig={showConfig} setShowConfig={setShowConfig}/>
        
      </div>

      <div className="mt-8 text-right">
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

