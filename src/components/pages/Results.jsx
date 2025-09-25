import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import { motion } from "framer-motion"
import { toast } from "react-toastify"
import quizAttemptService from "@/services/api/quizAttemptService"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"
import ScoreCard from "@/components/molecules/ScoreCard"
import CertificatePreview from "@/components/organisms/CertificatePreview"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"

const Results = () => {
  const [resultsData, setResultsData] = useState(null)
  const [weeklyRank, setWeeklyRank] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  
  const navigate = useNavigate()
  
  useEffect(() => {
    const loadResults = async () => {
      try {
        setIsLoading(true)
        setError(null)
        
        // Get results from session storage
        const storedResults = sessionStorage.getItem("quizResults")
        if (!storedResults) {
          throw new Error("No quiz results found")
        }
        
        const parsedResults = JSON.parse(storedResults)
        setResultsData(parsedResults)
        
        // Get weekly rank
        const rank = await quizAttemptService.getUserWeeklyRank(
          parsedResults.user.Id
        )
        setWeeklyRank(rank)
        
      } catch (err) {
        console.error("Error loading results:", err)
        setError("Failed to load quiz results. Please try taking the quiz again.")
      } finally {
        setIsLoading(false)
      }
    }
    
    loadResults()
  }, [])
  
  const handleTakeAnotherQuiz = () => {
    // Clear current session data
    sessionStorage.removeItem("quizResults")
    sessionStorage.removeItem("currentUser")
    
    toast.info("Ready for another challenge? Let's go! 🚀")
    navigate("/entry")
  }
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading message="Calculating your results..." variant="certificate" />
      </div>
    )
  }
  
  if (error || !resultsData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Error 
          message={error || "No results data available"} 
          onRetry={() => navigate("/entry")}
        />
      </div>
    )
  }
  
  const { user, attempt, answers, questions } = resultsData
  const correctAnswers = answers.filter(answer => answer.isCorrect).length
  
  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Results Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-20 h-20 bg-gradient-to-br from-gold via-saffron to-gold rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
            <ApperIcon name="Trophy" className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold font-vesper text-saddle-brown mb-4">
            Congratulations, {user.name}!
          </h1>
          
          <div className="sanskrit-text text-xl text-saffron font-vesper mb-2">
            धन्यवाद! शुभकामनाएँ
          </div>
          <div className="text-saddle-brown/70 font-hind">
            Your quiz journey is complete
          </div>
        </motion.div>
        
        {/* Score Card */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <ScoreCard
            score={correctAnswers}
            totalQuestions={questions.length}
            timeTaken={attempt.time_taken}
            rank={weeklyRank}
          />
        </motion.div>
        
        {/* Certificate Section */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold font-vesper text-saddle-brown mb-2 paisley-decoration">
              Your Achievement Certificate
            </h2>
            <p className="text-saddle-brown/70 font-hind">
              Share your knowledge milestone with friends and family
            </p>
          </div>
          
          <CertificatePreview
            userData={{
              name: user.name,
              score: correctAnswers,
              totalQuestions: questions.length,
              timeTaken: attempt.time_taken,
              rank: weeklyRank
            }}
          />
        </motion.div>
        
        {/* Action Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Link to="/leaderboard">
            <Button variant="primary" size="lg" className="flex items-center space-x-2">
              <ApperIcon name="Trophy" className="w-5 h-5" />
              <span>View Leaderboard</span>
            </Button>
          </Link>
          
          <Button
            onClick={handleTakeAnotherQuiz}
            variant="secondary"
            size="lg"
            className="flex items-center space-x-2"
          >
            <ApperIcon name="RefreshCw" className="w-5 h-5" />
            <span>Take Another Quiz</span>
          </Button>
          
          <Link to="/">
            <Button variant="outline" size="lg" className="flex items-center space-x-2">
              <ApperIcon name="Home" className="w-5 h-5" />
              <span>Back to Home</span>
            </Button>
          </Link>
        </motion.div>
        
        {/* Answer Review */}
        <motion.div
          className="bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-gold/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <h3 className="text-xl font-bold font-vesper text-saddle-brown mb-4 flex items-center space-x-2">
            <ApperIcon name="BookOpen" className="w-5 h-5 text-saffron" />
            <span>Quick Review</span>
          </h3>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
            <div className="text-center p-3 bg-success/10 rounded-lg">
              <div className="text-2xl font-bold text-success font-vesper">
                {correctAnswers}
              </div>
              <div className="text-sm text-success/80 font-hind">Correct</div>
            </div>
            
            <div className="text-center p-3 bg-error/10 rounded-lg">
              <div className="text-2xl font-bold text-error font-vesper">
                {questions.length - correctAnswers}
              </div>
              <div className="text-sm text-error/80 font-hind">Incorrect</div>
            </div>
            
            <div className="text-center p-3 bg-saffron/10 rounded-lg">
              <div className="text-2xl font-bold text-saffron font-vesper">
                {Math.round((correctAnswers / questions.length) * 100)}%
              </div>
              <div className="text-sm text-saffron/80 font-hind">Accuracy</div>
            </div>
            
            <div className="text-center p-3 bg-gold/10 rounded-lg">
              <div className="text-2xl font-bold text-saddle-brown font-vesper">
                #{weeklyRank || "N/A"}
              </div>
              <div className="text-sm text-saddle-brown/80 font-hind">Rank</div>
            </div>
          </div>
          
          <div className="text-center text-sm text-saddle-brown/60 font-hind">
            Great effort! Continue your journey of learning our sacred scriptures.
          </div>
        </motion.div>
        
        {/* Motivational Quote */}
        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <div className="sanskrit-text text-lg font-vesper text-saffron mb-2">
            विद्याधनं सर्वधनप्रधानम्
          </div>
          <div className="text-sm text-saddle-brown/60 font-hind italic">
            Knowledge is the greatest of all treasures
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Results