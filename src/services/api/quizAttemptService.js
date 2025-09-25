import quizAttemptsData from "@/services/mockData/quizAttempts.json"
import { getWeekNumber } from "@/utils/dateHelpers"

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

class QuizAttemptService {
  constructor() {
    this.attempts = [...quizAttemptsData]
  }

  async getAllAttempts() {
    await delay(250)
    return [...this.attempts]
  }

  async getAttemptById(id) {
    await delay(200)
    const attempt = this.attempts.find(a => a.Id === parseInt(id))
    if (!attempt) {
      throw new Error("Quiz attempt not found")
    }
    return { ...attempt }
  }

  async getWeeklyLeaderboard(weekNumber = null) {
    await delay(300)
    
    const currentWeek = weekNumber || getWeekNumber(new Date())
    
    const weeklyAttempts = this.attempts
      .filter(attempt => attempt.week_number === currentWeek)
      .sort((a, b) => {
        if (b.score !== a.score) {
          return b.score - a.score // Higher score first
        }
        return a.time_taken - b.time_taken // Lower time first for same score
      })
      .slice(0, 10) // Top 10 only
    
    return weeklyAttempts
  }

  async getUserWeeklyRank(userId, weekNumber = null) {
    await delay(200)
    
    const currentWeek = weekNumber || getWeekNumber(new Date())
    const leaderboard = await this.getWeeklyLeaderboard(currentWeek)
    
    const userRank = leaderboard.findIndex(attempt => attempt.user_id === userId) + 1
    return userRank || null
  }

  async createAttempt(attemptData) {
    await delay(400)
    
    try {
      const newId = Math.max(...this.attempts.map(a => a.Id), 0) + 1
      const currentWeek = getWeekNumber(new Date())
      
      const newAttempt = {
        Id: newId,
        user_id: attemptData.user_id,
        user_name: attemptData.user_name,
        score: attemptData.score,
        time_taken: attemptData.time_taken,
        quiz_date: new Date().toISOString(),
        week_number: currentWeek,
        total_questions: attemptData.total_questions || 10
      }
      
      this.attempts.push(newAttempt)
      return { ...newAttempt }
    } catch (error) {
      throw new Error("Failed to save quiz attempt")
    }
  }

  async getWeeklyStats(weekNumber = null) {
    await delay(250)
    
    const currentWeek = weekNumber || getWeekNumber(new Date())
    const weeklyAttempts = this.attempts.filter(attempt => attempt.week_number === currentWeek)
    
    if (weeklyAttempts.length === 0) {
      return {
        totalAttempts: 0,
        averageScore: 0,
        highestScore: 0,
        averageTime: 0
      }
    }
    
    const totalScore = weeklyAttempts.reduce((sum, attempt) => sum + attempt.score, 0)
    const totalTime = weeklyAttempts.reduce((sum, attempt) => sum + attempt.time_taken, 0)
    
    return {
      totalAttempts: weeklyAttempts.length,
      averageScore: Math.round((totalScore / weeklyAttempts.length) * 10) / 10,
      highestScore: Math.max(...weeklyAttempts.map(a => a.score)),
      averageTime: Math.round(totalTime / weeklyAttempts.length)
    }
  }

  async getUserBestScore(userId) {
    await delay(200)
    
    const userAttempts = this.attempts.filter(attempt => attempt.user_id === userId)
    if (userAttempts.length === 0) {
      return null
    }
    
    return Math.max(...userAttempts.map(a => a.score))
  }
}

export default new QuizAttemptService()