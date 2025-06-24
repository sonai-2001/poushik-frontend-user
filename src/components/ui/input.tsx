import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'flex h-10 w-full rounded-md border border-gray-300 bg-background px-3 py-2 text-sm shadow-sm ring-offset-background',
        'placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
        'transition-colors',
        className,
      )}
      {...props}
    />
  )
}

export { Input }
