'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

type Recommendation = {
  id: string
  title: string
  savings: string
  bgColor: string
}

const recommendations: Recommendation[] = [
  {
    id: "1",
    title: "Idle EC2 instance detected",
    savings: "$240 / mo",
    bgColor: "#EFF6FF",
  },
  {
    id: "2",
    title: "Idle S3 instance detected",
    savings: "$249 / mo",
    bgColor: "#FAF5FF",
  },
  {
    id: "3",
    title: "Idle DB instance detected",
    savings: "$740 / mo",
    bgColor: "#ECFDF5",
  },
  {
    id: "4",
    title: "Idle SQL instance detected",
    savings: "$740 / mo",
    bgColor: "#FEFCE8",
  },
]

export default function RecommendationsList() {
  return (
    <Card className="shadow-none">
      <CardHeader>
        <CardTitle>CloudPilot Recommendations</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 lg:columns-2">
          {recommendations.map((rec) => (
            <div
              key={rec.id}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-lg border"
              style={{ backgroundColor: rec.bgColor }}
            >
              <div>
                <h3 className="font-medium mb-1">{rec.title}</h3>
                <p className="text-sm text-muted-foreground">Save {rec.savings}</p>
              </div>
              <Button className="bg-blue-700 hover:bg-blue-600 text-white w-full sm:w-auto">
                Apply Fix
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

