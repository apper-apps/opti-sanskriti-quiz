import questionsData from "@/services/mockData/questions.json"

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

class QuestionService {
  async getRandomQuestions(count = 10) {
    await delay(300)
    
    try {
      // Shuffle questions and take the requested count
      const shuffled = [...questionsData].sort(() => 0.5 - Math.random())
      return shuffled.slice(0, count)
    } catch (error) {
      throw new Error("Failed to fetch questions")
    }
  }

  async getQuestionById(id) {
    await delay(200)
    
    try {
      const question = questionsData.find(q => q.Id === parseInt(id))
      if (!question) {
        throw new Error("Question not found")
      }
      return question
    } catch (error) {
      throw new Error("Failed to fetch question")
    }
  }

  async getAllQuestions() {
    await delay(250)
    
    try {
      return [...questionsData]
    } catch (error) {
      throw new Error("Failed to fetch all questions")
    }
  }

  checkAnswer(questionId, selectedOption) {
    const question = questionsData.find(q => q.Id === parseInt(questionId))
    if (!question) {
      return false
    }
    return question.correct_option === selectedOption
  }

  getCorrectAnswer(questionId) {
    const question = questionsData.find(q => q.Id === parseInt(questionId))
    return question ? question.correct_option : null
  }

  getQuestionStats() {
    const stats = {
      total: questionsData.length,
      categories: {},
      difficulties: {}
    }

    questionsData.forEach(q => {
      stats.categories[q.category] = (stats.categories[q.category] || 0) + 1
      stats.difficulties[q.difficulty] = (stats.difficulties[q.difficulty] || 0) + 1
    })

    return stats
  }
}

export default new QuestionService()