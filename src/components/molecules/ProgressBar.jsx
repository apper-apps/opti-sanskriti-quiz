import { cn } from "@/utils/cn"

const ProgressBar = ({ current, total, className, ...props }) => {
  const percentage = (current / total) * 100
  
  return (
    <div className={cn("w-full", className)} {...props}>
      {/* Progress Info */}
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-saddle-brown font-hind">
          Question {current} of {total}
        </span>
        <span className="text-sm font-medium text-saffron font-vesper">
          {Math.round(percentage)}%
        </span>
      </div>
      
      {/* Progress Track */}
      <div className="w-full bg-gold/20 rounded-full h-3 shadow-inner">
        <div 
          className="bg-gradient-to-r from-saffron to-gold h-3 rounded-full transition-all duration-500 shadow-sm"
          style={{ width: `${percentage}%` }}
        >
          {/* Shine effect */}
          <div className="h-full w-full bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full"></div>
        </div>
      </div>
      
      {/* Step Indicators */}
      <div className="flex justify-between mt-2">
        {Array.from({ length: total }, (_, index) => (
          <div
            key={index}
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-300",
              index < current 
                ? "bg-gradient-to-r from-saffron to-gold shadow-sm" 
                : "bg-gold/30"
            )}
          />
        ))}
      </div>
    </div>
  )
}

export default ProgressBar