import { getWeekNumber } from "@/utils/dateHelpers"

class QuizAttemptService {
  constructor() {
    const { ApperClient } = window.ApperSDK
    this.apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    })
    this.tableName = 'quiz_attempt_c'
  }

  async getAllAttempts() {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "user_id_c" } },
          { field: { Name: "user_name_c" } },
          { field: { Name: "score_c" } },
          { field: { Name: "time_taken_c" } },
          { field: { Name: "quiz_date_c" } },
          { field: { Name: "week_number_c" } },
          { field: { Name: "total_questions_c" } }
        ],
        pagingInfo: {
          limit: 1000,
          offset: 0
        }
      }
      
      const response = await this.apperClient.fetchRecords(this.tableName, params)
      
      if (!response.success) {
        console.error(response.message)
        throw new Error(response.message)
      }
      
      return response.data || []
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching all quiz attempts:", error.response.data.message)
      } else {
        console.error(error)
      }
      throw new Error("Failed to fetch quiz attempts")
    }
  }

  async getAttemptById(id) {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "user_id_c" } },
          { field: { Name: "user_name_c" } },
          { field: { Name: "score_c" } },
          { field: { Name: "time_taken_c" } },
          { field: { Name: "quiz_date_c" } },
          { field: { Name: "week_number_c" } },
          { field: { Name: "total_questions_c" } }
        ]
      }
      
      const response = await this.apperClient.getRecordById(this.tableName, id, params)
      
      if (!response.success) {
        console.error(response.message)
        throw new Error(response.message)
      }
      
      if (!response.data) {
        throw new Error("Quiz attempt not found")
      }
      
      return response.data
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching quiz attempt by ID:", error.response.data.message)
      } else {
        console.error(error)
      }
      throw new Error("Failed to fetch quiz attempt")
    }
  }

  async getWeeklyLeaderboard(weekNumber = null) {
    try {
      const currentWeek = weekNumber || getWeekNumber(new Date())
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "user_id_c" } },
          { field: { Name: "user_name_c" } },
          { field: { Name: "score_c" } },
          { field: { Name: "time_taken_c" } },
          { field: { Name: "quiz_date_c" } },
          { field: { Name: "week_number_c" } },
          { field: { Name: "total_questions_c" } }
        ],
        where: [
          {
            FieldName: "week_number_c",
            Operator: "EqualTo",
            Values: [currentWeek.toString()]
          }
        ],
        orderBy: [
          {
            fieldName: "score_c",
            sorttype: "DESC"
          },
          {
            fieldName: "time_taken_c", 
            sorttype: "ASC"
          }
        ],
        pagingInfo: {
          limit: 10,
          offset: 0
        }
      }
      
      const response = await this.apperClient.fetchRecords(this.tableName, params)
      
      if (!response.success) {
        console.error(response.message)
        return []
      }
      
      return response.data || []
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching weekly leaderboard:", error.response.data.message)
      } else {
        console.error(error)
      }
      return []
    }
  }

  async getUserWeeklyRank(userId, weekNumber = null) {
    try {
      const leaderboard = await this.getWeeklyLeaderboard(weekNumber)
      const userRank = leaderboard.findIndex(attempt => 
        attempt.user_id_c?.Id === userId || attempt.user_id_c === userId
      ) + 1
      return userRank || null
    } catch (error) {
      console.error("Error getting user weekly rank:", error)
      return null
    }
  }

  async createAttempt(attemptData) {
    try {
      const currentWeek = getWeekNumber(new Date())
      
      const params = {
        records: [{
          Name: `Quiz Attempt - ${attemptData.user_name_c}`,
          user_id_c: parseInt(attemptData.user_id_c),
          user_name_c: attemptData.user_name_c,
          score_c: attemptData.score_c,
          time_taken_c: attemptData.time_taken_c,
          quiz_date_c: new Date().toISOString(),
          week_number_c: currentWeek,
          total_questions_c: attemptData.total_questions_c || 10
        }]
      }
      
      const response = await this.apperClient.createRecord(this.tableName, params)
      
      if (!response.success) {
        console.error(response.message)
        throw new Error(response.message)
      }
      
      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success)
        const failedRecords = response.results.filter(result => !result.success)
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create quiz attempt ${failedRecords.length} records:${JSON.stringify(failedRecords)}`)
          
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              console.error(`${error.fieldLabel}: ${error}`)
            })
            if (record.message) console.error(record.message)
          })
        }
        
        if (successfulRecords.length > 0) {
          return successfulRecords[0].data
        }
      }
      
      throw new Error("Failed to create quiz attempt")
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating quiz attempt:", error.response.data.message)
      } else {
        console.error(error)
      }
      throw new Error("Failed to save quiz attempt")
    }
  }

  async getWeeklyStats(weekNumber = null) {
    try {
      const currentWeek = weekNumber || getWeekNumber(new Date())
      
      const params = {
        fields: [
          { field: { Name: "score_c" } },
          { field: { Name: "time_taken_c" } }
        ],
        where: [
          {
            FieldName: "week_number_c",
            Operator: "EqualTo",
            Values: [currentWeek.toString()]
          }
        ],
        pagingInfo: {
          limit: 1000,
          offset: 0
        }
      }
      
      const response = await this.apperClient.fetchRecords(this.tableName, params)
      
      if (!response.success) {
        console.error(response.message)
        return {
          totalAttempts: 0,
          averageScore: 0,
          highestScore: 0,
          averageTime: 0
        }
      }
      
      const weeklyAttempts = response.data || []
      
      if (weeklyAttempts.length === 0) {
        return {
          totalAttempts: 0,
          averageScore: 0,
          highestScore: 0,
          averageTime: 0
        }
      }
      
      const totalScore = weeklyAttempts.reduce((sum, attempt) => sum + attempt.score_c, 0)
      const totalTime = weeklyAttempts.reduce((sum, attempt) => sum + attempt.time_taken_c, 0)
      
      return {
        totalAttempts: weeklyAttempts.length,
        averageScore: Math.round((totalScore / weeklyAttempts.length) * 10) / 10,
        highestScore: Math.max(...weeklyAttempts.map(a => a.score_c)),
        averageTime: Math.round(totalTime / weeklyAttempts.length)
      }
    } catch (error) {
      console.error("Error getting weekly stats:", error)
      return {
        totalAttempts: 0,
        averageScore: 0,
        highestScore: 0,
        averageTime: 0
      }
    }
  }

  async getUserBestScore(userId) {
    try {
      const params = {
        fields: [
          { field: { Name: "score_c" } }
        ],
        where: [
          {
            FieldName: "user_id_c",
            Operator: "EqualTo",
            Values: [userId.toString()]
          }
        ],
        orderBy: [
          {
            fieldName: "score_c",
            sorttype: "DESC"
          }
        ],
        pagingInfo: {
          limit: 1,
          offset: 0
        }
      }
      
      const response = await this.apperClient.fetchRecords(this.tableName, params)
      
      if (!response.success) {
        console.error(response.message)
        return null
      }
      
      const userAttempts = response.data || []
      if (userAttempts.length === 0) {
        return null
      }
      
      return userAttempts[0].score_c
    } catch (error) {
      console.error("Error getting user best score:", error)
      return null
    }
  }
}

export default new QuizAttemptService()