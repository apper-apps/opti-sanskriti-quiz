import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { format } from "date-fns"
import { getCurrentWeek, getSanskritBlessing } from "@/utils/dateHelpers"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"
import Card from "@/components/atoms/Card"
import Loading from "@/components/ui/Loading"
import { toast } from "react-toastify"

const Homepage = () => {
const currentWeek = getCurrentWeek()
  const blessing = getSanskritBlessing()
  
  // State for Panchang and Ekadashi data
  const [panchangData, setPanchangData] = useState(null)
  const [ekadashiData, setEkadashiData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch spiritual data on component mount
  useEffect(() => {
    const fetchSpiritualData = async () => {
      try {
        setLoading(true)
        
        // Initialize ApperClient
        const { ApperClient } = window.ApperSDK;
        const apperClient = new ApperClient({
          apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
          apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
        });

        // Fetch current Panchang data
        const panchangParams = {
          fields: [
            { field: { Name: "Name" } },
            { field: { Name: "day_c" } },
            { field: { Name: "tithi_c" } },
            { field: { Name: "nakshatra_c" } },
            { field: { Name: "yoga_c" } },
            { field: { Name: "karana_c" } }
          ],
          orderBy: [{ fieldName: "CreatedOn", sorttype: "DESC" }],
          pagingInfo: { limit: 1, offset: 0 }
        }

        const panchangResponse = await apperClient.fetchRecords("panchang_c", panchangParams)
        
        if (panchangResponse?.success && panchangResponse?.data?.length > 0) {
          setPanchangData(panchangResponse.data[0])
        }

        // Fetch next Ekadashi
        const today = new Date().toISOString().split('T')[0]
        const ekadashiParams = {
          fields: [
            { field: { Name: "Name" } },
            { field: { Name: "event_name_c" } },
            { field: { Name: "date_c" } }
          ],
          where: [
            {
              FieldName: "date_c",
              Operator: "GreaterThanOrEqualTo",
              Values: [today]
            }
          ],
          orderBy: [{ fieldName: "date_c", sorttype: "ASC" }],
          pagingInfo: { limit: 1, offset: 0 }
        }

        const ekadashiResponse = await apperClient.fetchRecords("ekadashi_c", ekadashiParams)
        
        if (ekadashiResponse?.success && ekadashiResponse?.data?.length > 0) {
          setEkadashiData(ekadashiResponse.data[0])
        }

      } catch (err) {
        console.error("Error fetching spiritual data:", err)
        setError("Failed to load spiritual information")
        toast.error("Could not load Panchang and Ekadashi information")
      } finally {
        setLoading(false)
      }
    }

    fetchSpiritualData()
  }, [])
  
  
  return (
<div className="min-h-screen">
      {/* Compact Hero Section */}
      <section className="relative py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Week Badge */}
              <motion.div
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-saffron/10 to-gold/10 px-3 py-1.5 rounded-full border border-gold/30 mb-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <ApperIcon name="Calendar" className="w-4 h-4 text-saffron" />
                <span className="text-saddle-brown font-medium font-hind text-sm">
                  Week {currentWeek.weekNumber} • {currentWeek.startDate} - {currentWeek.endDate}
                </span>
              </motion.div>
              
              {/* Main Title */}
              <h1 className="text-3xl md:text-5xl font-bold font-vesper mb-4">
                <span className="bg-gradient-to-r from-saffron to-gold bg-clip-text text-transparent">
                  SanskritiQuiz
                </span>
              </h1>
              
              {/* Sanskrit Blessing */}
              <motion.div
                className="mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="sanskrit-text text-xl md:text-2xl text-saddle-brown font-vesper mb-1">
                  {blessing}
                </div>
                <div className="text-saddle-brown/70 font-hind text-sm">
                  Weekly Mythology & Scripture Quiz
                </div>
              </motion.div>
              
              {/* CTA Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row gap-3 justify-center items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <Link to="/entry">
                  <Button size="lg" className="paisley-decoration text-lg px-6 py-3">
                    <ApperIcon name="Play" className="w-5 h-5 mr-2" />
                    Start Quiz
                  </Button>
                </Link>
                
                <Link to="/leaderboard">
                  <Button variant="outline" size="lg" className="text-lg px-6 py-3">
                    <ApperIcon name="Trophy" className="w-5 h-5 mr-2" />
                    Leaderboard
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
        
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 -z-10 lotus-pattern opacity-5"></div>
        <div className="absolute top-10 left-10 w-16 h-16 bg-gold/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-20 h-20 bg-saffron/10 rounded-full blur-3xl"></div>
      </section>
      
      {/* Sacred Information Section - Panchang + Ekadashi */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-floral-white to-cornsilk">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl md:text-3xl font-bold font-vesper text-saddle-brown mb-2 paisley-decoration">
              Sacred Information
            </h2>
            <p className="text-saddle-brown/70 font-hind">
              Today's Panchang & Upcoming Ekadashi
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Panchang Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card variant="ornate" className="h-full p-6">
                <div className="flex items-center justify-center mb-4">
                  <ApperIcon name="Calendar" className="w-8 h-8 text-saffron mr-2" />
                  <h3 className="text-xl font-bold font-vesper text-saddle-brown">
                    Today's Panchang
                  </h3>
                </div>
                
                {loading ? (
                  <div className="flex justify-center py-8">
                    <Loading size="md" />
                  </div>
                ) : error ? (
                  <div className="text-center py-6">
                    <ApperIcon name="AlertCircle" className="w-8 h-8 text-error mx-auto mb-2" />
                    <p className="text-error font-hind text-sm">Unable to load Panchang</p>
                  </div>
                ) : panchangData ? (
                  <div className="space-y-3">
                    <div className="flex justify-between items-center border-b border-gold/20 pb-2">
                      <span className="font-medium font-hind text-saddle-brown">Day:</span>
                      <span className="font-vesper text-saddle-brown">{panchangData.day_c || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-gold/20 pb-2">
                      <span className="font-medium font-hind text-saddle-brown">Tithi:</span>
                      <span className="font-vesper text-saddle-brown">{panchangData.tithi_c || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-gold/20 pb-2">
                      <span className="font-medium font-hind text-saddle-brown">Nakshatra:</span>
                      <span className="font-vesper text-saddle-brown">{panchangData.nakshatra_c || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-gold/20 pb-2">
                      <span className="font-medium font-hind text-saddle-brown">Yoga:</span>
                      <span className="font-vesper text-saddle-brown">{panchangData.yoga_c || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium font-hind text-saddle-brown">Karana:</span>
                      <span className="font-vesper text-saddle-brown">{panchangData.karana_c || 'N/A'}</span>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <ApperIcon name="Calendar" className="w-8 h-8 text-saddle-brown/50 mx-auto mb-2" />
                    <p className="text-saddle-brown/70 font-hind text-sm">No Panchang data available</p>
                  </div>
                )}
              </Card>
            </motion.div>

            {/* Ekadashi Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card variant="ornate" className="h-full p-6">
                <div className="flex items-center justify-center mb-4">
                  <ApperIcon name="Bell" className="w-8 h-8 text-saffron mr-2" />
                  <h3 className="text-xl font-bold font-vesper text-saddle-brown">
                    Next Ekadashi
                  </h3>
                </div>
                
                {loading ? (
                  <div className="flex justify-center py-8">
                    <Loading size="md" />
                  </div>
                ) : error ? (
                  <div className="text-center py-6">
                    <ApperIcon name="AlertCircle" className="w-8 h-8 text-error mx-auto mb-2" />
                    <p className="text-error font-hind text-sm">Unable to load Ekadashi</p>
                  </div>
                ) : ekadashiData ? (
                  <div className="text-center space-y-4">
                    <div className="bg-gradient-to-r from-saffron/10 to-gold/10 rounded-lg p-4">
                      <div className="text-xl font-bold font-vesper text-saddle-brown mb-2">
                        {ekadashiData.event_name_c || ekadashiData.Name}
                      </div>
                      <div className="text-lg text-saffron font-hind font-medium">
                        {ekadashiData.date_c ? format(new Date(ekadashiData.date_c), 'EEEE, MMMM do, yyyy') : 'Date not available'}
                      </div>
                    </div>
                    <div className="sanskrit-text text-gold font-vesper">
                      एकादशी व्रत मुबारक
                    </div>
                    <p className="text-saddle-brown/70 font-hind text-sm">
                      A sacred day for fasting and devotion
                    </p>
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <ApperIcon name="Bell" className="w-8 h-8 text-saddle-brown/50 mx-auto mb-2" />
                    <p className="text-saddle-brown/70 font-hind text-sm">No upcoming Ekadashi found</p>
                  </div>
                )}
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-cornsilk to-floral-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card variant="ornate" className="p-6 lg:p-8 text-center">
              <ApperIcon name="Clock" className="w-12 h-12 text-saffron mx-auto mb-4" />
              
              <h2 className="text-2xl font-bold font-vesper text-saddle-brown mb-6 paisley-decoration">
                How It Works
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="space-y-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-saffron to-gold rounded-full flex items-center justify-center mx-auto text-white font-bold text-lg">
                    1
                  </div>
                  <h3 className="font-bold font-vesper text-saddle-brown text-sm">Enter Details</h3>
                  <p className="text-saddle-brown/70 font-hind text-xs">
                    Name and mobile (kept private)
                  </p>
                </div>
                
                <div className="space-y-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-saffron to-gold rounded-full flex items-center justify-center mx-auto text-white font-bold text-lg">
                    2
                  </div>
                  <h3 className="font-bold font-vesper text-saddle-brown text-sm">Answer Questions</h3>
                  <p className="text-saddle-brown/70 font-hind text-xs">
                    10 questions in 5 minutes
                  </p>
                </div>
                
                <div className="space-y-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-saffron to-gold rounded-full flex items-center justify-center mx-auto text-white font-bold text-lg">
                    3
                  </div>
                  <h3 className="font-bold font-vesper text-saddle-brown text-sm">Get Certificate</h3>
                  <p className="text-saddle-brown/70 font-hind text-xs">
                    Download your achievement
                  </p>
                </div>
              </div>
              
              {/* Privacy Notice */}
              <div className="bg-white/50 rounded-lg p-3 mb-4 border border-gold/20">
                <div className="flex items-center justify-center space-x-2 text-success">
                  <ApperIcon name="Shield" className="w-4 h-4" />
                  <span className="font-medium font-hind text-sm">
                    Privacy Protected - We never share your mobile number
                  </span>
                </div>
              </div>
              
              <Link to="/entry">
                <Button size="lg" className="text-lg px-6 py-3">
                  <ApperIcon name="Sparkles" className="w-5 h-5 mr-2" />
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