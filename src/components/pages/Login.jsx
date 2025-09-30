import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../App";
import Quiz from "@/components/pages/Quiz";

function Login() {
const { isInitialized } = useContext(AuthContext);
  
  useEffect(() => {
    if (isInitialized) {
      // Show login UI in this component
      const { ApperUI } = window.ApperSDK;
      ApperUI.showLogin("#authentication");
    }
  }, [isInitialized]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-floral-white to-cornsilk">
      <div className="w-full max-w-md space-y-8 p-8 bg-white rounded-lg shadow-md border border-gold/20">
        <div className="flex flex-col gap-6 items-center justify-center">
          <div className="w-14 h-14 shrink-0 rounded-xl flex items-center justify-center bg-gradient-to-r from-saffron to-gold text-white text-2xl 2xl:text-3xl font-bold">
            S
          </div>
          <div className="flex flex-col gap-1 items-center justify-center">
            <div className="text-center text-lg xl:text-xl font-bold font-vesper text-saddle-brown">
              Sign in to Sanskriti Quiz
            </div>
            <div className="text-center text-sm text-saddle-brown/70 font-hind">
              Welcome back, please sign in to continue
            </div>
          </div>
        </div>
        <div id="authentication" />
        <div className="text-center mt-4">
          <p className="text-sm text-saddle-brown/60 font-hind">
            Don't have an account?{' '}
            <Link to="/signup" className="font-medium text-saffron hover:text-gold transition-colors">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;