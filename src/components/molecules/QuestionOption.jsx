import { cn } from "@/utils/cn"
import ApperIcon from "@/components/ApperIcon"

const QuestionOption = ({ 
  option, 
  label, 
  isSelected, 
  isCorrect, 
  isRevealed, 
  onClick, 
  className,
  ...props 
}) => {
  const getOptionState = () => {
    if (!isRevealed) {
      return isSelected ? "selected" : "default"
    }
    
    if (isCorrect) {
      return "correct"
    }
    
    if (isSelected && !isCorrect) {
      return "incorrect"
    }
    
    return "revealed"
  }

  const state = getOptionState()
  
  const stateStyles = {
    default: "bg-white border-gold/30 hover:border-saffron/50 hover:bg-cornsilk/30 text-saddle-brown",
    selected: "bg-gradient-to-r from-saffron/10 to-gold/10 border-saffron text-saddle-brown shadow-md",
    correct: "bg-gradient-to-r from-success/20 to-green-100 border-success text-success shadow-lg animate-diya-light",
    incorrect: "bg-gradient-to-r from-error/20 to-red-100 border-error text-error shadow-lg",
    revealed: "bg-gray-50 border-gray-200 text-gray-500"
  }

  const getIcon = () => {
    if (!isRevealed) {
      return isSelected ? "CheckCircle2" : "Circle"
    }
    
    if (isCorrect) {
      return "CheckCircle2"
    }
    
    if (isSelected && !isCorrect) {
      return "XCircle"
    }
    
    return "Circle"
  }

  const iconColors = {
    default: "text-gold/50",
    selected: "text-saffron",
    correct: "text-success",
    incorrect: "text-error",
    revealed: "text-gray-400"
  }

  return (
    <button
      onClick={onClick}
      disabled={isRevealed}
      className={cn(
        "w-full p-4 rounded-xl border-2 transition-all duration-300 text-left flex items-center space-x-4",
        "focus:outline-none focus:ring-2 focus:ring-saffron/30 focus:ring-offset-2",
        "transform hover:scale-[1.02] active:scale-[0.98]",
        stateStyles[state],
        isRevealed && "cursor-not-allowed",
        className
      )}
      {...props}
    >
      {/* Option Icon */}
      <div className="flex-shrink-0">
        <ApperIcon 
          name={getIcon()} 
          className={cn("w-6 h-6", iconColors[state])} 
        />
      </div>
      
      {/* Option Content */}
      <div className="flex-1">
        <div className="flex items-start space-x-3">
          {/* Option Label */}
          <span className={cn(
            "inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold font-vesper",
            state === "correct" && "bg-success text-white",
            state === "incorrect" && "bg-error text-white",
            state === "selected" && "bg-saffron text-white",
            (state === "default" || state === "revealed") && "bg-gold/20 text-saddle-brown"
          )}>
            {label}
          </span>
          
          {/* Option Text */}
          <div className="flex-1 font-hind">
            <p className={cn(
              "text-base leading-relaxed",
              (state === "correct" || state === "incorrect") && "font-medium"
            )}>
              {option}
            </p>
          </div>
        </div>
      </div>
      
      {/* Success/Error Feedback Icons */}
      {isRevealed && (
        <div className="flex-shrink-0">
          {isCorrect ? (
            <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center">
              <ApperIcon name="Check" className="w-5 h-5 text-white" />
            </div>
          ) : isSelected ? (
            <div className="w-8 h-8 bg-error rounded-full flex items-center justify-center">
              <ApperIcon name="X" className="w-5 h-5 text-white" />
            </div>
          ) : null}
        </div>
      )}
    </button>
  )
}

export default QuestionOption