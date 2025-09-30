class UserService {
  constructor() {
    const { ApperClient } = window.ApperSDK
    this.apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    })
    this.tableName = 'user_c'
  }

  async getAllUsers() {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "name_c" } },
          { field: { Name: "mobile_c" } },
          { field: { Name: "created_at_c" } }
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
        console.error("Error fetching all users:", error.response.data.message)
      } else {
        console.error(error)
      }
      throw new Error("Failed to fetch users")
    }
  }

  async getUserById(id) {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "name_c" } },
          { field: { Name: "mobile_c" } },
          { field: { Name: "created_at_c" } }
        ]
      }
      
      const response = await this.apperClient.getRecordById(this.tableName, id, params)
      
      if (!response.success) {
        console.error(response.message)
        throw new Error(response.message)
      }
      
      if (!response.data) {
        throw new Error("User not found")
      }
      
      return response.data
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching user by ID:", error.response.data.message)
      } else {
        console.error(error)
      }
      throw new Error("Failed to fetch user")
    }
  }

  async createUser(userData) {
    try {
      // Check if user with this mobile already exists
      const existingUser = await this.findUserByMobile(userData.mobile_c || userData.mobile)
      if (existingUser) {
        return existingUser
      }
      
      const params = {
        records: [{
          Name: userData.name_c || userData.name,
          name_c: userData.name_c || userData.name,
          mobile_c: userData.mobile_c || userData.mobile,
          created_at_c: new Date().toISOString()
        }]
      }
      
const response = await this.apperClient.createRecord(this.tableName, params)
      
      if (!response || !response.success) {
        const errorMessage = response?.message || "Failed to create user account"
        console.error("User creation failed:", errorMessage)
        throw new Error(errorMessage)
      }
      
      if (response.results && Array.isArray(response.results)) {
        const successfulRecords = response.results.filter(result => result && result.success)
        const failedRecords = response.results.filter(result => result && !result.success)
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create user ${failedRecords.length} records:${JSON.stringify(failedRecords)}`)
          
          failedRecords.forEach(record => {
            if (record.errors && Array.isArray(record.errors)) {
              record.errors.forEach(error => {
                console.error(`${error.fieldLabel || 'Field'}: ${error.message || error}`)
              })
            }
            if (record.message) {
              console.error("Record error:", record.message)
            }
          })
          
          // If all records failed, throw the first error
          if (successfulRecords.length === 0) {
            const firstError = failedRecords[0]
            const errorMsg = firstError?.message || "Failed to create user account"
            throw new Error(errorMsg)
          }
        }
        
        if (successfulRecords.length > 0 && successfulRecords[0].data) {
          return successfulRecords[0].data
        }
      }
      
      throw new Error("No user data returned from server")
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating user in userService:", error.response.data.message)
        throw new Error(error.response.data.message)
      } else if (error.message) {
        console.error("Error creating user in userService:", error.message)
        throw new Error(error.message)
      } else {
        console.error("Error creating user in userService:", error)
        throw new Error("An unexpected error occurred while creating your account")
      }
    }
  }

  async findUserByMobile(mobile) {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "name_c" } },
          { field: { Name: "mobile_c" } },
          { field: { Name: "created_at_c" } }
        ],
        where: [
          {
            FieldName: "mobile_c",
            Operator: "EqualTo",
            Values: [mobile]
          }
        ],
        pagingInfo: {
          limit: 1,
          offset: 0
        }
      }
      
const response = await this.apperClient.fetchRecords(this.tableName, params)
      
      if (!response || !response.success) {
        console.error("Failed to find user by mobile:", response?.message || "Unknown error")
        return null
      }
      
      const users = response.data || []
      return users.length > 0 ? users[0] : null
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error finding user by mobile:", error.response.data.message)
      } else {
        console.error("Error finding user by mobile:", error.message || error)
      }
      return null
    }
  }

  async updateUser(id, userData) {
    try {
      const params = {
        records: [{
          Id: parseInt(id),
          Name: userData.name_c || userData.name,
          name_c: userData.name_c || userData.name,
          mobile_c: userData.mobile_c || userData.mobile
        }]
      }
      
      const response = await this.apperClient.updateRecord(this.tableName, params)
      
      if (!response.success) {
        console.error(response.message)
        throw new Error(response.message)
      }
      
      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success)
        const failedUpdates = response.results.filter(result => !result.success)
        
        if (failedUpdates.length > 0) {
          console.error(`Failed to update user ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`)
          
          failedUpdates.forEach(record => {
            record.errors?.forEach(error => {
              console.error(`${error.fieldLabel}: ${error}`)
            })
            if (record.message) console.error(record.message)
          })
        }
        
        if (successfulUpdates.length > 0) {
          return successfulUpdates[0].data
        }
      }
      
      throw new Error("Failed to update user")
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating user:", error.response.data.message)
      } else {
        console.error(error)
      }
      throw new Error("Failed to update user")
    }
  }

  validateUserData(userData) {
    const errors = []
    const name = userData.name_c || userData.name
    const mobile = userData.mobile_c || userData.mobile
    
if (!name || name.trim().length < 2) {
      errors.push("Name must be at least 2 characters long")
    } else if (name.trim().length > 100) {
      errors.push("Name cannot exceed 100 characters")
    }
    
    if (!mobile || mobile.trim().length === 0) {
      errors.push("Mobile number is required")
    } else if (!/^[6-9]\d{9}$/.test(mobile.trim())) {
      errors.push("Please enter a valid 10-digit mobile number starting with 6, 7, 8, or 9")
    }
    
    return {
      isValid: errors.length === 0,
      errors
    }
  }
}

export default new UserService()