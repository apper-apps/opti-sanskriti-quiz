import { getCurrentWeek } from "@/utils/dateHelpers"
import ApperIcon from "@/components/ApperIcon"

const Footer = () => {
  const currentWeek = getCurrentWeek()
  
  return (
    <footer className="bg-gradient-to-r from-saddle-brown to-saffron text-white py-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-gold to-white/20 rounded-full flex items-center justify-center">
                <ApperIcon name="Sparkles" className="w-6 h-6 text-white" />
              </div>
              <div className="text-xl font-bold font-vesper">
                SanskritiQuiz
              </div>
            </div>
            <p className="text-white/80 font-hind leading-relaxed">
              Celebrating the wisdom of our sacred texts through interactive learning and community engagement.
            </p>
          </div>
          
          {/* Current Week Info */}
          <div className="text-center">
            <h3 className="text-lg font-semibold font-vesper mb-4">Current Week</h3>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="text-2xl font-bold font-vesper text-gold mb-2">
                Week {currentWeek.weekNumber}
              </div>
              <div className="text-white/80 font-hind">
                {currentWeek.startDate} - {currentWeek.endDate}
              </div>
              <div className="mt-3 text-sm text-gold font-vesper">
                New quiz every Monday!
              </div>
            </div>
          </div>
          
          {/* Sacred Inspiration */}
          <div className="text-center md:text-right">
            <h3 className="text-lg font-semibold font-vesper mb-4">Sacred Wisdom</h3>
            <div className="sanskrit-text text-gold font-vesper text-lg mb-2">
              सर्वे भवन्तु सुखिनः
            </div>
            <p className="text-white/80 font-hind text-sm mb-3">
              May all beings be happy
            </p>
            <div className="flex justify-center md:justify-end space-x-3">
              <div className="w-8 h-8 bg-gold/20 rounded-full flex items-center justify-center">
                <ApperIcon name="Heart" className="w-4 h-4 text-gold" />
              </div>
              <div className="w-8 h-8 bg-gold/20 rounded-full flex items-center justify-center">
                <ApperIcon name="Star" className="w-4 h-4 text-gold" />
              </div>
              <div className="w-8 h-8 bg-gold/20 rounded-full flex items-center justify-center">
                <ApperIcon name="Sparkles" className="w-4 h-4 text-gold" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="mt-8 pt-6 border-t border-white/20">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="text-white/70 font-hind text-sm mb-2 sm:mb-0">
              © 2024 SanskritiQuiz. Preserving ancient wisdom for modern minds.
            </div>
            <div className="flex items-center space-x-4 text-white/70 font-hind text-sm">
              <div className="flex items-center space-x-1">
                <ApperIcon name="Shield" className="w-4 h-4" />
                <span>Privacy Protected</span>
              </div>
              <div className="flex items-center space-x-1">
                <ApperIcon name="BookOpen" className="w-4 h-4" />
                <span>Weekly Updates</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer