import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { toast } from "react-toastify"
import questionService from "@/services/api/questionService"
import quizAttemptService from "@/services/api/quizAttemptService"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"
import Card from "@/components/atoms/Card"
import Timer from "@/components/molecules/Timer"
import ProgressBar from "@/components/molecules/ProgressBar"
import QuestionOption from "@/components/molecules/QuestionOption"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"

const Quiz = () => {
  const [questions, setQuestions] = useState([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false)
  const [userAnswers, setUserAnswers] = useState([])
  const [timeRemaining, setTimeRemaining] = useState(300) // 5 minutes
  const [startTime] = useState(Date.now())
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const navigate = useNavigate()
  const currentQuestion = questions[currentQuestionIndex]
  const isLastQuestion = currentQuestionIndex === questions.length - 1
  
  // Load questions on component mount
  useEffect(() => {
    const loadQuestions = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const fetchedQuestions = await questionService.getRandomQuestions(10)
        setQuestions(fetchedQuestions)
      } catch (err) {
        console.error("Error loading questions:", err)
        setError("Failed to load quiz questions. Please try again.")
      } finally {
        setIsLoading(false)
      }
    }
    
    loadQuestions()
  }, [])
  
  // Check if user data exists
  useEffect(() => {
    const userData = sessionStorage.getItem("currentUser")
    if (!userData) {
      toast.error("Please enter your details first")
      navigate("/entry")
    }
  }, [navigate])
  
  // Handle timer expiry
  const handleTimeUp = () => {
    if (!isSubmitting) {
      toast.warning("Time's up! Submitting your quiz...")
      handleQuizSubmit()
    }
  }
  
  // Handle answer selection
  const handleAnswerSelect = (option) => {
    if (isAnswerRevealed) return
    
    setSelectedAnswer(option)
    setIsAnswerRevealed(true)
    
    // Check if answer is correct
const isCorrect = currentQuestion.correct_option_c === option
    
    // Store user's answer
    const answerData = {
questionId: currentQuestion.Id,
      selectedOption: option,
      isCorrect,
correctOption: currentQuestion.correct_option_c
    }
    
    setUserAnswers(prev => [...prev, answerData])
    
    // Show feedback toast
    if (isCorrect) {
      toast.success("Correct! Well done! ✨", { autoClose: 1500 })
    } else {
      toast.error("Not quite right. Keep learning! 📚", { autoClose: 1500 })
    }
  }
  
  // Handle next question
  const handleNextQuestion = () => {
    if (isLastQuestion) {
      handleQuizSubmit()
    } else {
      setCurrentQuestionIndex(prev => prev + 1)
      setSelectedAnswer(null)
      setIsAnswerRevealed(false)
    }
  }
  
  // Handle quiz submission
  const handleQuizSubmit = async () => {
    setIsSubmitting(true)
    
    try {
      const userData = JSON.parse(sessionStorage.getItem("currentUser"))
      if (!userData) {
        toast.error("User data not found. Please start over.")
        navigate("/entry")
        return
      }
      
      // Calculate final results
      const totalTime = Math.floor((Date.now() - startTime) / 1000)
      const correctAnswers = userAnswers.filter(answer => answer.isCorrect).length
      
      // Add current answer if not yet added
      let finalAnswers = [...userAnswers]
      if (selectedAnswer && !isAnswerRevealed) {
const isCorrect = currentQuestion.correct_option_c === selectedAnswer
        finalAnswers.push({
          questionId: currentQuestion.Id,
          selectedOption: selectedAnswer,
          isCorrect,
correctOption: currentQuestion.correct_option_c
        })
      }
      
      const finalScore = finalAnswers.filter(answer => answer.isCorrect).length
      
      // Save quiz attempt
      const attemptData = {
user_id_c: parseInt(userData.Id) || userData.Id,
        user_name_c: userData.name_c || userData.Name,
        score_c: finalScore,
        time_taken_c: totalTime,
        total_questions: questions.length
      }
      
      const quizAttempt = await quizAttemptService.createAttempt(attemptData)
      
      // Store results for results page
      const resultsData = {
        user: userData,
        attempt: quizAttempt,
        answers: finalAnswers,
        questions: questions
      }
      
      sessionStorage.setItem("quizResults", JSON.stringify(resultsData))
      
      toast.success("Quiz completed successfully! 🎉")
      navigate("/results")
      
    } catch (error) {
      console.error("Error submitting quiz:", error)
      toast.error("Failed to submit quiz. Please try again.")
      setIsSubmitting(false)
    }
  }
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading message="Loading quiz questions..." variant="quiz" />
      </div>
    )
  }
  
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Error 
          message={error} 
          onRetry={() => window.location.reload()} 
        />
      </div>
    )
  }
  
  if (!currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Error message="No questions available" />
      </div>
    )
  }
  
  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Quiz Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            {/* Progress */}
            <div className="flex-1">
              <ProgressBar 
                current={currentQuestionIndex + 1} 
                total={questions.length} 
                className="mb-4"
              />
              <div className="text-saddle-brown/70 font-hind">
                Test your knowledge of sacred scriptures
              </div>
            </div>
            
            {/* Timer */}
            <Timer 
              initialTime={300}
              onTimeUp={handleTimeUp}
              className="flex-shrink-0"
            />
          </div>
        </motion.div>
        
        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <Card variant="quiz" className="p-8 mb-6">
              {/* Question Header */}
              <div className="mb-6">
                <div className="flex items-center space-x-2 mb-4">
                  <ApperIcon name="BookOpen" className="w-5 h-5 text-saffron" />
                  <span className="text-sm font-medium text-saddle-brown/70 font-hind">
{currentQuestion.category_c}
                  </span>
                </div>
                
                <h2 className="text-2xl font-bold font-vesper text-saddle-brown leading-relaxed">
{currentQuestion.question_text_c}
                </h2>
              </div>
              
              {/* Answer Options */}
              <div className="space-y-4 mb-6">
{[
                  { key: "a", text: currentQuestion.option_a_c },
                  { key: "b", text: currentQuestion.option_b_c },
                  { key: "c", text: currentQuestion.option_c_c },
                  { key: "d", text: currentQuestion.option_d_c }
                ].map((option) => (
                  <QuestionOption
                    key={option.key}
                    option={option.text}
                    label={option.key.toUpperCase()}
isSelected={selectedAnswer === option.key}
                    isCorrect={currentQuestion.correct_option_c === option.key}
                    isRevealed={isAnswerRevealed}
                    onClick={() => handleAnswerSelect(option.key)}
                  />
                ))}
              </div>
              
              {/* Action Button */}
              <div className="flex justify-end">
                <AnimatePresence>
                  {isAnswerRevealed && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Button
                        onClick={handleNextQuestion}
                        disabled={isSubmitting}
                        size="lg"
                        className="flex items-center space-x-2"
                      >
                        <span>
                          {isLastQuestion ? "Complete Quiz" : "Next Question"}
                        </span>
                        <ApperIcon 
                          name={isLastQuestion ? "CheckCircle" : "ArrowRight"} 
                          className="w-5 h-5" 
                        />
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Card>
          </motion.div>
        </AnimatePresence>
        
        {/* Early Submit Option */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Button
            onClick={handleQuizSubmit}
            disabled={isSubmitting}
            variant="outline"
            size="md"
            className="flex items-center space-x-2 mx-auto"
          >
            <ApperIcon name="Send" className="w-4 h-4" />
            <span>Submit Quiz Early</span>
          </Button>
          <p className="text-sm text-saddle-brown/60 font-hind mt-2">
            You can submit anytime, but unanswered questions will be marked incorrect
          </p>
        </motion.div>
        
        {/* Sanskrit Motivation */}
        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="sanskrit-text text-saffron font-vesper mb-1">
            सत्यमेव जयते
          </div>
          <div className="text-sm text-saddle-brown/60 font-hind italic">
            Truth alone triumphs
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Quiz