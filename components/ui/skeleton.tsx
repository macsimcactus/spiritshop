import type * as React from "react"
import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("relative overflow-hidden bg-white/5 rounded-md", className)} {...props}>
      <div className="shimmer-overlay"></div>
    </div>
  )
}

export { Skeleton }
