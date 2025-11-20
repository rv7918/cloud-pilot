'use client';

import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ActiveAlerts() {
  return (
     <Card>
     <CardContent className="pt-6">
       <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-10">
         <div className="space-y-2 flex-1">
           <div className="flex flex-wrap items-center gap-2">
             <h3 className="text-lg font-semibold">Active alerts</h3>
             <div className="flex items-center gap-1 text-sm text-muted-foreground">
               <TrendingUp className="h-4 w-4 text-primary" />
               <span>5 additional alerts</span>
             </div>
           </div>
           <div className="flex items-center gap-2 p-3 bg-orange bg-orange-50 border border-orange-200 dark:border-orange-800 rounded-md">
             <AlertTriangle className="h-5 w-5 text-orange-500" />
             <p className="text-sm">
               Spend trending +12%. Consider reducing active instances.
             </p>
           </div>
         </div>
         <Button className="bg-blue-700 text-white hover:bg-blue-500 w-full sm:w-auto ">View Report</Button>
       </div>
     </CardContent>
   </Card>
  )
}

