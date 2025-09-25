import { forwardRef } from "react"
import { cn } from "@/utils/cn"

const Badge = forwardRef(({ className, variant = "default", children, ...props }, ref) => {
  const baseClasses = "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
  
  const variants = {
    default: "bg-gradient-to-r from-saffron to-gold text-white",
    secondary: "bg-gradient-to-r from-saddle-brown to-saffron text-white",
    success: "bg-gradient-to-r from-success to-green-600 text-white",
    warning: "bg-gradient-to-r from-warning to-yellow-500 text-white",
    error: "bg-gradient-to-r from-error to-red-600 text-white",
    outline: "border-2 border-saffron text-saffron bg-white"
  }
  
  return (
    <span
      ref={ref}
      className={cn(
        baseClasses,
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
})

Badge.displayName = "Badge"

export default Badge