import { motion } from "framer-motion"
import { cn } from "@/utils/cn"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"
import Card from "@/components/atoms/Card"

const Error = ({ 
  message = "Something went wrong", 
  onRetry, 
  showRetry = true,
  className, 
  ...props 
}) => {
  return (
    <motion.div
      className={cn("flex items-center justify-center p-8", className)}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      {...props}
    >
      <Card className="p-8 text-center max-w-md w-full">
        {/* Error Icon */}
        <motion.div
          className="mb-6"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="w-16 h-16 bg-gradient-to-br from-error to-red-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
            <ApperIcon name="AlertTriangle" className="w-8 h-8 text-white" />
          </div>
        </motion.div>
        
        {/* Error Content */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <h3 className="text-xl font-bold font-vesper text-saddle-brown mb-3">
            Oops! Something went wrong
          </h3>
          
          <p className="text-saddle-brown/70 font-hind leading-relaxed mb-4">
            {message}
          </p>
          
          {/* Sanskrit Wisdom */}
          <div className="p-4 bg-gradient-to-r from-cornsilk to-floral-white rounded-lg border border-gold/20">
            <div className="sanskrit-text text-saddle-brown font-vesper mb-1">
              विपत्तिकाले मर्यादा रक्षति रक्षितः
            </div>
            <div className="text-sm text-saddle-brown/60 font-hind italic">
              In times of trouble, patience protects those who are patient
            </div>
          </div>
        </motion.div>
        
        {/* Action Buttons */}
        {showRetry && (
          <motion.div
            className="space-y-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            {onRetry && (
              <Button
                onClick={onRetry}
                variant="primary"
                size="lg"
                className="w-full flex items-center justify-center space-x-2"
              >
                <ApperIcon name="RotateCcw" className="w-5 h-5" />
                <span>Try Again</span>
              </Button>
            )}
            
            <Button
              onClick={() => window.location.href = "/"}
              variant="outline"
              size="lg"
              className="w-full flex items-center justify-center space-x-2"
            >
              <ApperIcon name="Home" className="w-5 h-5" />
              <span>Go Home</span>
            </Button>
          </motion.div>
        )}
        
        {/* Help Text */}
        <motion.div
          className="mt-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p className="text-sm text-saddle-brown/50 font-hind">
            If the problem persists, please refresh the page or try again later.
          </p>
        </motion.div>
      </Card>
    </motion.div>
  )
}

export default Error