"use client";

import React, { ReactNode } from "react";
import "@rainbow-me/rainbowkit/styles.css";
import { lightTheme, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { State, WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { config } from "@/blockchain/config/wagmi";

const queryClient = new QueryClient();

interface ProvidersProps {
  children: ReactNode;
  initialState?: State;
}

export const Providers: React.FC<ProvidersProps> = ({
  children,
  initialState,
}: ProvidersProps) => {
  return (
    <WagmiProvider config={config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={lightTheme({
            accentColor: "#F0B90B",
            accentColorForeground: "#1E2026",
            borderRadius: "medium",
            fontStack: "system",
          })}
          showRecentTransactions={true}
        >
          <div className="min-h-screen bg-[#f0f2ff] relative overflow-hidden">
            {/* Abstract Floating Shapes */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
              {/* Large central white/light blue circle */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-gradient-to-r from-white to-blue-100 opacity-90"></div>
              
              {/* Pink circle on left */}
              <div className="absolute top-[20%] left-[15%] w-[180px] h-[180px] rounded-full bg-gradient-to-br from-pink-300 to-pink-200 opacity-90"></div>
              
              {/* Blue circle on right */}
              <div className="absolute top-[30%] right-[15%] w-[150px] h-[150px] rounded-full bg-gradient-to-tl from-blue-300 to-blue-200 opacity-90"></div>
              
              {/* Purple wavy shape on top right */}
              <div className="absolute top-[10%] right-[20%] w-[200px] h-[100px] rounded-[60%] bg-gradient-to-bl from-purple-300 to-purple-200 opacity-90 transform rotate-45"></div>
              
              {/* Small pink circle */}
              <div className="absolute bottom-[30%] left-[25%] w-[80px] h-[80px] rounded-full bg-gradient-to-r from-pink-300 to-pink-200 opacity-90"></div>
              
              {/* Light blue circle bottom right */}
              <div className="absolute bottom-[20%] right-[30%] w-[120px] h-[120px] rounded-full bg-gradient-to-l from-blue-200 to-purple-100 opacity-90"></div>
              
              {/* Blob shape top left */}
              <div className="absolute top-[5%] left-[10%] w-[150px] h-[100px] rounded-[40%_60%_60%_40%] bg-gradient-to-r from-purple-200 to-blue-200 opacity-90 transform rotate-12"></div>
              
              {/* Blob shape bottom */}
              <div className="absolute bottom-[10%] left-[40%] w-[180px] h-[90px] rounded-[60%_40%_50%_50%] bg-gradient-to-tr from-pink-200 to-purple-200 opacity-90 transform -rotate-15"></div>
            </div>
            
            <div className="relative z-10">
              {children}
            </div>
            
            {/* Add CSS for animated floating effect */}
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
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};