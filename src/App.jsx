import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import Layout from "@/components/organisms/Layout"
import Homepage from "@/components/pages/Homepage"
import UserEntry from "@/components/pages/UserEntry"
import Quiz from "@/components/pages/Quiz"
import Results from "@/components/pages/Results"
import Leaderboard from "@/components/pages/Leaderboard"

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-floral-white to-cornsilk">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Homepage />} />
            <Route path="entry" element={<UserEntry />} />
            <Route path="quiz" element={<Quiz />} />
            <Route path="results" element={<Results />} />
            <Route path="leaderboard" element={<Leaderboard />} />
          </Route>
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          toastStyle={{
            fontSize: "14px",
            padding: "16px",
          }}
        />
      </div>
    </BrowserRouter>
  )
}

export default App