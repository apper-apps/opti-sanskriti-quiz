import { Link } from 'react-router-dom'
import ApperIcon from '@/components/ApperIcon'

function Login() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-floral-white to-cornsilk">
      <div className="w-full max-w-md space-y-8 p-8 bg-white rounded-lg shadow-md border border-gold/20">
        <div className="flex flex-col gap-6 items-center justify-center">
          <div className="w-14 h-14 shrink-0 rounded-xl flex items-center justify-center bg-gradient-to-r from-saffron to-gold text-white text-2xl 2xl:text-3xl font-bold">
            S
          </div>
          <div className="flex flex-col gap-1 items-center justify-center">
            <div className="text-center text-lg xl:text-xl font-bold font-vesper text-saddle-brown">
              Authentication Managed by Backend
            </div>
            <div className="text-center text-sm text-saddle-brown/70 font-hind">
              No sign-in required - start taking quizzes directly
            </div>
          </div>
        </div>
        
        <div className="text-center space-y-4">
          <div className="p-4 bg-gradient-to-r from-success/10 to-green-100 rounded-xl border border-success/20">
            <div className="flex items-center justify-center space-x-2 text-success mb-2">
              <ApperIcon name="Shield" className="w-5 h-5" />
              <span className="font-medium font-hind">Backend Authentication</span>
            </div>
            <p className="text-sm text-success/80 font-hind">
              User authentication and database management is handled automatically by our backend system.
            </p>
          </div>
          
          <Link 
            to="/" 
            className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-saffron to-gold text-white rounded-lg hover:shadow-lg transition-all duration-200 font-hind font-medium"
          >
            <ApperIcon name="Home" className="w-5 h-5" />
            <span>Go to Homepage</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login