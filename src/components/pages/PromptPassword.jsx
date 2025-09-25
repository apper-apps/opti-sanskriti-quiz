import { Link } from "react-router-dom";
import React from "react";
import ApperIcon from "@/components/ApperIcon";
import Homepage from "@/components/pages/Homepage";

const PromptPassword = () => {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-floral-white to-cornsilk">
            <div className="w-full max-w-md space-y-8 p-8 bg-white rounded-lg shadow-md border border-gold/20 text-center">
                <div className="flex flex-col gap-6 items-center justify-center">
                    <div className="w-14 h-14 shrink-0 rounded-xl flex items-center justify-center bg-gradient-to-r from-saffron to-gold text-white text-2xl 2xl:text-3xl font-bold">
                        S
                    </div>
                    <div className="flex flex-col gap-1 items-center justify-center">
                        <div className="text-center text-lg xl:text-xl font-bold font-vesper text-saddle-brown">
                            Password Management by Backend
                        </div>
                        <div className="text-center text-sm text-saddle-brown/70 font-hind">
                            No password prompts required
                        </div>
                    </div>
                </div>
                
                <div className="p-4 bg-gradient-to-r from-warning/10 to-orange-100 rounded-xl border border-warning/20">
                    <div className="flex items-center justify-center space-x-2 text-warning mb-2">
                        <ApperIcon name="Lock" className="w-5 h-5" />
                        <span className="font-medium font-hind">Secure Backend Authentication</span>
                    </div>
                    <p className="text-sm text-warning/80 font-hind">
                        Password management is handled securely by our backend system.
                    </p>
                </div>
                
                <Link 
                    to="/" 
                    className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-saffron to-gold text-white rounded-lg hover:shadow-lg transition-all duration-200 font-hind font-medium"
                >
                    <ApperIcon name="Home" className="w-5 h-5" />
                    <span>Go to Homepage</span>
                </Link>
            </div>
        </div>
    )
}

export default PromptPassword