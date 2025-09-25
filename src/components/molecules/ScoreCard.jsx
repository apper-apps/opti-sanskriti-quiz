import { motion } from "framer-motion"
import { cn } from "@/utils/cn"
import ApperIcon from "@/components/ApperIcon"
import Card from "@/components/atoms/Card"
import Badge from "@/components/atoms/Badge"

const ScoreCard = ({ score, totalQuestions, timeTaken, rank, className, ...props }) => {
  const percentage = Math.round((score / totalQuestions) * 100)
  const isExcellent = percentage >= 80
  const isGood = percentage >= 60
  
  const getPerformanceLevel = () => {
    if (percentage >= 90) return { level: "Outstanding", color: "success", icon: "Crown" }
    if (percentage >= 80) return { level: "Excellent", color: "default", icon: "Award" }
    if (percentage >= 60) return { level: "Good", color: "secondary", icon: "ThumbsUp" }
    return { level: "Keep Practicing", color: "outline", icon: "Target" }
  }
  
  const performance = getPerformanceLevel()
  
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}m ${remainingSeconds}s`
  }
  
  return (
    <Card variant="ornate" className={cn("p-8 text-center", className)} {...props}>
      {/* Decorative Header */}
      <div className="mb-6">
        <div className="flex justify-center mb-4">
          <div className="w-20 h-20 bg-gradient-to-br from-gold via-saffron to-gold rounded-full flex items-center justify-center shadow-xl">
            <ApperIcon name={performance.icon} className="w-10 h-10 text-white" />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold font-vesper text-saddle-brown mb-2 paisley-decoration">
          Quiz Completed!
        </h2>
        
        <Badge variant={performance.color} className="text-lg px-4 py-2">
          {performance.level}
        </Badge>
      </div>
      
      {/* Score Display */}
      <motion.div 
        className="mb-8"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="text-6xl font-bold font-vesper bg-gradient-to-r from-saffron to-gold bg-clip-text text-transparent mb-2">
          {score}/{totalQuestions}
        </div>
        <div className="text-3xl font-semibold text-gold mb-1">
          {percentage}%
        </div>
        <div className="text-saddle-brown/70 font-hind">
          Correct Answers
        </div>
      </motion.div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* Time Taken */}
        <motion.div 
          className="text-center p-4 bg-white/50 rounded-xl border border-gold/20"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <ApperIcon name="Clock" className="w-8 h-8 text-saffron mx-auto mb-2" />
          <div className="text-2xl font-bold text-saddle-brown font-vesper">
            {formatTime(timeTaken)}
          </div>
          <div className="text-sm text-saddle-brown/70 font-hind">
            Time Taken
          </div>
        </motion.div>
        
        {/* Weekly Rank */}
        <motion.div 
          className="text-center p-4 bg-white/50 rounded-xl border border-gold/20"
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <ApperIcon name="Trophy" className="w-8 h-8 text-gold mx-auto mb-2" />
          <div className="text-2xl font-bold text-saddle-brown font-vesper">
            #{rank || "N/A"}
          </div>
          <div className="text-sm text-saddle-brown/70 font-hind">
            Weekly Rank
          </div>
        </motion.div>
      </div>
      
      {/* Motivational Message */}
      <motion.div 
        className="p-4 bg-gradient-to-r from-cornsilk to-floral-white rounded-xl border border-gold/30"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.5 }}
      >
        <div className="text-center">
          <div className="text-lg font-medium text-saddle-brown font-vesper mb-2">
            {isExcellent ? "🎉 Excellent knowledge of our sacred texts!" :
             isGood ? "📚 Good understanding! Keep learning!" :
             "🙏 Every step in learning is blessed!"}
          </div>
          <div className="text-sm text-saddle-brown/70 font-hind italic">
            "विद्या ददाति विनयं" - Knowledge brings humility
          </div>
        </div>
      </motion.div>
    </Card>
  )
}

export default ScoreCard