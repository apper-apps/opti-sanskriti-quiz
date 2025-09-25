import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { toast } from "react-toastify"
import { getCurrentWeek } from "@/utils/dateHelpers"
import userService from "@/services/api/userService"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"
import Input from "@/components/atoms/Input"
import Card from "@/components/atoms/Card"
import Loading from "@/components/ui/Loading"

const UserEntry = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: ""
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const currentWeek = getCurrentWeek()
  
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }))
    }
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      // Validate form data
      const validation = userService.validateUserData(formData)
      if (!validation.isValid) {
        const errorObj = {}
        validation.errors.forEach((error, index) => {
          if (error.includes("Name")) errorObj.name = error
          if (error.includes("mobile")) errorObj.mobile = error
        })
        setErrors(errorObj)
        setIsLoading(false)
        return
      }
      
      // Create or find user
      const user = await userService.createUser({
        name: formData.name.trim(),
        mobile: formData.mobile.trim()
      })
      
      // Store user data in sessionStorage for quiz
      sessionStorage.setItem("currentUser", JSON.stringify(user))
      
      toast.success(`Welcome ${user.name}! Let's begin the quiz! 🎉`)
      navigate("/quiz")
      
    } catch (error) {
      console.error("Error creating user:", error)
      toast.error("Failed to start quiz. Please try again.")
      setIsLoading(false)
    }
  }
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading message="Preparing your quiz..." />
      </div>
    )
  }
  
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header Section */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-20 h-20 bg-gradient-to-br from-saffron to-gold rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
            <ApperIcon name="User" className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold font-vesper text-saddle-brown mb-4 paisley-decoration">
            Welcome to SanskritiQuiz
          </h1>
          
          <div className="mb-6">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-saffron/10 to-gold/10 px-4 py-2 rounded-full border border-gold/30 mb-3">
              <ApperIcon name="Calendar" className="w-4 h-4 text-saffron" />
              <span className="text-saddle-brown font-medium font-hind">
                Week {currentWeek.weekNumber} Quiz
              </span>
            </div>
            
            <p className="text-saddle-brown/70 font-hind">
              Enter your details to begin this week's mythology challenge
            </p>
          </div>
        </motion.div>
        
        {/* Entry Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card variant="ornate" className="p-8 lg:p-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <Input
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  error={errors.name}
                  required
                />
              </div>
              
              {/* Mobile Field */}
              <div>
                <Input
                  label="Mobile Number"
                  name="mobile"
                  type="tel"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  placeholder="Enter 10-digit mobile number"
                  error={errors.mobile}
                  maxLength={10}
                  required
                />
              </div>
              
              {/* Privacy Notice */}
              <motion.div
                className="p-4 bg-gradient-to-r from-success/10 to-green-100 rounded-xl border border-success/20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                <div className="flex items-start space-x-3">
                  <ApperIcon name="Shield" className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-success font-hind mb-1">
                      Privacy Assured
                    </div>
                    <div className="text-sm text-success/80 font-hind">
                      We will never share your mobile number publicly. It's used only for 
                      internal records and will not appear on leaderboards or certificates.
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* Submit Button */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 }}
              >
                <Button
                  type="submit"
                  size="xl"
                  className="w-full text-lg py-4"
                  disabled={isLoading}
                >
                  <ApperIcon name="Play" className="w-6 h-6 mr-2" />
                  Start Quiz - 10 Questions, 5 Minutes
                </Button>
              </motion.div>
            </form>
            
            {/* Additional Info */}
            <motion.div
              className="mt-8 pt-6 border-t border-gold/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                <div className="flex items-center justify-center space-x-2 text-saddle-brown/70">
                  <ApperIcon name="Clock" className="w-4 h-4 text-saffron" />
                  <span className="text-sm font-hind">5 min timer</span>
                </div>
                
                <div className="flex items-center justify-center space-x-2 text-saddle-brown/70">
                  <ApperIcon name="BookOpen" className="w-4 h-4 text-saffron" />
                  <span className="text-sm font-hind">10 questions</span>
                </div>
                
                <div className="flex items-center justify-center space-x-2 text-saddle-brown/70">
                  <ApperIcon name="Award" className="w-4 h-4 text-saffron" />
                  <span className="text-sm font-hind">Get certificate</span>
                </div>
              </div>
            </motion.div>
          </Card>
        </motion.div>
        
        {/* Sanskrit Blessing */}
        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <div className="sanskrit-text text-lg font-vesper text-saffron mb-2">
            शुभारम्भः
          </div>
          <div className="text-sm text-saddle-brown/60 font-hind italic">
            May this auspicious beginning lead to success
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default UserEntry