'use client'

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function AutomationSideBar() {
  const [formData, setFormData] = useState({
    ruleName: "",
    triggerType: "",
    actionType: "",
    cloudProvider: "",
    schedule: "",
  })
  return (
    <div className="lg:col-span-1">
    <Card>
      <CardHeader>
        <CardTitle>Rule Configuration</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-2 block">
            Rule Name
          </label>
          <Input
            placeholder="Enter rule name"
            value={formData.ruleName}
            onChange={(e) =>
              setFormData({ ...formData, ruleName: e.target.value })
            }
          />
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">
            Trigger Type
          </label>
          <Input
            placeholder="Select trigger type"
            value={formData.triggerType}
            onChange={(e) =>
              setFormData({ ...formData, triggerType: e.target.value })
            }
          />
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">
            Action Type
          </label>
          <Input
            placeholder="Select action type"
            value={formData.actionType}
            onChange={(e) =>
              setFormData({ ...formData, actionType: e.target.value })
            }
          />
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">
            Cloud Provider
          </label>
          <Input
            placeholder="Select cloud provider"
            value={formData.cloudProvider}
            onChange={(e) =>
              setFormData({
                ...formData,
                cloudProvider: e.target.value,
              })
            }
          />
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">
            Schedule <span className="text-muted-foreground">(Optional)</span>
          </label>
          <Input
            placeholder="Enter schedule"
            value={formData.schedule}
            onChange={(e) =>
              setFormData({ ...formData, schedule: e.target.value })
            }
          />
        </div>

        <div className="flex gap-3 pt-4">
          <Button
            variant="outline"
            className="flex-1"
          >
            Cancel
          </Button>
          <Button className="flex-1 bg-blue-700 hover:bg-blue-600">
            Save
          </Button>
        </div>
      </CardContent>
    </Card>
  </div>
  )
}