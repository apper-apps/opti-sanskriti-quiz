class QuestionService {
  constructor() {
    const { ApperClient } = window.ApperSDK
    this.apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    })
    this.tableName = 'question_c'
  }

  async getRandomQuestions(count = 10) {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "question_text_c" } },
          { field: { Name: "option_a_c" } },
          { field: { Name: "option_b_c" } },
          { field: { Name: "option_c_c" } },
          { field: { Name: "option_d_c" } },
          { field: { Name: "correct_option_c" } },
          { field: { Name: "category_c" } },
          { field: { Name: "difficulty_c" } }
        ],
        pagingInfo: {
          limit: count * 3, // Fetch more to allow for randomization
          offset: 0
        }
      }
      
      const response = await this.apperClient.fetchRecords(this.tableName, params)
      
      if (!response.success) {
        console.error(response.message)
        throw new Error(response.message)
      }
      
      // Shuffle questions and take the requested count
      const shuffled = [...response.data].sort(() => 0.5 - Math.random())
      return shuffled.slice(0, count)
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching random questions:", error.response.data.message)
      } else {
        console.error(error)
      }
      throw new Error("Failed to fetch questions")
    }
  }

  async getQuestionById(id) {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "question_text_c" } },
          { field: { Name: "option_a_c" } },
          { field: { Name: "option_b_c" } },
          { field: { Name: "option_c_c" } },
          { field: { Name: "option_d_c" } },
          { field: { Name: "correct_option_c" } },
          { field: { Name: "category_c" } },
          { field: { Name: "difficulty_c" } }
        ]
      }
      
      const response = await this.apperClient.getRecordById(this.tableName, id, params)
      
      if (!response.success) {
        console.error(response.message)
        throw new Error(response.message)
      }
      
      if (!response.data) {
        throw new Error("Question not found")
      }
      
      return response.data
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching question by ID:", error.response.data.message)
      } else {
        console.error(error)
      }
      throw new Error("Failed to fetch question")
    }
  }

  async getAllQuestions() {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "question_text_c" } },
          { field: { Name: "option_a_c" } },
          { field: { Name: "option_b_c" } },
          { field: { Name: "option_c_c" } },
          { field: { Name: "option_d_c" } },
          { field: { Name: "correct_option_c" } },
          { field: { Name: "category_c" } },
          { field: { Name: "difficulty_c" } }
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
        console.error("Error fetching all questions:", error.response.data.message)
      } else {
        console.error(error)
      }
      throw new Error("Failed to fetch all questions")
    }
  }

  checkAnswer(questionId, selectedOption) {
    // This method will be used with cached question data during quiz
    return this.cachedQuestions?.find(q => q.Id === parseInt(questionId))?.correct_option_c === selectedOption || false
  }

  getCorrectAnswer(questionId) {
    // This method will be used with cached question data during quiz
    return this.cachedQuestions?.find(q => q.Id === parseInt(questionId))?.correct_option_c || null
  }

  setCachedQuestions(questions) {
    this.cachedQuestions = questions
  }

  async getQuestionStats() {
    try {
      const questions = await this.getAllQuestions()
      const stats = {
        total: questions.length,
        categories: {},
        difficulties: {}
      }

      questions.forEach(q => {
        stats.categories[q.category_c] = (stats.categories[q.category_c] || 0) + 1
        stats.difficulties[q.difficulty_c] = (stats.difficulties[q.difficulty_c] || 0) + 1
      })

      return stats
    } catch (error) {
      console.error("Error getting question stats:", error)
      return { total: 0, categories: {}, difficulties: {} }
    }
  }
}

export default new QuestionService()