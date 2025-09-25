import { format, startOfWeek, endOfWeek } from "date-fns"

export const getCurrentWeek = () => {
  const now = new Date()
  const start = startOfWeek(now, { weekStartsOn: 1 }) // Monday
  const end = endOfWeek(now, { weekStartsOn: 1 }) // Sunday
  
  return {
    weekNumber: getWeekNumber(now),
    startDate: format(start, "MMM dd"),
    endDate: format(end, "MMM dd, yyyy"),
    year: format(now, "yyyy")
  }
}

export const getWeekNumber = (date) => {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
  const dayNum = d.getUTCDay() || 7
  d.setUTCDate(d.getUTCDate() + 4 - dayNum)
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
  return Math.ceil((((d - yearStart) / 86400000) + 1) / 7)
}

export const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
}

export const getSanskritBlessing = () => {
  const blessings = [
    "सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः",
    "विद्या ददाति विनयं विनयाद् याति पात्रताम्",
    "यतो धर्मस्ततो जयः",
    "सत्यमेव जयते नानृतम्",
    "अहिंसा परमो धर्मः"
  ]
  return blessings[Math.floor(Math.random() * blessings.length)]
}