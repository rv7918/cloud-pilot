'use client'

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

type Recommendation = {
  id: string
  title: string
  savings: string
  bgColor: string
}

export default function RecommendationsList() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchRecommendations() {
      try {
        const response = await fetch("/api/recommendations")
        if (!response.ok) throw new Error("Failed to fetch recommendations")
        const data = await response.json()
        setRecommendations(data)
      } catch (error) {
        console.error("Error fetching recommendations:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchRecommendations()
  }, [])

  if (loading) {
    return (
      <Card className="shadow-none">
        <CardHeader>
          <CardTitle>CloudPilot Recommendations</CardTitle>
        </CardHeader>
        <CardContent>Loading...</CardContent>
      </Card>
    )
  }

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

