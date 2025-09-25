import React from 'react'
import { useSearchParams, Link } from 'react-router-dom'

const ErrorPage = () => {
  const [searchParams] = useSearchParams()
  const errorMessage = searchParams.get('message') || 'An error occurred'
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-floral-white to-cornsilk">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg text-center border border-gold/20">
        <h1 className="text-2xl font-bold text-error mb-4 font-vesper">Authentication Error</h1>
        <p className="text-saddle-brown/70 mb-6 font-hind">{errorMessage}</p>
        <Link to="/login" className="inline-block px-6 py-3 bg-gradient-to-r from-saffron to-gold text-white rounded-md hover:from-gold hover:to-saffron transition-colors">
          Return to Login
        </Link>
      </div>
    </div>
  )
}

export default ErrorPage