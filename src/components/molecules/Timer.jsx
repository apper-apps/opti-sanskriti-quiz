import { useState, useEffect } from "react"
import { cn } from "@/utils/cn"
import { formatTime } from "@/utils/dateHelpers"
import ApperIcon from "@/components/ApperIcon"

const Timer = ({ initialTime = 300, onTimeUp, className, ...props }) => {
  const [timeLeft, setTimeLeft] = useState(initialTime)
  const [isUrgent, setIsUrgent] = useState(false)

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp?.()
      return
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        const newTime = prev - 1
        setIsUrgent(newTime <= 60) // Last minute is urgent
        return newTime
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft, onTimeUp])

  const progressPercentage = (timeLeft / initialTime) * 100
  const circumference = 2 * Math.PI * 45 // radius = 45
  const strokeDasharray = circumference
  const strokeDashoffset = circumference - (progressPercentage / 100) * circumference

  return (
    <div className={cn("flex items-center space-x-3", className)} {...props}>
      {/* Circular Progress Timer */}
      <div className="relative">
        <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="#FFD700"
            strokeWidth="3"
            fill="none"
            opacity="0.3"
          />
          {/* Progress circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke={isUrgent ? "#DC143C" : "#FF6B35"}
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-500"
            style={{
              filter: isUrgent ? "drop-shadow(0 0 8px #DC143C)" : "drop-shadow(0 0 6px #FF6B35)"
            }}
          />
        </svg>
        
        {/* Timer icon in center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <ApperIcon 
            name={isUrgent ? "AlertCircle" : "Clock"} 
            className={cn(
              "w-6 h-6",
              isUrgent ? "text-error animate-pulse" : "text-saffron"
            )} 
          />
        </div>
      </div>

      {/* Time display */}
      <div className="text-center">
        <div 
          className={cn(
            "text-2xl font-bold font-vesper transition-all duration-300",
            isUrgent ? "text-error timer-urgent" : "text-saddle-brown"
          )}
        >
          {formatTime(timeLeft)}
        </div>
        <div className="text-sm text-saddle-brown/70 font-hind">
          {isUrgent ? "Time Running Out!" : "Time Remaining"}
        </div>
      </div>
    </div>
  )
}

export default Timer