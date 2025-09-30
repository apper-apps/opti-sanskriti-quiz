import "@/index.css";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { ToastContainer } from "react-toastify";
import UserEntry from "@/components/pages/UserEntry";
import Quiz from "@/components/pages/Quiz";
import Results from "@/components/pages/Results";
import Homepage from "@/components/pages/Homepage";
import Leaderboard from "@/components/pages/Leaderboard";
import Layout from "@/components/organisms/Layout";
// Create auth context
export const AuthContext = createContext(null);

function AppContent() {
    });
  }, []);



return (
    <AuthContext.Provider value={authMethods}>
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
    </AuthContext.Provider>
  );
}

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </Provider>
  );
}
export default App;