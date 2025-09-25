import { useState } from "react"
import { motion } from "framer-motion"
import { toast } from "react-toastify"
import { cn } from "@/utils/cn"
import { downloadCertificate, shareCertificateWhatsApp } from "@/utils/certificateGenerator"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"
import Card from "@/components/atoms/Card"

const CertificatePreview = ({ userData, className, ...props }) => {
  const [isDownloading, setIsDownloading] = useState(false)
  const [isSharing, setIsSharing] = useState(false)
  
  const handleDownload = async () => {
    setIsDownloading(true)
    try {
      await downloadCertificate(userData)
      toast.success("Certificate downloaded successfully! 🎉")
    } catch (error) {
      toast.error("Failed to download certificate. Please try again.")
    } finally {
      setIsDownloading(false)
    }
  }
  
  const handleWhatsAppShare = async () => {
    setIsSharing(true)
    try {
      await shareCertificateWhatsApp(userData)
      toast.success("Certificate shared successfully! 📱")
    } catch (error) {
      toast.error("Failed to share certificate. Please try again.")
    } finally {
      setIsSharing(false)
    }
  }
  
  return (
    <Card variant="certificate" className={cn("p-8", className)} {...props}>
      {/* Certificate Header */}
      <div className="text-center mb-8">
        <motion.div
          className="inline-block mb-4"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-20 h-20 bg-gradient-to-br from-gold via-saffron to-gold rounded-full flex items-center justify-center shadow-2xl mx-auto mb-4">
            <ApperIcon name="Award" className="w-10 h-10 text-white" />
          </div>
        </motion.div>
        
        <h2 className="text-3xl font-bold font-vesper text-saddle-brown mb-2">
          प्रमाणपत्र
        </h2>
        <h3 className="text-xl font-semibold text-saffron font-vesper mb-6">
          CERTIFICATE OF ACHIEVEMENT
        </h3>
        
        {/* Ornamental Border */}
        <div className="w-full h-1 bg-gradient-to-r from-transparent via-gold to-transparent mb-6"></div>
      </div>
      
      {/* Certificate Content */}
      <div className="text-center space-y-6 mb-8">
        <p className="text-lg text-saddle-brown font-hind">
          This is to certify that
        </p>
        
        <div className="py-4 px-6 bg-gradient-to-r from-saffron/10 to-gold/10 rounded-xl border-2 border-gold/30">
          <h4 className="text-3xl font-bold font-vesper text-saffron">
            {userData.name}
          </h4>
        </div>
        
        <p className="text-lg text-saddle-brown font-hind">
          has successfully completed the
        </p>
        
        <div className="py-3 px-6 bg-gradient-to-r from-gold/20 to-saffron/20 rounded-xl">
          <h5 className="text-2xl font-bold font-vesper bg-gradient-to-r from-saffron to-gold bg-clip-text text-transparent">
            Mythology Champion of the Week
          </h5>
        </div>
        
        <div className="flex justify-center items-center space-x-8 py-6">
          <div className="text-center">
            <div className="text-4xl font-bold font-vesper text-success mb-1">
              {userData.score}/10
            </div>
            <div className="text-sm text-saddle-brown/70 font-hind">
              Score Achieved
            </div>
          </div>
          
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-gold to-transparent"></div>
          
          <div className="text-center">
            <div className="text-lg text-saddle-brown font-hind mb-1">
              {new Date().toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long", 
                year: "numeric"
              })}
            </div>
            <div className="text-sm text-saddle-brown/70 font-hind">
              Date of Achievement
            </div>
          </div>
        </div>
        
        {/* Sanskrit Blessing */}
        <div className="py-4 px-6 bg-gradient-to-r from-cornsilk to-floral-white rounded-xl border border-gold/20">
          <div className="sanskrit-text text-lg font-vesper text-saddle-brown mb-2">
            सर्वे भवन्तु सुखिनः
          </div>
          <div className="text-sm text-saddle-brown/70 font-hind italic">
            (May all beings be happy)
          </div>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          onClick={handleDownload}
          disabled={isDownloading}
          variant="primary"
          size="lg"
          className="flex items-center space-x-2"
        >
          <ApperIcon 
            name={isDownloading ? "Loader2" : "Download"} 
            className={cn("w-5 h-5", isDownloading && "animate-spin")} 
          />
          <span>{isDownloading ? "Generating..." : "Download Certificate"}</span>
        </Button>
        
        <Button
          onClick={handleWhatsAppShare}
          disabled={isSharing}
          variant="success"
          size="lg"
          className="flex items-center space-x-2"
        >
          <ApperIcon 
            name={isSharing ? "Loader2" : "MessageCircle"} 
            className={cn("w-5 h-5", isSharing && "animate-spin")} 
          />
          <span>{isSharing ? "Sharing..." : "Share on WhatsApp"}</span>
        </Button>
      </div>
      
      {/* Footer */}
      <div className="text-center mt-8 pt-6 border-t border-gold/20">
        <div className="text-sm text-saddle-brown/60 font-hind">
          SanskritiQuiz.com - Preserving Sacred Wisdom
        </div>
      </div>
    </Card>
  )
}

export default CertificatePreview