import { useState } from "react"
import { motion } from "framer-motion"
import { toast } from "react-toastify"
import questionService from "@/services/api/questionService"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"
import Input from "@/components/atoms/Input"
import Card from "@/components/atoms/Card"
import Loading from "@/components/ui/Loading"

const UploadQuestion = () => {
  const [formData, setFormData] = useState({
    Name: "",
    Tags: "",
    category_c: "",
    correct_option_c: "",
    difficulty_c: 1,
    option_a_c: "",
    option_b_c: "",
    option_c_c: "",
    option_d_c: "",
    question_text_c: ""
  })
  
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'difficulty_c' ? parseInt(value) || 1 : value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }))
    }
  }

  // Form validation
  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.Name.trim()) {
      newErrors.Name = "Question name is required"
    }
    
    if (!formData.question_text_c.trim()) {
      newErrors.question_text_c = "Question text is required"
    }
    
    if (!formData.category_c.trim()) {
      newErrors.category_c = "Category is required"
    }
    
    if (!formData.option_a_c.trim()) {
      newErrors.option_a_c = "Option A is required"
    }
    
    if (!formData.option_b_c.trim()) {
      newErrors.option_b_c = "Option B is required"
    }
    
    if (!formData.option_c_c.trim()) {
      newErrors.option_c_c = "Option C is required"
    }
    
    if (!formData.option_d_c.trim()) {
      newErrors.option_d_c = "Option D is required"
    }
    
    if (!formData.correct_option_c) {
      newErrors.correct_option_c = "Correct option is required"
    } else if (!['a', 'b', 'c', 'd'].includes(formData.correct_option_c.toLowerCase())) {
      newErrors.correct_option_c = "Correct option must be a, b, c, or d"
    }
    
    if (formData.difficulty_c < 1 || formData.difficulty_c > 5) {
      newErrors.difficulty_c = "Difficulty must be between 1 and 5"
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      toast.error("Please fix the form errors before submitting")
      return
    }
    
    setIsLoading(true)
    
    try {
      // Prepare data for submission (only Updateable fields)
      const questionData = {
        Name: formData.Name.trim(),
        Tags: formData.Tags.trim(),
        category_c: formData.category_c.trim(),
        correct_option_c: formData.correct_option_c.toLowerCase(),
        difficulty_c: formData.difficulty_c,
        option_a_c: formData.option_a_c.trim(),
        option_b_c: formData.option_b_c.trim(),
        option_c_c: formData.option_c_c.trim(),
        option_d_c: formData.option_d_c.trim(),
        question_text_c: formData.question_text_c.trim()
      }
      
      await questionService.createQuestion(questionData)
      
      toast.success("Question uploaded successfully! 🎉")
      
      // Reset form
      setFormData({
        Name: "",
        Tags: "",
        category_c: "",
        correct_option_c: "",
        difficulty_c: 1,
        option_a_c: "",
        option_b_c: "",
        option_c_c: "",
        option_d_c: "",
        question_text_c: ""
      })
      
    } catch (error) {
      console.error("Error uploading question:", error)
      toast.error("Failed to upload question. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  // Handle form reset
  const handleReset = () => {
    setFormData({
      Name: "",
      Tags: "",
      category_c: "",
      correct_option_c: "",
      difficulty_c: 1,
      option_a_c: "",
      option_b_c: "",
      option_c_c: "",
      option_d_c: "",
      question_text_c: ""
    })
    setErrors({})
  }

  const difficultyLevels = [
    { value: 1, label: "1 - Very Easy" },
    { value: 2, label: "2 - Easy" },
    { value: 3, label: "3 - Medium" },
    { value: 4, label: "4 - Hard" },
    { value: 5, label: "5 - Very Hard" }
  ]

  const categories = [
    "Bhagavad Gita",
    "Ramayana",
    "Mahabharata", 
    "Puranas",
    "Upanishads",
    "Vedas",
    "Hindu Philosophy",
    "Festivals",
    "Mythology",
    "Scriptures"
  ]

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-center mb-4">
            <ApperIcon name="Upload" className="w-8 h-8 text-saffron mr-3" />
            <h1 className="text-3xl md:text-4xl font-bold font-vesper text-saddle-brown paisley-decoration">
              Upload Question
            </h1>
          </div>
          <p className="text-lg text-saddle-brown/70 font-hind max-w-2xl mx-auto">
            Contribute to our sacred knowledge base by adding new questions
          </p>
        </motion.div>

        {/* Upload Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Question Name */}
              <div>
                <label className="block text-sm font-medium text-saddle-brown font-hind mb-2">
                  Question Name *
                </label>
                <Input
                  name="Name"
                  value={formData.Name}
                  onChange={handleChange}
                  placeholder="Enter a descriptive name for this question"
                  className={errors.Name ? "border-error" : ""}
                />
                {errors.Name && (
                  <p className="text-error text-sm mt-1 font-hind">{errors.Name}</p>
                )}
              </div>

              {/* Question Text */}
              <div>
                <label className="block text-sm font-medium text-saddle-brown font-hind mb-2">
                  Question Text *
                </label>
                <textarea
                  name="question_text_c"
                  value={formData.question_text_c}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Enter the complete question text"
                  className={`w-full px-4 py-3 border-2 rounded-lg font-hind text-saddle-brown placeholder-saddle-brown/50 focus:outline-none focus:ring-2 focus:ring-saffron focus:border-saffron transition-all duration-200 ${
                    errors.question_text_c ? "border-error" : "border-gold/30"
                  }`}
                />
                {errors.question_text_c && (
                  <p className="text-error text-sm mt-1 font-hind">{errors.question_text_c}</p>
                )}
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-saddle-brown font-hind mb-2">
                  Category *
                </label>
                <select
                  name="category_c"
                  value={formData.category_c}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border-2 rounded-lg font-hind text-saddle-brown focus:outline-none focus:ring-2 focus:ring-saffron focus:border-saffron transition-all duration-200 ${
                    errors.category_c ? "border-error" : "border-gold/30"
                  }`}
                >
                  <option value="">Select a category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                {errors.category_c && (
                  <p className="text-error text-sm mt-1 font-hind">{errors.category_c}</p>
                )}
              </div>

              {/* Options Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Option A */}
                <div>
                  <label className="block text-sm font-medium text-saddle-brown font-hind mb-2">
                    Option A *
                  </label>
                  <Input
                    name="option_a_c"
                    value={formData.option_a_c}
                    onChange={handleChange}
                    placeholder="Enter option A"
                    className={errors.option_a_c ? "border-error" : ""}
                  />
                  {errors.option_a_c && (
                    <p className="text-error text-sm mt-1 font-hind">{errors.option_a_c}</p>
                  )}
                </div>

                {/* Option B */}
                <div>
                  <label className="block text-sm font-medium text-saddle-brown font-hind mb-2">
                    Option B *
                  </label>
                  <Input
                    name="option_b_c"
                    value={formData.option_b_c}
                    onChange={handleChange}
                    placeholder="Enter option B"
                    className={errors.option_b_c ? "border-error" : ""}
                  />
                  {errors.option_b_c && (
                    <p className="text-error text-sm mt-1 font-hind">{errors.option_b_c}</p>
                  )}
                </div>

                {/* Option C */}
                <div>
                  <label className="block text-sm font-medium text-saddle-brown font-hind mb-2">
                    Option C *
                  </label>
                  <Input
                    name="option_c_c"
                    value={formData.option_c_c}
                    onChange={handleChange}
                    placeholder="Enter option C"
                    className={errors.option_c_c ? "border-error" : ""}
                  />
                  {errors.option_c_c && (
                    <p className="text-error text-sm mt-1 font-hind">{errors.option_c_c}</p>
                  )}
                </div>

                {/* Option D */}
                <div>
                  <label className="block text-sm font-medium text-saddle-brown font-hind mb-2">
                    Option D *
                  </label>
                  <Input
                    name="option_d_c"
                    value={formData.option_d_c}
                    onChange={handleChange}
                    placeholder="Enter option D"
                    className={errors.option_d_c ? "border-error" : ""}
                  />
                  {errors.option_d_c && (
                    <p className="text-error text-sm mt-1 font-hind">{errors.option_d_c}</p>
                  )}
                </div>
              </div>

              {/* Correct Option and Difficulty */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Correct Option */}
                <div>
                  <label className="block text-sm font-medium text-saddle-brown font-hind mb-2">
                    Correct Option *
                  </label>
                  <select
                    name="correct_option_c"
                    value={formData.correct_option_c}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border-2 rounded-lg font-hind text-saddle-brown focus:outline-none focus:ring-2 focus:ring-saffron focus:border-saffron transition-all duration-200 ${
                      errors.correct_option_c ? "border-error" : "border-gold/30"
                    }`}
                  >
                    <option value="">Select correct option</option>
                    <option value="a">A</option>
                    <option value="b">B</option>
                    <option value="c">C</option>
                    <option value="d">D</option>
                  </select>
                  {errors.correct_option_c && (
                    <p className="text-error text-sm mt-1 font-hind">{errors.correct_option_c}</p>
                  )}
                </div>

                {/* Difficulty */}
                <div>
                  <label className="block text-sm font-medium text-saddle-brown font-hind mb-2">
                    Difficulty Level *
                  </label>
                  <select
                    name="difficulty_c"
                    value={formData.difficulty_c}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border-2 rounded-lg font-hind text-saddle-brown focus:outline-none focus:ring-2 focus:ring-saffron focus:border-saffron transition-all duration-200 ${
                      errors.difficulty_c ? "border-error" : "border-gold/30"
                    }`}
                  >
                    {difficultyLevels.map(level => (
                      <option key={level.value} value={level.value}>
                        {level.label}
                      </option>
                    ))}
                  </select>
                  {errors.difficulty_c && (
                    <p className="text-error text-sm mt-1 font-hind">{errors.difficulty_c}</p>
                  )}
                </div>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-saddle-brown font-hind mb-2">
                  Tags
                </label>
                <Input
                  name="Tags"
                  value={formData.Tags}
                  onChange={handleChange}
                  placeholder="Enter tags separated by commas (e.g., Krishna, Dharma, Wisdom)"
                />
                <p className="text-saddle-brown/60 text-sm mt-1 font-hind">
                  Optional: Add tags to help categorize this question
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 flex items-center justify-center space-x-2"
                >
                  {isLoading ? (
                    <Loading size="sm" />
                  ) : (
                    <>
                      <ApperIcon name="Upload" className="w-5 h-5" />
                      <span>Upload Question</span>
                    </>
                  )}
                </Button>
                
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleReset}
                  disabled={isLoading}
                  className="flex-1 flex items-center justify-center space-x-2"
                >
                  <ApperIcon name="RotateCcw" className="w-5 h-5" />
                  <span>Reset Form</span>
                </Button>
              </div>
            </form>
          </Card>
        </motion.div>

        {/* Sanskrit Blessing */}
        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="sanskrit-text text-saffron font-vesper mb-1">
            विद्या ददाति विनयं
          </div>
          <div className="text-sm text-saddle-brown/60 font-hind italic">
            Knowledge gives humility
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default UploadQuestion