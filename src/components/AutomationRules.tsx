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
import { MinusIcon, PlusIcon, Trash2 } from "lucide-react"

type Rule = {
  id: string
  ruleName: string
  trigger: string
  action: string
  cloud: string
  status: "Active" | "Paused"
}

const initialRulesData: Rule[] = [
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

const getCloudDisplayName = (value: string): string => {
  const cloudMap: Record<string, string> = {
    aws: "AWS",
    azure: "Azure",
    gcp: "GCP",
    oracle: "Oracle Cloud",
    ibm: "IBM Cloud",
    alibaba: "Alibaba Cloud",
  }
  return cloudMap[value] || value
}

export default function AutomationRules() {
  const [showConfig, setShowConfig] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [rulesData, setRulesData] = useState<Rule[]>(initialRulesData)

  const handleSaveRule = (formData: {
    ruleName: string
    triggerType: string
    actionType: string
    cloudProvider: string
    schedule: string
  }) => {
    if (!formData.ruleName || !formData.triggerType || !formData.actionType || !formData.cloudProvider) {
      setError("Please fill in all required fields")
      return
    }

    // Clear any previous errors
    setError(null)

    const newRule: Rule = {
      id: Date.now().toString(),
      ruleName: formData.ruleName,
      trigger: formData.triggerType,
      action: formData.actionType,
      cloud: getCloudDisplayName(formData.cloudProvider),
      status: "Active",
    }

    setRulesData([...rulesData, newRule])
    setShowConfig(false)
  }

  const handleDeleteRule = (id: string) => {
    if (confirm("Are you sure you want to delete this rule?")) {
      setRulesData(rulesData.filter((rule) => rule.id !== id))
    }
  }

  return (
    <main className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h1 className="text-xl sm:text-2xl font-semibold">Automation Rules</h1>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>

      <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
        <div className="flex flex-wrap gap-3 sm:gap-4 flex-1">
          <Select>
            <SelectTrigger className="w-full sm:w-[150px]">
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
            <SelectTrigger className="w-full sm:w-[150px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="paused">Paused</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-full sm:w-[150px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="status">Status</SelectItem>
              <SelectItem value="cloud">Cloud</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
          <Select>
            <SelectTrigger className="w-full sm:w-[150px]">
              <SelectValue placeholder="Last 30 days" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
            </SelectContent>
          </Select>

          <Button 
            onClick={() => setShowConfig(!showConfig)}
            className="w-full sm:w-auto"
          >
            <span className="hidden sm:inline">
              {showConfig ? 'Hide Configuration' : 'Show Configuration'}
            </span>
            <span className="sm:hidden">
              {showConfig ? 'Hide' : 'Show'} Config
            </span>
            {showConfig ? <MinusIcon className="w-4 h-4 ml-2" /> : <PlusIcon className="w-4 h-4 ml-2" />}
          </Button>
        </div>
      </div>

      <div className={`grid grid-cols-1 ${showConfig ? 'lg:grid-cols-3' : 'lg:grid-cols-1'} gap-4 sm:gap-6`}>
        {/* Main Content */}
        <div className={`${showConfig ? 'lg:col-span-2' : ''} space-y-4`}>
          {/* Rules Table */}
          <Card className="shadow-none">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">Rules</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto -mx-4 sm:mx-0">
                <div className="inline-block min-w-full align-middle px-4 sm:px-0">
                  <table className="w-full min-w-[640px]">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-2 sm:px-4 font-medium text-sm">Rule Name</th>
                        <th className="text-left py-3 px-2 sm:px-4 font-medium text-sm">Trigger</th>
                        <th className="text-left py-3 px-2 sm:px-4 font-medium text-sm">Action</th>
                        <th className="text-left py-3 px-2 sm:px-4 font-medium text-sm">Cloud</th>
                        <th className="text-left py-3 px-2 sm:px-4 font-medium text-sm">Status</th>
                        <th className="text-center py-3 px-2 sm:px-4 font-medium text-sm">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rulesData.map((rule) => (
                        <tr key={rule.id} className="border-b">
                          <td className="py-3 px-2 sm:px-4 text-sm">{rule.ruleName}</td>
                          <td className="py-3 px-2 sm:px-4 text-sm">{rule.trigger}</td>
                          <td className="py-3 px-2 sm:px-4 text-sm">{rule.action}</td>
                          <td className="py-3 px-2 sm:px-4">
                            <Badge className={`${getCloudBadgeColor(rule.cloud)} pointer-events-none`}>
                              {rule.cloud}
                            </Badge>
                          </td>
                          <td className="py-3 px-2 sm:px-4">
                            <div className="flex items-center gap-2">
                              <div
                                className={`h-2 w-2 rounded-full ${
                                  rule.status === "Active"
                                    ? "bg-green-500"
                                    : "bg-orange-500"
                                }`}
                              />
                              <span className="text-sm">{rule.status}</span>
                            </div>
                          </td>
                          <td className="py-3 px-2 sm:px-4 text-center">
                            <Button
                              variant="ghost"
                              onClick={() => handleDeleteRule(rule.id)}
                              className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            > 
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground mt-4">
                Data last synced 2 mins ago
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Rule Configuration Sidebar */}
        {showConfig && (
          <div className="lg:col-span-1">
            <AutomationSideBar 
              showConfig={showConfig} 
              setShowConfig={setShowConfig}
              onSave={handleSaveRule}
            />
          </div>
        )}
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

