import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { cn } from "@/utils/cn"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"
import Card from "@/components/atoms/Card"

const Empty = ({ 
  title = "Nothing here yet", 
  message = "Be the first to participate!",
  actionText = "Get Started",
  actionPath = "/entry",
  icon = "BookOpen",
  className, 
  ...props 
}) => {
  const navigate = useNavigate()
  
  const handleAction = () => {
    if (actionPath) {
      navigate(actionPath)
    }
  }
  
  return (
    <motion.div
      className={cn("flex items-center justify-center p-8", className)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      {...props}
    >
      <Card className="p-8 text-center max-w-md w-full">
        {/* Empty State Icon */}
        <motion.div
          className="mb-6"
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.5, delay: 0.1, type: "spring" }}
        >
          <div className="w-20 h-20 bg-gradient-to-br from-gold/20 to-saffron/20 rounded-full flex items-center justify-center mx-auto border-2 border-gold/30">
            <ApperIcon name={icon} className="w-10 h-10 text-saffron" />
          </div>
        </motion.div>
        
        {/* Empty State Content */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <h3 className="text-2xl font-bold font-vesper text-saddle-brown mb-3">
            {title}
          </h3>
          
          <p className="text-saddle-brown/70 font-hind leading-relaxed mb-4">
            {message}
          </p>
          
          {/* Encouraging Message */}
          <div className="p-4 bg-gradient-to-r from-cornsilk to-floral-white rounded-lg border border-gold/20">
            <div className="sanskrit-text text-saffron font-vesper mb-1">
              प्रारम्भः सर्वकार्याणाम्
            </div>
            <div className="text-sm text-saddle-brown/60 font-hind italic">
              The beginning is the most important part of every endeavor
            </div>
          </div>
        </motion.div>
        
        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <Button
            onClick={handleAction}
            variant="primary"
            size="lg"
            className="w-full flex items-center justify-center space-x-2 mb-4"
          >
            <ApperIcon name="Play" className="w-5 h-5" />
            <span>{actionText}</span>
          </Button>
          
          {/* Secondary Action */}
          <Button
            onClick={() => navigate("/")}
            variant="ghost"
            size="md"
            className="flex items-center justify-center space-x-2 mx-auto"
          >
            <ApperIcon name="Home" className="w-4 h-4" />
            <span>Back to Home</span>
          </Button>
        </motion.div>
        
        {/* Decorative Elements */}
        <motion.div
          className="mt-6 flex justify-center space-x-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {["Star", "Sparkles", "Star"].map((iconName, index) => (
            <motion.div
              key={index}
              className="w-6 h-6 text-gold/40"
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 10, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                delay: index * 0.3
              }}
            >
              <ApperIcon name={iconName} className="w-full h-full" />
            </motion.div>
          ))}
        </motion.div>
      </Card>
    </motion.div>
  )
}

export default Empty