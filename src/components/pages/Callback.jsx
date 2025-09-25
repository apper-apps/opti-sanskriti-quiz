import React from 'react'
import { Link } from 'react-router-dom'
import ApperIcon from '@/components/ApperIcon'

const Callback = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-floral-white to-cornsilk">
      <div className="w-full max-w-md space-y-8 p-8 bg-white rounded-lg shadow-md border border-gold/20 text-center">
        <div className="flex flex-col gap-6 items-center justify-center">
          <div className="w-14 h-14 shrink-0 rounded-xl flex items-center justify-center bg-gradient-to-r from-saffron to-gold text-white text-2xl 2xl:text-3xl font-bold">
            S
          </div>
          <div className="flex flex-col gap-1 items-center justify-center">
            <div className="text-center text-lg xl:text-xl font-bold font-vesper text-saddle-brown">
              Backend Authentication Active
            </div>
            <div className="text-center text-sm text-saddle-brown/70 font-hind">
              No callback authentication needed
            </div>
          </div>
        </div>
        
        <Link 
          to="/" 
          className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-saffron to-gold text-white rounded-lg hover:shadow-lg transition-all duration-200 font-hind font-medium"
        >
          <ApperIcon name="Home" className="w-5 h-5" />
          <span>Return to Homepage</span>
        </Link>
      </div>
    </div>
  )
}

export default Callback