'use client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Cloud, CheckCircle2, TrendingUp} from "lucide-react";



export default function CloudSpendCard(props: {
    data: any; 
}) {

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {props.data.map((provider: { name: string, spend: number, trend: number, color: string, bgColor: string }) => (
            <Card key={provider.name} className="relative overflow-hidden" style={{ backgroundColor: provider.bgColor, boxShadow: "none" }}>
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
  )
}