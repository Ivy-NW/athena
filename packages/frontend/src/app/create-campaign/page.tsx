// app/create-campaign/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { parseEther } from "ethers";
import { useCrowdfunding } from "@/blockchain/hooks/useCrowdfunding";
import { ArrowLeft, ArrowRight, Image as ImageIcon, Target, Clock, Type } from "lucide-react";
import Link from "next/link";

export default function CreateCampaign() {
  const router = useRouter();
  const { createCampaign } = useCrowdfunding();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl: "",
    targetAmount: "",
    duration: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await createCampaign(
        formData.title,
        formData.description,
        formData.imageUrl,
        parseEther(formData.targetAmount),
        Number(formData.duration)
      );
      router.push("/");
    } catch (error) {
      console.error("Error creating campaign:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f2ff] relative overflow-hidden py-12">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-gradient-to-r from-white to-blue-100 opacity-90"></div>
        <div className="absolute top-[20%] left-[15%] w-[180px] h-[180px] rounded-full bg-gradient-to-br from-pink-300 to-pink-200 opacity-90"></div>
        <div className="absolute top-[30%] right-[15%] w-[150px] h-[150px] rounded-full bg-gradient-to-tl from-blue-300 to-blue-200 opacity-90"></div>
        <div className="absolute top-[10%] right-[20%] w-[200px] h-[100px] rounded-[60%] bg-gradient-to-bl from-purple-300 to-purple-200 opacity-90 transform rotate-45"></div>
        <div className="absolute bottom-[30%] left-[25%] w-[80px] h-[80px] rounded-full bg-gradient-to-r from-pink-300 to-pink-200 opacity-90"></div>
        <div className="absolute bottom-[20%] right-[30%] w-[120px] h-[120px] rounded-full bg-gradient-to-l from-blue-200 to-purple-100 opacity-90"></div>
      </div>

      <div className="container mx-auto px-4 max-w-2xl relative z-10">
        <div className="mb-8 flex justify-between items-center">
          <Link
            href="/"
            className="group flex items-center gap-2 text-purple-800 hover:text-pink-600 transition-colors duration-300"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Campaigns</span>
          </Link>
          <div className="backdrop-blur-md bg-white/30 p-1 rounded-full border border-white/40 shadow-md">
            <ConnectButton />
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-2 bg-gradient-to-r from-pink-200 to-blue-200 rounded-[2rem] transform rotate-1 opacity-80"></div>
          <div className="absolute -inset-2 bg-gradient-to-r from-purple-200 to-pink-200 rounded-[2rem] transform -rotate-1 opacity-60"></div>
          <div className="backdrop-blur-md bg-white/30 p-8 rounded-[2rem] shadow-xl border border-white/40 relative z-10">
            <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-purple-900 to-pink-600 bg-clip-text text-transparent">
              Create New Campaign
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-purple-800 mb-2">
                  <Type className="w-5 h-5 text-purple-600" />
                  Campaign Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full border border-white/40 rounded-xl px-4 py-3 bg-white/50 backdrop-blur-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-inner text-purple-900"
                  required
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-purple-800 mb-2">
                  <Type className="w-5 h-5 text-purple-600" />
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full border border-white/40 rounded-xl px-4 py-3 bg-white/50 backdrop-blur-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-inner text-purple-900 h-32 resize-none"
                  required
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-purple-800 mb-2">
                  <ImageIcon className="w-5 h-5 text-purple-600" />
                  Image URL
                </label>
                <input
                  type="url"
                  value={formData.imageUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, imageUrl: e.target.value })
                  }
                  className="w-full border border-white/40 rounded-xl px-4 py-3 bg-white/50 backdrop-blur-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-inner text-purple-900"
                  placeholder="https://example.com/image.jpg"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-purple-800 mb-2">
                    <Target className="w-5 h-5 text-purple-600" />
                    Target Amount (EDU)
                  </label>
                  <input
                    type="number"
                    value={formData.targetAmount}
                    onChange={(e) =>
                      setFormData({ ...formData, targetAmount: e.target.value })
                    }
                    className="w-full border border-white/40 rounded-xl px-4 py-3 bg-white/50 backdrop-blur-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-inner text-purple-900"
                    required
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-purple-800 mb-2">
                    <Clock className="w-5 h-5 text-purple-600" />
                    Duration (days)
                  </label>
                  <input
                    type="number"
                    value={formData.duration}
                    onChange={(e) =>
                      setFormData({ ...formData, duration: e.target.value })
                    }
                    className="w-full border border-white/40 rounded-xl px-4 py-3 bg-white/50 backdrop-blur-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-inner text-purple-900"
                    min="1"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="group w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-4 rounded-full font-medium shadow-lg hover:shadow-pink-300/30 disabled:opacity-50 transition-all duration-300 flex items-center justify-center gap-2 mt-8 transform hover:scale-[1.02]"
              >
                {isLoading ? "Creating..." : "Create Campaign"}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>
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
}