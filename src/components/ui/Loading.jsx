import { motion } from "framer-motion"
import { cn } from "@/utils/cn"
import ApperIcon from "@/components/ApperIcon"

const Loading = ({ message = "Loading...", variant = "default", className, ...props }) => {
  const variants = {
    default: "text-saffron",
    quiz: "text-gold",
    certificate: "text-saddle-brown"
  }
  
  return (
    <div className={cn("flex flex-col items-center justify-center p-8", className)} {...props}>
      {/* Animated Loading Icon */}
      <motion.div
        className="relative mb-6"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Outer Rotating Ring */}
        <motion.div
          className="w-16 h-16 border-4 border-gold/30 border-t-gold rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Inner Pulsing Icon */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-8 h-8 bg-gradient-to-br from-saffron to-gold rounded-full flex items-center justify-center">
            <ApperIcon name="Sparkles" className="w-4 h-4 text-white" />
          </div>
        </motion.div>
      </motion.div>
      
      {/* Loading Text */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <div className={cn("text-lg font-semibold font-vesper mb-2", variants[variant])}>
          {message}
        </div>
        
        {/* Animated Dots */}
        <div className="flex justify-center space-x-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-current rounded-full opacity-60"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
        
        {/* Sanskrit Blessing */}
        <motion.div
          className="mt-4 text-sm text-saddle-brown/60 font-hind italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          धैर्यं सर्वार्थ साधनम् - Patience leads to success
        </motion.div>
      </motion.div>
      
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10 opacity-5">
        <div className="lotus-pattern w-full h-full"></div>
      </div>
    </div>
  )
}

export default Loading