import { cn } from "@/lib/utils"
import { HTMLAttributes } from "react"

export function Chip({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded px-2 py-1 text-xs font-medium",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}



