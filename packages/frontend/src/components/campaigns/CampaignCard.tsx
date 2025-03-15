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
    image_url: string; // Image URL for the campaign
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
    
  // Calculate days left
  const currentTime = Math.floor(Date.now() / 1000);
  const deadlineTime = Number(campaign.deadline);
  const secondsLeft = deadlineTime - currentTime;
  const daysLeft = Math.max(0, Math.floor(secondsLeft / (60 * 60 * 24)));
  
  // Determine campaign status for badge
  const getCampaignStatus = () => {
    if (campaign.isCompleted) return "Completed";
    if (campaign.targetReached) return "Target Reached";
    if (secondsLeft <= 0) return "Ended";
    return "Active";
  };
  
  const getStatusColor = () => {
    if (campaign.isCompleted || campaign.targetReached) return "from-green-500 to-emerald-600";
    if (secondsLeft <= 0) return "from-gray-500 to-gray-600";
    return "from-pink-500 to-purple-600";
  };

  return (
    <div className="relative group">
      {/* Metallic glass effect background layers */}
      <div className="absolute -inset-1 bg-gradient-to-r from-pink-200 to-blue-200 rounded-[1.5rem] blur-sm opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="absolute -inset-2 bg-gradient-to-r from-purple-200 to-pink-200 rounded-[1.5rem] blur-sm opacity-50 group-hover:opacity-80 transition-opacity duration-300 transform -rotate-1"></div>
      
      {/* Card content */}
      <div className="relative backdrop-blur-md bg-white/30 rounded-[1.5rem] border border-white/40 overflow-hidden shadow-xl group-hover:shadow-pink-300/30 transition-all duration-500 h-full flex flex-col">
        {/* Status badge */}
        <div className="absolute top-4 right-4 z-10">
          <span className={`bg-gradient-to-r ${getStatusColor()} backdrop-blur-md text-white px-3 py-1 rounded-full text-sm font-medium`}>
            {getCampaignStatus()}
          </span>
        </div>
        
        {/* Campaign Image */}
        <div className="relative h-48 overflow-hidden">
          <Image
            src={campaign.image_url}
            alt={campaign.title}
            fill
            className="object-cover transform group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          
          {/* Owner info overlay */}
          <div className="absolute bottom-4 left-4 flex items-center gap-2">
            {ensAvatar ? (
              <Image
                src={ensAvatar}
                alt={ensName || campaign.owner}
                width={32}
                height={32}
                className="rounded-full border-2 border-white"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 border-2 border-white" />
            )}
            <span className="text-white text-sm font-medium backdrop-blur-sm bg-black/30 px-2 py-1 rounded-full">
              {ensName || `${campaign.owner.slice(0, 6)}...${campaign.owner.slice(-4)}`}
            </span>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-6 flex-1 flex flex-col">
          <h3 className="text-xl font-semibold mb-2 text-purple-900 line-clamp-1">{campaign.title}</h3>
          <p className="text-purple-700 mb-4 line-clamp-2">{campaign.description}</p>
          
          {/* Progress bar */}
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
            <div className="h-2 bg-purple-100/50 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-pink-500 to-purple-600"
                style={{ width: `${Math.min(progress, 100)}%` }}
              ></div>
            </div>
          </div>
          
          {/* Time left */}
          <div className="flex items-center mb-5 text-pink-600">
            <Clock className="w-4 h-4 mr-1" />
            <span className="text-sm font-medium">
              {secondsLeft <= 0 
                ? "Campaign ended" 
                : `${daysLeft} days left (${new Date(Number(campaign.deadline) * 1000).toLocaleDateString()})`}
            </span>
          </div>
          
          {/* Actions */}
          <div className="flex gap-2">
            <button 
              className={`flex-1 bg-gradient-to-r ${
                campaign.isCompleted || secondsLeft <= 0 
                  ? "from-gray-400 to-gray-500 cursor-not-allowed" 
                  : "from-pink-500 to-purple-600 hover:shadow-pink-300/30"
              } text-white px-4 py-2 rounded-full text-sm font-medium shadow-md transition-all duration-300 flex items-center justify-center gap-1`}
              disabled={campaign.isCompleted || secondsLeft <= 0}
            >
              <Heart className="w-4 h-4" />
              Donate Now
            </button>
            <Link
              href={`/campaign/${campaign.id}`}
              className="bg-white/50 backdrop-blur-sm text-purple-800 border border-purple-200/50 px-4 py-2 rounded-full text-sm font-medium hover:bg-white/70 transition-colors duration-300 flex items-center"
            >
              Details
              <ArrowRight className="w-3 h-3 ml-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// Add this to your global CSS or as a separate style component
export const CampaignCardStyles = () => (
  <style jsx global>{`
    @keyframes shimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }
    
    .bg-gradient-shimmer {
      background: linear-gradient(90deg, 
        rgba(255,255,255,0) 0%, 
        rgba(255,255,255,0.8) 50%, 
        rgba(255,255,255,0) 100%);
      background-size: 200% 100%;
      animation: shimmer 3s infinite;
    }
  `}</style>
);