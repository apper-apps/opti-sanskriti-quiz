export const generateCertificate = (userData) => {
  return new Promise((resolve) => {
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    
    // Set canvas size
    canvas.width = 800
    canvas.height = 600
    
    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, 800, 600)
    gradient.addColorStop(0, "#FFFAF0")
    gradient.addColorStop(0.5, "#FFF8DC")
    gradient.addColorStop(1, "#FFFAF0")
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, 800, 600)
    
    // Ornate border
    ctx.strokeStyle = "#FFD700"
    ctx.lineWidth = 8
    ctx.strokeRect(20, 20, 760, 560)
    
    // Inner border
    ctx.strokeStyle = "#FF6B35"
    ctx.lineWidth = 3
    ctx.strokeRect(40, 40, 720, 520)
    
    // Decorative corners - simplified lotus patterns
    const drawCornerDecoration = (x, y) => {
      ctx.fillStyle = "#FFD700"
      ctx.beginPath()
      ctx.arc(x, y, 15, 0, 2 * Math.PI)
      ctx.fill()
      
      ctx.fillStyle = "#FF6B35"
      ctx.beginPath()
      ctx.arc(x - 20, y, 8, 0, 2 * Math.PI)
      ctx.arc(x + 20, y, 8, 0, 2 * Math.PI)
      ctx.arc(x, y - 20, 8, 0, 2 * Math.PI)
      ctx.arc(x, y + 20, 8, 0, 2 * Math.PI)
      ctx.fill()
    }
    
    drawCornerDecoration(80, 80)
    drawCornerDecoration(720, 80)
    drawCornerDecoration(80, 520)
    drawCornerDecoration(720, 520)
    
    // Certificate text
    ctx.textAlign = "center"
    ctx.fillStyle = "#8B4513"
    
    // Title
    ctx.font = "bold 36px Vesper Libre, serif"
    ctx.fillText("प्रमाणपत्र", 400, 120)
    ctx.font = "24px Vesper Libre, serif"
    ctx.fillText("CERTIFICATE OF ACHIEVEMENT", 400, 150)
    
    // Main content
    ctx.font = "20px Hind, sans-serif"
    ctx.fillText("This is to certify that", 400, 200)
    
    // Name (highlighted)
    ctx.fillStyle = "#FF6B35"
    ctx.font = "bold 32px Vesper Libre, serif"
ctx.fillText(userData.name || userData.name_c, 400, 240)
    
    // Achievement text
    ctx.fillStyle = "#8B4513"
    ctx.font = "20px Hind, sans-serif"
    ctx.fillText("has successfully completed the", 400, 280)
    
// Title
    ctx.fillStyle = "#FFD700"
    ctx.font = "bold 28px Vesper Libre, serif"
    const titleText = userData.rankingTitle || "प्रयास आरंभ"
    ctx.fillText(titleText, 400, 320)
    
    // Score
    ctx.fillStyle = "#228B22"
    ctx.font = "bold 24px Hind, sans-serif"
    ctx.fillText(`Score: ${userData.score}/10`, 400, 360)
    
    // Date and blessing
    ctx.fillStyle = "#8B4513"
    ctx.font = "16px Hind, sans-serif"
    const currentDate = new Date().toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric"
    })
    ctx.fillText(`Date: ${currentDate}`, 400, 420)
    
    // Sanskrit blessing
    ctx.font = "14px Vesper Libre, serif"
    ctx.fillText("सर्वे भवन्तु सुखिनः", 400, 460)
    ctx.fillText("(May all beings be happy)", 400, 480)
    
    // Website attribution
    ctx.font = "12px Hind, sans-serif"
    ctx.fillText("SanskritiQuiz.com", 400, 520)
    
    // Convert to blob and resolve
    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob)
      resolve(url)
    }, "image/png", 1.0)
  })
}

export const downloadCertificate = async (userData) => {
  try {
    const imageUrl = await generateCertificate(userData)
    const link = document.createElement("a")
link.download = `SanskritiQuiz-Certificate-${(userData.name || userData.name_c).replace(/\s+/g, "-")}.png`
    link.href = imageUrl
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(imageUrl)
  } catch (error) {
    console.error("Error downloading certificate:", error)
    throw error
  }
}

export const shareCertificateWhatsApp = async (userData) => {
  try {
    const imageUrl = await generateCertificate(userData)
    
    // Convert blob URL to actual blob for sharing
    const response = await fetch(imageUrl)
    const blob = await response.blob()
    
// Check if File constructor is available
    let file = null
    if (typeof window !== 'undefined' && typeof File !== 'undefined' && File) {
      try {
        file = new File([blob], `SanskritiQuiz-Certificate-${userData.name || userData.name_c}.png`, {
          type: "image/png"
        })
      } catch (error) {
        console.warn('File constructor not supported:', error)
        file = null
      }
    }

    // Try native sharing with image first
    if (file && navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share({
        title: "My SanskritiQuiz Certificate!",
        text: `I achieved "${userData.rankingTitle}" ranking with ${userData.score}/10 in mythology quiz! 🏆`,
        files: [file]
      })
    } else if (navigator.share) {
      // Share without file but with enhanced text
      await navigator.share({
        title: "My SanskritiQuiz Certificate!",
        text: `I achieved "${userData.rankingTitle}" ranking with ${userData.score}/10 in SanskritiQuiz! 🏆📚\n\nTest your knowledge at SanskritiQuiz.com`
      })
    } else {
      // Fallback: Download image and open WhatsApp
      const link = document.createElement("a")
link.download = `SanskritiQuiz-Certificate-${(userData.name || userData.name_c).replace(/\s+/g, "-")}.png`
      link.href = imageUrl
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      const message = `I achieved "${userData.rankingTitle}" ranking with ${userData.score}/10 in SanskritiQuiz! 🏆📚\n\nTest your knowledge of Indian scriptures at SanskritiQuiz.com`
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`
      window.open(whatsappUrl, "_blank")
    }
    
    URL.revokeObjectURL(imageUrl)
  } catch (error) {
    console.error("Error sharing certificate:", error)
    // Fallback text share with ranking
    const message = `I achieved "${userData.rankingTitle}" ranking with ${userData.score}/10 in SanskritiQuiz! 🏆📚\n\nTest your knowledge of Indian scriptures at SanskritiQuiz.com`
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }
}