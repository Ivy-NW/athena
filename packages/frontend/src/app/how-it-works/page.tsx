'use client';

import Navbar from "@/components/navbar";
import { ChevronDown, Heart, Mail, FileText, Building } from "lucide-react";
import React from "react";
import EduAssistant from "@/components/edu-assistant";

const HowItWorksPage = () => {
  return (
    <div className="min-h-screen bg-[#f0f2ff] relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-gradient-to-r from-white to-blue-100 opacity-90"></div>
        <div className="absolute top-[20%] left-[15%] w-[180px] h-[180px] rounded-full bg-gradient-to-br from-pink-300 to-pink-200 opacity-90"></div>
        <div className="absolute top-[30%] right-[15%] w-[150px] h-[150px] rounded-full bg-gradient-to-tl from-blue-300 to-blue-200 opacity-90"></div>
        <div className="absolute top-[10%] right-[20%] w-[200px] h-[100px] rounded-[60%] bg-gradient-to-bl from-purple-300 to-purple-200 opacity-90 transform rotate-45"></div>
        <div className="absolute bottom-[30%] left-[25%] w-[80px] h-[80px] rounded-full bg-gradient-to-r from-pink-300 to-pink-200 opacity-90"></div>
        <div className="absolute bottom-[20%] right-[30%] w-[120px] h-[120px] rounded-full bg-gradient-to-l from-blue-200 to-purple-100 opacity-90"></div>
      </div>
      <EduAssistant />
      
      <Navbar />

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Donation Section */}
          <section className="mb-12">
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-pink-200 to-blue-200 rounded-[2rem] transform rotate-1 opacity-80"></div>
              <div className="absolute -inset-2 bg-gradient-to-r from-purple-200 to-pink-200 rounded-[2rem] transform -rotate-1 opacity-60"></div>
              <div className="backdrop-blur-md bg-white/30 p-8 md:p-12 rounded-[2rem] shadow-xl border border-white/40 relative z-10 text-center">
                <div className="bg-gradient-to-br from-pink-200 to-pink-100 p-5 rounded-full w-20 h-20 flex items-center justify-center mb-6 mx-auto">
                  <Heart className="w-10 h-10 text-pink-600" />
                </div>
                <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-900 to-pink-600 bg-clip-text text-transparent">
                  Donate to Your Favorite Campaign
                </h1>
                <p className="text-purple-800 text-lg leading-relaxed max-w-2xl mx-auto">
                  You can donate to any campaign available. Connect your wallet and
                  support your favorite charities. Your generosity creates instant 
                  positive change in someone's life.
                </p>
              </div>
            </div>
          </section>

          {/* Campaign Creation Section */}
          <section>
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-200 to-purple-200 rounded-[2rem] transform rotate-1 opacity-80"></div>
              <div className="absolute -inset-2 bg-gradient-to-r from-purple-200 to-blue-200 rounded-[2rem] transform -rotate-1 opacity-60"></div>
              <div className="backdrop-blur-md bg-white/30 p-8 md:p-12 rounded-[2rem] shadow-xl border border-white/40 relative z-10">
                <div className="text-center mb-8">
                  <div className="bg-gradient-to-br from-blue-200 to-blue-100 p-5 rounded-full w-20 h-20 flex items-center justify-center mb-6 mx-auto">
                    <Mail className="w-10 h-10 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent">
                    Want to Create a Campaign?
                  </h2>
                  <p className="text-purple-800 text-lg leading-relaxed max-w-2xl mx-auto">
                    Send a proposition to the admin to validate the authenticity of
                    your campaign at
                    <span className="font-semibold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent ml-1">
                      kinyagia17@gmail.com
                    </span>
                    . Include your public wallet address to be granted a campaign
                    creator role. After that, proceed to create your campaign!
                  </p>
                </div>
                
                <details className="group backdrop-blur-md bg-white/40 rounded-[2rem] shadow-lg border border-white/40 overflow-hidden">
                  <summary className="p-6 font-semibold text-purple-900 cursor-pointer flex justify-between items-center">
                    <span>What to send?</span>
                    <div className="w-8 h-8 bg-gradient-to-r from-pink-200 to-purple-200 rounded-full flex items-center justify-center">
                      <ChevronDown className="text-purple-700 transform group-open:rotate-180 transition-transform duration-300" />
                    </div>
                  </summary>
                  <div className="px-6 pb-6 text-purple-700 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-gradient-to-br from-pink-100 to-purple-100 p-2 rounded-full">
                        <FileText className="w-5 h-5 text-purple-600" />
                      </div>
                      <p>Campaign Details</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="bg-gradient-to-br from-pink-100 to-purple-100 p-2 rounded-full">
                        <FileText className="w-5 h-5 text-purple-600" />
                      </div>
                      <p>Campaign Document Proof</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="bg-gradient-to-br from-pink-100 to-purple-100 p-2 rounded-full">
                        <Building className="w-5 h-5 text-purple-600" />
                      </div>
                      <p>For more validation, your organisation details and cause</p>
                    </div>
                  </div>
                </details>
              </div>
            </div>
          </section>
        </div>
      </div>
      
      {/* Animation Styles */}
      <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(2deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        
        @keyframes float-reverse {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(15px) rotate(-2deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        
        .absolute {
          animation: float 8s ease-in-out infinite;
        }
        
        .absolute:nth-child(2n) {
          animation: float-reverse 9s ease-in-out infinite;
        }
        
        .absolute:nth-child(3n) {
          animation: float 10s ease-in-out infinite;
        }
        
        .absolute:nth-child(4n) {
          animation: float-reverse 11s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default HowItWorksPage;