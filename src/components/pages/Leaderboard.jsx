import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { formatTime, getCurrentWeek } from "@/utils/dateHelpers";
import { cn } from "@/utils/cn";
import quizAttemptService from "@/services/api/quizAttemptService";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([])
  const [weeklyStats, setWeeklyStats] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  
  const currentWeek = getCurrentWeek()
  
  useEffect(() => {
    const loadLeaderboardData = async () => {
      try {
        setIsLoading(true)
        setError(null)
        
        const [leaderboard, stats] = await Promise.all([
          quizAttemptService.getWeeklyLeaderboard(),
          quizAttemptService.getWeeklyStats()
        ])
        
        setLeaderboardData(leaderboard)
        setWeeklyStats(stats)
        
      } catch (err) {
        console.error("Error loading leaderboard:", err)
        setError("Failed to load leaderboard data. Please try again.")
      } finally {
        setIsLoading(false)
      }
    }
    
    loadLeaderboardData()
  }, [])
  
  const handleShareLeaderboard = async () => {
    try {
const leaderboardText = `SanskritiQuiz Week ${currentWeek.weekNumber} Leaderboard 🏆\n\n` +
        leaderboardData.slice(0, 10).map((entry, index) => 
          `${index + 1}. ${entry.user_name_c} - ${entry.score_c}/10`
        ).join("\n") +
        `\n\nJoin the quiz at SanskritiQuiz.com! 📚✨`
      
      if (navigator.share) {
        await navigator.share({
          title: "SanskritiQuiz Leaderboard",
          text: leaderboardText
        })
      } else {
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(leaderboardText)}`
        window.open(whatsappUrl, "_blank")
      }
      
      toast.success("Leaderboard shared successfully! 📱")
    } catch (error) {
      console.error("Error sharing leaderboard:", error)
      const fallbackText = `Check out this week's SanskritiQuiz leaderboard! Join the mythology quiz at SanskritiQuiz.com 🏆📚`
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(fallbackText)}`
      window.open(whatsappUrl, "_blank")
    }
  }
  
  const getRankIcon = (rank) => {
    switch (rank) {
      case 1: return "Crown"
      case 2: return "Medal"
      case 3: return "Award"
      default: return "User"
    }
  }
  
  const getRankColor = (rank) => {
    switch (rank) {
      case 1: return "text-gold"
      case 2: return "text-gray-400"
      case 3: return "text-orange-500"
      default: return "text-saffron"
    }
  }
  
  const getRankBadge = (rank) => {
    switch (rank) {
      case 1: return { variant: "default", text: "🥇 Champion" }
      case 2: return { variant: "secondary", text: "🥈 Runner Up" }
      case 3: return { variant: "warning", text: "🥉 Third Place" }
      default: return null
    }
  }
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading message="Loading weekly champions..." />
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
  
  if (leaderboardData.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Empty
          title="No entries yet this week"
          message="Be the first to take this week's quiz and claim the top spot!"
          actionText="Start Quiz"
          actionPath="/entry"
          icon="Trophy"
        />
      </div>
    )
  }
  
  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-20 h-20 bg-gradient-to-br from-gold via-saffron to-gold rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
            <ApperIcon name="Trophy" className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold font-vesper text-saddle-brown mb-4 paisley-decoration">
            Weekly Leaderboard
          </h1>
          
          <div className="flex items-center justify-center space-x-2 mb-4">
            <ApperIcon name="Calendar" className="w-5 h-5 text-saffron" />
            <span className="text-lg font-medium text-saddle-brown font-hind">
              Week {currentWeek.weekNumber} • {currentWeek.startDate} - {currentWeek.endDate}
            </span>
          </div>
          
          <div className="sanskrit-text text-lg text-saffron font-vesper mb-2">
            ज्ञानं परमं बलम्
          </div>
          <div className="text-saddle-brown/70 font-hind">
            Knowledge is the supreme strength
          </div>
        </motion.div>
        
        {/* Weekly Stats */}
        {weeklyStats && (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="p-6 text-center">
              <ApperIcon name="Users" className="w-8 h-8 text-saffron mx-auto mb-3" />
              <div className="text-2xl font-bold font-vesper text-saddle-brown">
                {weeklyStats.totalAttempts}
              </div>
              <div className="text-sm text-saddle-brown/70 font-hind">
                Total Participants
              </div>
            </Card>
            
            <Card className="p-6 text-center">
              <ApperIcon name="Target" className="w-8 h-8 text-gold mx-auto mb-3" />
              <div className="text-2xl font-bold font-vesper text-saddle-brown">
                {weeklyStats.averageScore}
              </div>
              <div className="text-sm text-saddle-brown/70 font-hind">
                Average Score
              </div>
            </Card>
            
            <Card className="p-6 text-center">
              <ApperIcon name="Crown" className="w-8 h-8 text-success mx-auto mb-3" />
              <div className="text-2xl font-bold font-vesper text-saddle-brown">
                {weeklyStats.highestScore}/10
              </div>
              <div className="text-sm text-saddle-brown/70 font-hind">
                Highest Score
              </div>
            </Card>
            
            <Card className="p-6 text-center">
              <ApperIcon name="Clock" className="w-8 h-8 text-info mx-auto mb-3" />
              <div className="text-2xl font-bold font-vesper text-saddle-brown">
                {formatTime(weeklyStats.averageTime)}
              </div>
              <div className="text-sm text-saddle-brown/70 font-hind">
                Average Time
              </div>
            </Card>
          </motion.div>
        )}
        
        {/* Top 3 Podium */}
        {leaderboardData.length >= 3 && (
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex flex-col md:flex-row justify-center items-end gap-6 mb-8">
              {/* Second Place */}
              <Card className="p-6 text-center md:order-1 transform hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-gray-300 to-gray-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ApperIcon name="Medal" className="w-8 h-8 text-white" />
                </div>
                <Badge variant="secondary" className="mb-3">🥈 Runner Up</Badge>
                <div className="text-xl font-bold font-vesper text-saddle-brown mb-2">
{leaderboardData[1].user_name_c}
                </div>
                <div className="text-3xl font-bold text-gold font-vesper mb-1">
                  {leaderboardData[1].score_c}/10
                </div>
                <div className="text-sm text-saddle-brown/70 font-hind">
                  {formatTime(leaderboardData[1].time_taken_c)}
                </div>
              </Card>
              
              {/* First Place - Elevated */}
              <Card className="p-8 text-center md:order-2 transform hover:scale-105 transition-all duration-300 border-2 border-gold">
                <div className="w-20 h-20 bg-gradient-to-br from-gold to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl">
                  <ApperIcon name="Crown" className="w-10 h-10 text-white" />
                </div>
                <Badge variant="default" className="mb-3 text-lg px-4 py-2">🥇 Champion</Badge>
                <div className="text-2xl font-bold font-vesper text-saddle-brown mb-2">
{leaderboardData[0].user_name_c}
                </div>
                <div className="text-4xl font-bold text-gold font-vesper mb-2">
                  {leaderboardData[0].score_c}/10
                </div>
                <div className="text-sm text-saddle-brown/70 font-hind">
                  {formatTime(leaderboardData[0].time_taken_c)}
                </div>
              </Card>
              
              {/* Third Place */}
              <Card className="p-6 text-center md:order-3 transform hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ApperIcon name="Award" className="w-8 h-8 text-white" />
                </div>
                <Badge variant="warning" className="mb-3">🥉 Third Place</Badge>
                <div className="text-xl font-bold font-vesper text-saddle-brown mb-2">
{leaderboardData[2].user_name_c}
                </div>
                <div className="text-3xl font-bold text-gold font-vesper mb-1">
                  {leaderboardData[2].score_c}/10
                </div>
                <div className="text-sm text-saddle-brown/70 font-hind">
                  {formatTime(leaderboardData[2].time_taken_c)}
                </div>
              </Card>
            </div>
          </motion.div>
        )}
        
        {/* Full Leaderboard Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Card className="overflow-hidden">
            <div className="p-6 bg-gradient-to-r from-saffron/10 to-gold/10 border-b border-gold/20">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <h2 className="text-2xl font-bold font-vesper text-saddle-brown flex items-center space-x-2">
                  <ApperIcon name="List" className="w-6 h-6 text-saffron" />
                  <span>Top Performers</span>
                </h2>
                
                <Button
                  onClick={handleShareLeaderboard}
                  variant="secondary"
                  size="md"
                  className="flex items-center space-x-2"
                >
                  <ApperIcon name="Share2" className="w-4 h-4" />
                  <span>Share Leaderboard</span>
                </Button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-saddle-brown/5 to-saffron/5">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-bold text-saddle-brown font-vesper">
                      Rank
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-saddle-brown font-vesper">
                      Participant
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-bold text-saddle-brown font-vesper">
                      Score
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-bold text-saddle-brown font-vesper">
                      Time
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-bold text-saddle-brown font-vesper">
                      Achievement
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboardData.map((entry, index) => {
                    const rank = index + 1
                    const badge = getRankBadge(rank)
                    
                    return (
                      <motion.tr
                        key={entry.Id}
                        className="border-b border-gold/10 hover:bg-gradient-to-r hover:from-cornsilk/30 hover:to-floral-white/30 transition-all duration-200"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.7 + (index * 0.1) }}
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-3">
                            <div className={cn(
                              "w-8 h-8 rounded-full flex items-center justify-center",
                              rank <= 3 ? "bg-gradient-to-br from-gold to-saffron" : "bg-gradient-to-br from-saddle-brown to-saffron"
                            )}>
                              <ApperIcon 
                                name={getRankIcon(rank)} 
                                className="w-4 h-4 text-white" 
                              />
                            </div>
                            <span className={cn(
                              "text-2xl font-bold font-vesper",
                              getRankColor(rank)
                            )}>
                              #{rank}
                            </span>
                          </div>
                        </td>
                        
                        <td className="px-6 py-4">
<div className="font-medium text-saddle-brown font-hind">
                            {entry.user_name_c}
                          </div>
                        </td>
                        
                        <td className="px-6 py-4 text-center">
<div className="text-2xl font-bold font-vesper text-saddle-brown">
                            {entry.score_c}/10
                          </div>
                          <div className="text-sm text-saffron font-hind">
                            {Math.round((entry.score_c / 10) * 100)}%
                          </div>
                        </td>
                        
<td className="px-6 py-4 text-center">
                          <div className="font-medium text-saddle-brown font-hind">
                            {formatTime(entry.time_taken_c)}
                          </div>
                        </td>
                        
                        <td className="px-6 py-4 text-center">
                          {badge && (
                            <Badge variant={badge.variant}>
                              {badge.text}
                            </Badge>
                          )}
                        </td>
                      </motion.tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        </motion.div>
        
        {/* Call to Action */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <div className="mb-6">
            <h3 className="text-2xl font-bold font-vesper text-saddle-brown mb-2">
              Think you can do better?
            </h3>
            <p className="text-saddle-brown/70 font-hind">
              Challenge yourself with this week's mythology quiz!
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/entry">
              <Button size="lg" className="flex items-center space-x-2">
                <ApperIcon name="Play" className="w-5 h-5" />
                <span>Take This Week's Quiz</span>
              </Button>
            </Link>
            
            <Link to="/">
              <Button variant="outline" size="lg" className="flex items-center space-x-2">
                <ApperIcon name="Home" className="w-5 h-5" />
                <span>Back to Home</span>
              </Button>
            </Link>
          </div>
        </motion.div>
        
        {/* Sanskrit Wisdom */}
        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.2 }}
        >
          <div className="sanskrit-text text-lg font-vesper text-saffron mb-2">
            स्पर्धया वर्धते विद्या
          </div>
          <div className="text-sm text-saddle-brown/60 font-hind italic">
            Knowledge grows through healthy competition
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Leaderboard