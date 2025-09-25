import { forwardRef } from "react"
import { cn } from "@/utils/cn"

const Card = forwardRef(({ className, variant = "default", children, ...props }, ref) => {
  const baseClasses = "rounded-xl border transition-all duration-200"
  
  const variants = {
    default: "bg-white border-gold/20 shadow-lg hover:shadow-xl",
    ornate: "bg-gradient-to-br from-white to-cornsilk border-2 border-gold/30 shadow-xl lotus-pattern",
    certificate: "bg-gradient-to-br from-floral-white to-cornsilk border-4 border-gold certificate-bg shadow-2xl",
    quiz: "bg-white/90 backdrop-blur-sm border-saffron/20 shadow-lg hover:shadow-xl hover:bg-white/95"
  }
  
  return (
    <div
      ref={ref}
      className={cn(
        baseClasses,
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
})

Card.displayName = "Card"

export default Card