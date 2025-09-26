import { useState, useContext } from "react"
import { Link, useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/utils/cn"
import { getCurrentWeek, getSanskritBlessing } from "@/utils/dateHelpers"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"
// Authentication handled by backend - no auth context needed
const Header = () => {
// No logout functionality needed - backend manages authentication
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()
  const currentWeek = getCurrentWeek()
  
const navigationItems = [
    { name: "Home", path: "/", icon: "Home" },
    { name: "Start Quiz", path: "/entry", icon: "BookOpen" },
    { name: "Leaderboard", path: "/leaderboard", icon: "Trophy" },
  ]
  
  const isActivePath = (path) => {
    if (path === "/" && location.pathname === "/") return true
    if (path !== "/" && location.pathname.startsWith(path)) return true
    return false
  }
  
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b-2 border-gold/20 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo and Brand */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 bg-gradient-to-br from-saffron to-gold rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
              <ApperIcon name="Sparkles" className="w-7 h-7 text-white" />
            </div>
            <div className="hidden sm:block">
              <div className="text-2xl font-bold font-vesper bg-gradient-to-r from-saffron to-gold bg-clip-text text-transparent">
                SanskritiQuiz
              </div>
              <div className="text-xs text-saddle-brown/70 font-hind">
                Week {currentWeek.weekNumber} • {currentWeek.startDate} - {currentWeek.endDate}
              </div>
            </div>
          </Link>
          
{/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "flex items-center space-x-2 px-4 py-2 rounded-lg font-medium font-hind transition-all duration-200",
                  "hover:bg-cornsilk/50 hover:text-saffron",
                  isActivePath(item.path)
                    ? "bg-gradient-to-r from-saffron/10 to-gold/10 text-saffron border border-saffron/20"
                    : "text-saddle-brown"
                )}
              >
                <ApperIcon name={item.icon} className="w-5 h-5" />
                <span>{item.name}</span>
              </Link>
            ))}
            
            {/* Logout Button */}
{/* Authentication managed by backend - no logout button needed */}
          </nav>
          
          {/* Sanskrit Blessing (Desktop) */}
          <div className="hidden xl:block text-right">
            <div className="text-sm sanskrit-text font-vesper mb-1">
              {getSanskritBlessing()}
            </div>
            <div className="text-xs text-saddle-brown/60 font-hind">
              Sacred Wisdom
            </div>
          </div>
          
{/* Desktop Logout Button and Mobile Menu */}
          <div className="flex items-center space-x-2">
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <ApperIcon 
                name={isMobileMenuOpen ? "X" : "Menu"} 
                className="w-6 h-6" 
              />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="lg:hidden fixed inset-0 top-[88px] bg-white/95 backdrop-blur-md z-40"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <div className="p-6">
{/* Mobile Navigation */}
              <nav className="space-y-2 mb-8">
                {navigationItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={item.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center space-x-3 px-4 py-3 rounded-xl font-medium font-hind transition-all duration-200",
                        "hover:bg-cornsilk/50 hover:text-saffron",
                        isActivePath(item.path)
                          ? "bg-gradient-to-r from-saffron/10 to-gold/10 text-saffron border border-saffron/20"
                          : "text-saddle-brown"
                      )}
                    >
                      <ApperIcon name={item.icon} className="w-6 h-6" />
                      <span className="text-lg">{item.name}</span>
                    </Link>
                  </motion.div>
                ))}
                
{/* Authentication handled by backend - no mobile logout needed */}
              </nav>
              
              {/* Mobile Week Info */}
              <motion.div
                className="p-4 bg-gradient-to-r from-cornsilk to-floral-white rounded-xl border border-gold/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="text-center">
                  <div className="text-lg font-bold font-vesper text-saddle-brown mb-1">
                    Week {currentWeek.weekNumber}
                  </div>
                  <div className="text-sm text-saddle-brown/70 font-hind mb-3">
                    {currentWeek.startDate} - {currentWeek.endDate}
                  </div>
                  <div className="text-sm sanskrit-text font-vesper text-saffron">
                    {getSanskritBlessing()}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Header