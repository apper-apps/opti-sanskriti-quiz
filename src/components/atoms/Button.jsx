import { forwardRef } from "react"
import { cn } from "@/utils/cn"

const Button = forwardRef(({ className, variant = "primary", size = "md", children, ...props }, ref) => {
  const baseClasses = "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
  
  const variants = {
    primary: "bg-gradient-to-r from-saffron to-gold text-white hover:from-gold hover:to-saffron focus:ring-saffron shadow-lg hover:shadow-xl transform hover:scale-105",
    secondary: "bg-gradient-to-r from-saddle-brown to-saffron text-white hover:from-saffron hover:to-saddle-brown focus:ring-saddle-brown shadow-md hover:shadow-lg transform hover:scale-105",
    outline: "border-2 border-saffron text-saffron hover:bg-saffron hover:text-white focus:ring-saffron",
    ghost: "text-saddle-brown hover:bg-cornsilk focus:ring-saddle-brown",
    success: "bg-gradient-to-r from-success to-green-600 text-white hover:from-green-600 hover:to-success focus:ring-success shadow-lg hover:shadow-xl",
    danger: "bg-gradient-to-r from-error to-red-600 text-white hover:from-red-600 hover:to-error focus:ring-error shadow-lg hover:shadow-xl"
  }
  
  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
    xl: "px-8 py-4 text-xl"
  }
  
  return (
    <button
      ref={ref}
      className={cn(
        baseClasses,
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
})

Button.displayName = "Button"

export default Button