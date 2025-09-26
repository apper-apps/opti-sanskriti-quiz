import React, { createContext, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { ToastContainer } from "react-toastify";
import "@/index.css";
import Layout from "@/components/organisms/Layout";
import Leaderboard from "@/components/pages/Leaderboard";
import UserEntry from "@/components/pages/UserEntry";
import Login from "@/components/pages/Login";
import Signup from "@/components/pages/Signup";
import ResetPassword from "@/components/pages/ResetPassword";
import Homepage from "@/components/pages/Homepage";
import Callback from "@/components/pages/Callback";
import PromptPassword from "@/components/pages/PromptPassword";
import Quiz from "@/components/pages/Quiz";
import Results from "@/components/pages/Results";
import ErrorPage from "@/components/pages/ErrorPage";
import UploadQuestion from "@/components/pages/UploadQuestion";

// Create auth context
export const AuthContext = createContext(null);

function AppContent() {
  
  return (
<div>
      <div className="min-h-screen bg-gradient-to-br from-floral-white to-cornsilk">
<Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/callback" element={<Callback />} />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="/prompt-password/:appId/:emailAddress/:provider" element={<PromptPassword />} />
          <Route path="/reset-password/:appId/:fields" element={<ResetPassword />} />
<Route path="/" element={<Layout />}>
            <Route index element={<Homepage />} />
            <Route path="entry" element={<UserEntry />} />
            <Route path="quiz" element={<Quiz />} />
            <Route path="results" element={<Results />} />
            <Route path="leaderboard" element={<Leaderboard />} />
            <Route path="upload" element={<UploadQuestion />} />
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
</div>
  )
}

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </Provider>
  )
}

export default App