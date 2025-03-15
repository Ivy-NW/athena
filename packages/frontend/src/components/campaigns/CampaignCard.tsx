'use client';

import { formatEther } from "ethers";
import { useEnsName, useEnsAvatar } from "wagmi";
import Image from "next/image";
import { ArrowRight, Clock, Heart } from "lucide-react";
import Link from "next/link";

interface CampaignCardProps {
  campaign: {
    id: bigint;
    title: string;
    image_url: string;
    description: string;
    targetAmount: bigint;
    raisedAmount: bigint;
    completedAmount: bigint;
    deadline: bigint;
    isCompleted: boolean;
    owner: string;
    fundsWithdrawn: boolean;
    targetReached: boolean;
  };
}

export function CampaignCard({ campaign }: CampaignCardProps) {
  const { data: ensName } = useEnsName({
    address: campaign.owner as `0x${string}`,
  });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName || "" });

  const progress =
    (Number(
      (campaign.isCompleted || campaign.targetReached) &&
        campaign.fundsWithdrawn
        ? campaign.completedAmount
        : campaign.raisedAmount
    ) /
      Number(campaign.targetAmount)) *
    100;
    
  const currentTime = Math.floor(Date.now() / 1000);
  const deadlineTime = Number(campaign.deadline);
  const secondsLeft = deadlineTime - currentTime;
  const daysLeft = Math.max(0, Math.floor(secondsLeft / (60 * 60 * 24)));
  
  const getCampaignStatus = () => {
    if (campaign.isCompleted) return "Completed";
    if (campaign.targetReached) return "Target Reached";
    if (secondsLeft <= 0) return "Ended";
    return "Active";
  };
  
  const getStatusColor = () => {
    if (campaign.isCompleted || campaign.targetReached) return "from-green-400 to-emerald-500";
    if (secondsLeft <= 0) return "from-gray-400 to-gray-500";
    return "from-pink-400 to-purple-500";
  };

  return (
    <div className="relative group perspective-1000">
      {/* Liquid metal background effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300 rounded-[1.5rem] opacity-70 group-hover:opacity-90 blur-sm transition-all duration-500 animate-gradient-x"></div>
      
      {/* Chrome glass card */}
      <div className="relative backdrop-blur-xl bg-gradient-to-br from-white/40 to-white/10 rounded-[1.5rem] border border-white/30 overflow-hidden shadow-xl group-hover:shadow-pink-300/40 transition-all duration-500 h-full flex flex-col transform group-hover:translate-y-[-4px] group-hover:rotate-y-5">
        {/* Reflective highlight */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent opacity-30 pointer-events-none"></div>
        
        {/* Chrome edge effect */}
        <div className="absolute inset-0 border-[1px] border-white/50 rounded-[1.5rem] pointer-events-none"></div>
        
        {/* Status badge with liquid metal effect */}
        <div className="absolute top-4 right-4 z-10">
          <span className={`bg-gradient-to-r ${getStatusColor()} backdrop-blur-md text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg border border-white/20 chrome-effect`}>
            {getCampaignStatus()}
          </span>
        </div>
        
        {/* Campaign Image with glass overlay */}
        <div className="relative h-48 overflow-hidden">
          <Image
            src={campaign.image_url}
            alt={campaign.title}
            fill
            className="object-cover transform group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent mix-blend-overlay"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20"></div>
          
          {/* Owner info with chrome effect */}
          <div className="absolute bottom-4 left-4 flex items-center gap-2">
            {ensAvatar ? (
              <div className="relative">
                <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 blur-sm"></div>
                <Image
                  src={ensAvatar}
                  alt={ensName || campaign.owner}
                  width={32}
                  height={32}
                  className="relative rounded-full border border-white/70"
                />
              </div>
            ) : (
              <div className="relative">
                <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 blur-sm"></div>
                <div className="relative w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 border border-white/70" />
              </div>
            )}
            <span className="text-white text-sm font-medium backdrop-blur-md bg-black/20 px-2 py-1 rounded-full border border-white/20 shadow-sm">
              {ensName || `${campaign.owner.slice(0, 6)}...${campaign.owner.slice(-4)}`}
            </span>
          </div>
        </div>
        
        {/* Content with chrome glass effect */}
        <div className="p-6 flex-1 flex flex-col bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md">
          <h3 className="text-xl font-semibold mb-2 text-purple-900 line-clamp-1 text-shadow-sm">{campaign.title}</h3>
          <p className="text-purple-700 mb-4 line-clamp-2">{campaign.description}</p>
          
          {/* Progress bar with liquid metal effect */}
          <div className="mb-4 mt-auto">
            <div className="flex justify-between text-sm mb-1">
              <span className="font-medium text-purple-800">
                {formatEther(
                  (campaign.isCompleted || campaign.targetReached) && campaign.fundsWithdrawn
                    ? campaign.completedAmount
                    : campaign.raisedAmount
                )} EDU
              </span>
              <span className="font-medium text-purple-800">
                {formatEther(campaign.targetAmount)} EDU ({Math.round(progress)}%)
              </span>
            </div>
            <div className="h-2.5 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm border border-white/30">
              <div 
                className="h-full bg-gradient-to-r from-pink-500 to-purple-600 relative overflow-hidden liquid-metal-progress"
                style={{ width: `${Math.min(progress, 100)}%` }}
              >
                <div className="absolute inset-0 bg-gradient-shimmer opacity-50"></div>
              </div>
            </div>
          </div>
          
          {/* Time left with chrome effect */}
          <div className="flex items-center mb-5 text-pink-600 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5 border border-white/20 w-fit">
            <Clock className="w-4 h-4 mr-1" />
            <span className="text-sm font-medium">
              {secondsLeft <= 0 
                ? "Campaign ended" 
                : `${daysLeft} days left (${new Date(Number(campaign.deadline) * 1000).toLocaleDateString()})`}
            </span>
          </div>
          
          {/* Actions with chrome glass buttons */}
          <div className="flex gap-2">
            <button 
              className={`flex-1 bg-gradient-to-r ${
                campaign.isCompleted || secondsLeft <= 0 
                  ? "from-gray-400 to-gray-500 cursor-not-allowed" 
                  : "from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
              } text-white px-4 py-2.5 rounded-full text-sm font-medium shadow-lg transition-all duration-300 flex items-center justify-center gap-1 border border-white/20 chrome-button`}
              disabled={campaign.isCompleted || secondsLeft <= 0}
            >
              <Heart className="w-4 h-4" />
              Donate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export const CampaignCardStyles = () => (
  <style jsx global>{`
    @keyframes shimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }
    
    @keyframes gradient-x {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    
    .animate-gradient-x {
      background-size: 200% 200%;
      animation: gradient-x 15s ease infinite;
    }
    
    .bg-gradient-shimmer {
      background: linear-gradient(90deg, 
        rgba(255,255,255,0) 0%, 
        rgba(255,255,255,0.8) 50%, 
        rgba(255,255,255,0) 100%);
      background-size: 200% 100%;
      animation: shimmer 3s infinite;
    }
    
    .perspective-1000 {
      perspective: 1000px;
    }
    
    .rotate-y-5 {
      transform: rotateY(5deg);
    }
    
    .text-shadow-sm {
      text-shadow: 0 1px 2px rgba(0,0,0,0.1);
    }
    
    .chrome-effect {
      position: relative;
      overflow: hidden;
    }
    
    .chrome-effect::before {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: linear-gradient(
        to bottom right,
        rgba(255,255,255,0.8) 0%,
        rgba(255,255,255,0) 30%,
        rgba(255,255,255,0) 70%,
        rgba(255,255,255,0.3) 100%
      );
      transform: rotate(30deg);
      pointer-events: none;
    }
    
    .chrome-button {
      position: relative;
      overflow: hidden;
    }
    
    .chrome-button::before {
      content: '';
      position: absolute;
      top: -100%;
      left: -100%;
      width: 300%;
      height: 300%;
      background: linear-gradient(
        to bottom right,
        rgba(255,255,255,0.8) 0%,
        rgba(255,255,255,0) 30%,
        rgba(255,255,255,0) 70%,
        rgba(255,255,255,0.3) 100%
      );
      transform: rotate(30deg);
      transition: transform 0.5s ease;
      pointer-events: none;
    }
    
    .chrome-button:hover::before {
      transform: rotate(30deg) translate(10%, 10%);
    }
    
    .liquid-metal-progress::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(
        to bottom,
        rgba(255,255,255,0.3) 0%,
        rgba(255,255,255,0) 50%,
        rgba(0,0,0,0.1) 100%
      );
      pointer-events: none;
    }
  `}</style>
);