import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { getCurrentWeek, getSanskritBlessing } from "@/utils/dateHelpers"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"
import Card from "@/components/atoms/Card"

const Homepage = () => {
  const currentWeek = getCurrentWeek()
  const blessing = getSanskritBlessing()
  
  const features = [
    {
      icon: "BookOpen",
      title: "Sacred Knowledge",
      description: "Test your understanding of Bhagavad Gita, Puranas, and ancient scriptures"
    },
    {
      icon: "Trophy",
      title: "Weekly Championships",
      description: "Compete with fellow devotees and earn your place on the leaderboard"
    },
    {
      icon: "Award",
      title: "Digital Certificates",
      description: "Share your achievements with beautiful, personalized certificates"
    },
    {
      icon: "Users",
      title: "Community Learning",
      description: "Join a community passionate about preserving ancient wisdom"
    }
  ]
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            {/* Hero Content */}
            <motion.div
              className="mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Week Badge */}
              <motion.div
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-saffron/10 to-gold/10 px-4 py-2 rounded-full border border-gold/30 mb-6"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <ApperIcon name="Calendar" className="w-4 h-4 text-saffron" />
                <span className="text-saddle-brown font-medium font-hind">
                  Week {currentWeek.weekNumber} • {currentWeek.startDate} - {currentWeek.endDate}
                </span>
              </motion.div>
              
              {/* Main Title */}
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-vesper mb-6">
                <span className="bg-gradient-to-r from-saffron to-gold bg-clip-text text-transparent">
                  SanskritiQuiz
                </span>
              </h1>
              
              {/* Sanskrit Blessing */}
              <motion.div
                className="mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="sanskrit-text text-2xl md:text-3xl text-saddle-brown font-vesper mb-2">
                  {blessing}
                </div>
                <div className="text-saddle-brown/70 font-hind">
                  Weekly Mythology & Scripture Quiz
                </div>
              </motion.div>
              
              {/* Subtitle */}
              <motion.p
                className="text-xl md:text-2xl text-saddle-brown/80 font-hind max-w-3xl mx-auto mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                Test your knowledge of Indian Mythology, Shastras, Puranas & Bhagavad Gita. 
                Compete weekly and celebrate the wisdom of our sacred texts!
              </motion.p>
              
              {/* CTA Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <Link to="/entry">
                  <Button size="xl" className="paisley-decoration text-xl px-8 py-4">
                    <ApperIcon name="Play" className="w-6 h-6 mr-2" />
                    Start This Week's Quiz
                  </Button>
                </Link>
                
                <Link to="/leaderboard">
                  <Button variant="outline" size="xl" className="text-xl px-8 py-4">
                    <ApperIcon name="Trophy" className="w-6 h-6 mr-2" />
                    View Leaderboard
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
        
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 -z-10 lotus-pattern opacity-5"></div>
        <div className="absolute top-20 left-10 w-20 h-20 bg-gold/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-saffron/10 rounded-full blur-3xl"></div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold font-vesper text-saddle-brown mb-4 paisley-decoration">
              Why Choose SanskritiQuiz?
            </h2>
            <p className="text-lg text-saddle-brown/70 font-hind max-w-2xl mx-auto">
              Experience the perfect blend of ancient wisdom and modern technology
            </p>
          </motion.div>
          
          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="p-6 text-center h-full hover:shadow-2xl transition-all duration-300 group">
                  <div className="w-16 h-16 bg-gradient-to-br from-saffron to-gold rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <ApperIcon name={feature.icon} className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold font-vesper text-saddle-brown mb-3">
                    {feature.title}
                  </h3>
                  
                  <p className="text-saddle-brown/70 font-hind">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Quiz Info Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-cornsilk to-floral-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card variant="ornate" className="p-8 lg:p-12 text-center">
              <ApperIcon name="Clock" className="w-16 h-16 text-saffron mx-auto mb-6" />
              
              <h2 className="text-3xl font-bold font-vesper text-saddle-brown mb-6 paisley-decoration">
                How It Works
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-saffron to-gold rounded-full flex items-center justify-center mx-auto text-white font-bold text-xl">
                    1
                  </div>
                  <h3 className="font-bold font-vesper text-saddle-brown">Enter Your Details</h3>
                  <p className="text-saddle-brown/70 font-hind text-sm">
                    Just your name and mobile number (kept private)
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-saffron to-gold rounded-full flex items-center justify-center mx-auto text-white font-bold text-xl">
                    2
                  </div>
                  <h3 className="font-bold font-vesper text-saddle-brown">Answer 10 Questions</h3>
                  <p className="text-saddle-brown/70 font-hind text-sm">
                    5 minutes timer with instant feedback
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-saffron to-gold rounded-full flex items-center justify-center mx-auto text-white font-bold text-xl">
                    3
                  </div>
                  <h3 className="font-bold font-vesper text-saddle-brown">Get Your Certificate</h3>
                  <p className="text-saddle-brown/70 font-hind text-sm">
                    Download and share your achievement
                  </p>
                </div>
              </div>
              
              {/* Privacy Notice */}
              <div className="bg-white/50 rounded-lg p-4 mb-6 border border-gold/20">
                <div className="flex items-center justify-center space-x-2 text-success">
                  <ApperIcon name="Shield" className="w-5 h-5" />
                  <span className="font-medium font-hind">
                    Privacy Protected - We never share your mobile number
                  </span>
                </div>
              </div>
              
              <Link to="/entry">
                <Button size="xl" className="text-xl px-8 py-4">
                  <ApperIcon name="Sparkles" className="w-6 h-6 mr-2" />
                  Begin Your Journey
                </Button>
              </Link>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Homepage