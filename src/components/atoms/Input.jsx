import { forwardRef } from "react"
import { cn } from "@/utils/cn"

const Input = forwardRef(({ className, type = "text", label, error, ...props }, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-saddle-brown mb-2 sanskrit-text">
          {label}
        </label>
      )}
      <input
        type={type}
        ref={ref}
        className={cn(
          "w-full px-4 py-3 bg-white border-2 rounded-lg text-saddle-brown placeholder-saddle-brown/50 transition-all duration-200",
          "focus:border-saffron focus:ring-2 focus:ring-saffron/20 focus:outline-none",
          "hover:border-gold/50",
          error && "border-error focus:border-error focus:ring-error/20",
          className
        )}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-error font-medium">{error}</p>
      )}
    </div>
  )
})

Input.displayName = "Input"

export default Input