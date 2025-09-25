import usersData from "@/services/mockData/users.json"

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

class UserService {
  constructor() {
    this.users = [...usersData]
  }

  async getAllUsers() {
    await delay(250)
    return [...this.users]
  }

  async getUserById(id) {
    await delay(200)
    const user = this.users.find(u => u.Id === parseInt(id))
    if (!user) {
      throw new Error("User not found")
    }
    return { ...user }
  }

  async createUser(userData) {
    await delay(300)
    
    try {
      // Check if user with this mobile already exists
      const existingUser = this.users.find(u => u.mobile === userData.mobile)
      if (existingUser) {
        return { ...existingUser }
      }
      
      const newId = Math.max(...this.users.map(u => u.Id), 0) + 1
      const newUser = {
        Id: newId,
        name: userData.name,
        mobile: userData.mobile,
        created_at: new Date().toISOString()
      }
      
      this.users.push(newUser)
      return { ...newUser }
    } catch (error) {
      throw new Error("Failed to create user")
    }
  }

  async findUserByMobile(mobile) {
    await delay(200)
    
    const user = this.users.find(u => u.mobile === mobile)
    return user ? { ...user } : null
  }

  async updateUser(id, userData) {
    await delay(250)
    
    try {
      const userIndex = this.users.findIndex(u => u.Id === parseInt(id))
      if (userIndex === -1) {
        throw new Error("User not found")
      }
      
      this.users[userIndex] = {
        ...this.users[userIndex],
        ...userData,
        Id: parseInt(id) // Ensure ID doesn't change
      }
      
      return { ...this.users[userIndex] }
    } catch (error) {
      throw new Error("Failed to update user")
    }
  }

  validateUserData(userData) {
    const errors = []
    
    if (!userData.name || userData.name.trim().length < 2) {
      errors.push("Name must be at least 2 characters long")
    }
    
    if (!userData.mobile || !/^[6-9]\d{9}$/.test(userData.mobile)) {
      errors.push("Please enter a valid 10-digit mobile number")
    }
    
    return {
      isValid: errors.length === 0,
      errors
    }
  }
}

export default new UserService()