'use client'

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from "react"

type FormData = {
  ruleName: string
  triggerType: string
  actionType: string
  cloudProvider: string
  schedule: string
}

export default function AutomationSideBar({ 
  showConfig, 
  setShowConfig,
  onSave 
}: { 
  showConfig: boolean
  setShowConfig: (show: boolean) => void
  onSave: (formData: FormData) => void
}) {
  const [formData, setFormData] = useState<FormData>({
    ruleName: "",
    triggerType: "",
    actionType: "",
    cloudProvider: "",
    schedule: "",
  })

  const handleSave = () => {
    onSave(formData)
    // Reset form after saving
    setFormData({
      ruleName: "",
      triggerType: "",
      actionType: "",
      cloudProvider: "",
      schedule: "",
    })
  }

  const handleCancel = () => {
    setShowConfig(false)
    // Reset form on cancel
    setFormData({
      ruleName: "",
      triggerType: "",
      actionType: "",
      cloudProvider: "",
      schedule: "",
    })
  }
  return (
    <>
    {showConfig && (
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
            <Select
              value={formData.cloudProvider}
              onValueChange={(value) =>
                setFormData({
                  ...formData,
                  cloudProvider: value,
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select cloud provider" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="aws">AWS</SelectItem>
                <SelectItem value="azure">Azure</SelectItem>
                <SelectItem value="gcp">GCP</SelectItem>
                <SelectItem value="oracle">Oracle Cloud</SelectItem>
                <SelectItem value="ibm">IBM Cloud</SelectItem>
                <SelectItem value="alibaba">Alibaba Cloud</SelectItem>
              </SelectContent>
            </Select>
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
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button 
            className="flex-1 bg-blue-700 hover:bg-blue-600"
            onClick={handleSave}
          >
            Save
          </Button>
        </div>
      </CardContent>
    </Card>
  </div>
  )}
  </>
  )
}