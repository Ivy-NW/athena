"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { formatEther, parseEther } from "ethers";
import {
  CROWDFUNDING_ABI,
  CROWDFUNDING_ADDRESS,
} from "@/blockchain/abis/Crowdfunding";

import {
  useCrowdfunding,
  useGetCampaign,
  useGetCampaignDonations,
} from "@/blockchain/hooks/useCrowdfunding";
import { Campaign } from "@/types/crowdfunding";
import Navbar from "@/components/navbar";
import Image from "next/image";
import { useContractEvent } from "@/blockchain/hooks/useContractEvent";
import EduAssistant from "@/components/edu-assistant";
import { ArrowRight, Heart } from "lucide-react";

export default function CampaignPage() {
  const params = useParams();
  const router = useRouter();
  const { address } = useAccount();
  const campaignId = BigInt(params.id as string);

  const { data, refetch: refetchCampaign } = useGetCampaign(campaignId);
  const { data: donationsObjectData, refetch: refetchDonations } =
    useGetCampaignDonations(campaignId);

  const donationsData = donationsObjectData as Array<{
    donor: string;
    amount: string;
  }>;

  const campaign = data as Campaign;
  const { isAdmin, donateToCampaign, withdrawFunds, deleteCampaign } =
    useCrowdfunding();

  const [donationAmount, setDonationAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Set up polling for regular updates
  useEffect(() => {
    const pollInterval = setInterval(() => {
      refetchCampaign();
      refetchDonations();
    }, 3600000); // Poll every 1 hour

    return () => clearInterval(pollInterval);
  }, [refetchCampaign, refetchDonations]);

  // Listen for DonationReceived events
  useContractEvent({
    address: CROWDFUNDING_ADDRESS,
    abi: CROWDFUNDING_ABI,
    eventName: "DonationReceived",
    listener(log: any) {
      const { campaignId: eventCampaignId } = log.args;
      if (eventCampaignId === campaignId) {
        refetchCampaign();
        refetchDonations();
      }
    },
  });

  // Listen for FundsWithdrawn events
  useContractEvent({
    address: CROWDFUNDING_ADDRESS,
    abi: CROWDFUNDING_ABI,
    eventName: "FundsWithdrawn",
    listener(log: any) {
      const { campaignId: eventCampaignId } = log.args;
      if (eventCampaignId === campaignId) {
        refetchCampaign();
      }
    },
  });

  // Listen for CampaignCompleted events
  useContractEvent({
    address: CROWDFUNDING_ADDRESS,
    abi: CROWDFUNDING_ABI,
    eventName: "CampaignCompleted",
    listener(log: any) {
      const { campaignId: eventCampaignId } = log.args;
      if (eventCampaignId === campaignId) {
        refetchCampaign();
      }
    },
  });

  const handleDonate = async () => {
    try {
      setIsLoading(true);
      await donateToCampaign(campaignId, parseEther(donationAmount));
      setDonationAmount("");
      // Refetch immediately after donation
      await Promise.all([refetchCampaign(), refetchDonations()]);
    } catch (error) {
      console.error("Error donating:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleWithdraw = async () => {
    try {
      setIsLoading(true);
      await withdrawFunds(campaignId);
      // Refetch immediately after withdrawal
      await refetchCampaign();
    } catch (error) {
      console.error("Error withdrawing:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this campaign?")) {
      try {
        setIsLoading(true);
        await deleteCampaign(campaignId);
        router.push("/");
      } catch (error) {
        console.error("Error deleting:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  if (!campaign) {
    return (
      <div className="min-h-screen bg-[#f0f2ff] flex items-center justify-center relative overflow-hidden">
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-gradient-to-r from-white to-blue-100 opacity-90"></div>
          <div className="absolute top-[20%] left-[15%] w-[180px] h-[180px] rounded-full bg-gradient-to-br from-pink-300 to-pink-200 opacity-90"></div>
          <div className="absolute top-[30%] right-[15%] w-[150px] h-[150px] rounded-full bg-gradient-to-tl from-blue-300 to-blue-200 opacity-90"></div>
        </div>
        <div className="backdrop-blur-md bg-white/30 p-8 rounded-[2rem] shadow-xl border border-white/40 relative z-10">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-purple-900 font-medium">Loading campaign details...</p>
          </div>
        </div>
      </div>
    );
  }

  const isOwner = address === campaign.owner;
  const canManage: boolean = Boolean(isOwner || isAdmin);
  const canWithdraw: boolean = Boolean(
    isOwner &&
      (campaign.targetReached || campaign.isCompleted) &&
      !campaign.fundsWithdrawn
  );

  const progress =
    (Number(
      (campaign.isCompleted || campaign.targetReached) &&
        campaign.fundsWithdrawn
        ? campaign.completedAmount
        : campaign.raisedAmount
    ) /
      Number(campaign.targetAmount)) *
    100;

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

      <div className="container mx-auto px-4 py-8 max-w-6xl relative z-10">
        {/* Hero Section */}
        <div className="relative mb-12">
          <div className="absolute -inset-2 bg-gradient-to-r from-pink-200 to-blue-200 rounded-[2rem] transform rotate-1 opacity-80"></div>
          <div className="absolute -inset-2 bg-gradient-to-r from-purple-200 to-pink-200 rounded-[2rem] transform -rotate-1 opacity-60"></div>
          <div className="backdrop-blur-md bg-white/30 rounded-[2rem] shadow-xl border border-white/40 overflow-hidden relative z-10">
            <div className="relative h-[300px] md:h-[400px]">
              <Image
                src={campaign.image_url}
                alt={campaign.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <h1 className="text-3xl md:text-4xl font-bold mb-3">
                  {campaign.title}
                </h1>
                <p className="text-white/90 text-lg flex items-center">
                  by {campaign.owner.slice(0, 6)}...{campaign.owner.slice(-4)}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <div className="backdrop-blur-md bg-white/30 p-8 rounded-[2rem] shadow-xl border border-white/40">
              <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-800 to-pink-600 bg-clip-text text-transparent">
                About this Campaign
              </h2>
              <p className="text-purple-800 leading-relaxed">
                {campaign.description}
              </p>
            </div>

            {/* Latest Donations */}
            <div className="backdrop-blur-md bg-white/30 p-8 rounded-[2rem] shadow-xl border border-white/40">
              <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-800 to-pink-600 bg-clip-text text-transparent">
                Latest Donations
              </h2>
              {donationsData && donationsData.length > 0 ? (
                <div className="space-y-4">
                  {donationsData
                    .slice(-5)
                    .reverse()
                    .map((donation, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-5 rounded-xl backdrop-blur-md bg-white/40 border border-white/40 hover:bg-white/50 transition-all duration-300 transform hover:scale-[1.02]"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-200 to-purple-200 flex items-center justify-center shadow-md">
                            <Heart className="w-6 h-6 text-purple-600" />
                          </div>
                          <span className="text-purple-900 font-medium">
                            {donation.donor.slice(0, 6)}...
                            {donation.donor.slice(-4)}
                          </span>
                        </div>
                        <span className="text-xl bg-gradient-to-r from-purple-700 to-pink-600 bg-clip-text text-transparent font-bold">
                          {formatEther(donation.amount)} EDU
                        </span>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-purple-700 mb-4">
                    No donations yet. Be the first to contribute!
                  </p>
                  <div className="inline-block bg-gradient-to-r from-pink-200 to-purple-200 p-4 rounded-full animate-pulse">
                    <Heart className="w-8 h-8 text-purple-600" />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Campaign Stats */}
            <div className="backdrop-blur-md bg-white/30 p-8 rounded-[2rem] shadow-xl border border-white/40">
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-purple-700">Progress</span>
                    <span className="text-purple-900 font-medium">
                      {Math.round(progress)}%
                    </span>
                  </div>
                  <div className="w-full bg-white/50 rounded-full h-4 overflow-hidden shadow-inner">
                    <div
                      className="bg-gradient-to-r from-pink-500 to-purple-600 h-4 rounded-full transition-all duration-500"
                      style={{
                        width: `${Math.min(progress, 100)}%`,
                      }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  <div className="backdrop-blur-md bg-white/40 p-4 rounded-xl border border-white/40">
                    <p className="text-sm text-purple-700 mb-1">Raised</p>
                    <p className="text-xl font-bold bg-gradient-to-r from-purple-700 to-pink-600 bg-clip-text text-transparent">
                      {(campaign.targetReached || campaign.isCompleted) &&
                      campaign.fundsWithdrawn
                        ? formatEther(campaign.completedAmount)
                        : formatEther(campaign.raisedAmount)}
                      EDU
                    </p>
                  </div>
                  <div className="backdrop-blur-md bg-white/40 p-4 rounded-xl border border-white/40">
                    <p className="text-sm text-purple-700 mb-1">Target</p>
                    <p className="text-xl font-bold bg-gradient-to-r from-purple-700 to-pink-600 bg-clip-text text-transparent">
                      {formatEther(campaign.targetAmount)} EDU
                    </p>
                  </div>
                </div>

                <div className="backdrop-blur-md bg-white/40 p-4 rounded-xl border border-white/40">
                  <p className="text-sm text-purple-700 mb-1">Deadline</p>
                  <p className="text-xl font-semibold text-purple-900">
                    {new Date(
                      Number(campaign.deadline) * 1000
                    ).toLocaleDateString()}
                  </p>
                </div>

                <div className="backdrop-blur-md bg-white/40 p-4 rounded-xl border border-white/40">
                  <p className="text-sm text-purple-700 mb-2">Status</p>
                  <span
                    className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${
                      campaign.isCompleted
                        ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white"
                        : "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                    } shadow-md`}
                  >
                    {campaign.isCompleted ? "Completed" : "Active"}
                  </span>
                </div>
              </div>
            </div>

            {/* Donation Form */}
            {(!campaign.isCompleted ||
              new Date() < new Date(Number(campaign.deadline) * 1000)) &&
              !campaign.fundsWithdrawn && (
                <div className="backdrop-blur-md bg-white/30 p-8 rounded-[2rem] shadow-xl border border-white/40">
                  <h3 className="text-xl font-bold mb-6 bg-gradient-to-r from-purple-800 to-pink-600 bg-clip-text text-transparent">
                    Make a Donation
                  </h3>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-purple-700 mb-2">
                        Amount (EDU)
                      </label>
                      <input
                        type="number"
                        value={donationAmount}
                        onChange={(e) => setDonationAmount(e.target.value)}
                        className="w-full border border-white/40 rounded-xl px-4 py-3 bg-white/50 backdrop-blur-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-inner text-purple-900"
                        placeholder="0.0"
                        min="0"
                        step="0.01"
                      />
                    </div>
                    <button
                      onClick={handleDonate}
                      disabled={isLoading || !donationAmount}
                      className="group w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-full font-medium shadow-lg hover:shadow-pink-300/30 disabled:opacity-50 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      {isLoading ? "Processing..." : "Donate Now"}
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              )}

            {/* Admin Actions */}
            {(canWithdraw || canManage) && (
              <div className="backdrop-blur-md bg-white/30 p-8 rounded-[2rem] shadow-xl border border-white/40">
                <h3 className="text-xl font-bold mb-6 bg-gradient-to-r from-purple-800 to-pink-600 bg-clip-text text-transparent">
                  Campaign Management
                </h3>
                <div className="space-y-4">
                  {canWithdraw && (
                    <button
                      onClick={handleWithdraw}
                      disabled={isLoading}
                      className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-full font-medium shadow-lg hover:shadow-green-300/30 disabled:opacity-50 transition-all duration-300 transform hover:scale-105"
                    >
                      {isLoading ? "Processing..." : "Withdraw Funds"}
                    </button>
                  )}
                  {canManage && (
                    <div>
                      <button
                        onClick={handleDelete}
                        disabled={
                          isLoading ||
                          campaign.isCompleted ||
                          campaign.fundsWithdrawn ||
                          Number(formatEther(campaign.raisedAmount)) > 0
                        }
                        className="w-full bg-gradient-to-r from-red-500 to-pink-600 text-white px-6 py-3 rounded-full font-medium shadow-lg hover:shadow-red-300/30 disabled:opacity-50 transition-all duration-300 transform hover:scale-105"
                      >
                        {isLoading
                          ? "Processing..."
                          : campaign.isCompleted
                          ? "Cannot Delete Completed Campaign"
                          : Number(formatEther(campaign.raisedAmount)) > 0
                          ? "Cannot Delete Campaign with Donations"
                          : "Delete Campaign"}
                      </button>
                      {(campaign.isCompleted ||
                        campaign.fundsWithdrawn ||
                        Number(formatEther(campaign.raisedAmount)) > 0) && (
                        <p className="text-sm text-pink-600 mt-3 text-center backdrop-blur-md bg-white/40 p-3 rounded-xl border border-white/40">
                          {campaign.isCompleted
                            ? "Completed campaigns cannot be deleted"
                            : "Campaigns with donations or donations withdrawn cannot be deleted"}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
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