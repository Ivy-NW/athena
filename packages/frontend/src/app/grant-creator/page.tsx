"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useCrowdfunding } from "@/blockchain/hooks/useCrowdfunding";
import { isAddress } from "ethers";
import { ArrowLeft, UserPlus, UserMinus, ShieldAlert } from "lucide-react";
import Link from "next/link";

export default function GrantCreator() {
  const router = useRouter();
  const { grantCampaignCreatorRole, revokeCampaignCreatorRole, isAdmin } =
    useCrowdfunding();
  const [grantAddress, setGrantAddress] = useState("");
  const [revokeAddress, setRevokeAddress] = useState("");
  const [isLoadingGrant, setIsLoadingGrant] = useState(false);
  const [isLoadingRevoke, setIsLoadingRevoke] = useState(false);
  const [grantError, setGrantError] = useState("");
  const [revokeError, setRevokeError] = useState("");

  const handleGrantSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGrantError("");

    if (!isAddress(grantAddress)) {
      setGrantError("Invalid Ethereum address");
      return;
    }

    try {
      setIsLoadingGrant(true);
      await grantCampaignCreatorRole(grantAddress as `0x${string}`);
      setGrantAddress("");
      alert("Creator role granted successfully!");
    } catch (error) {
      console.error("Error granting creator role:", error);
      setGrantError(
        "Failed to grant creator role. Make sure you have admin permissions."
      );
    } finally {
      setIsLoadingGrant(false);
    }
  };

  const handleRevokeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRevokeError("");

    if (!isAddress(revokeAddress)) {
      setRevokeError("Invalid Ethereum address");
      return;
    }

    try {
      setIsLoadingRevoke(true);
      await revokeCampaignCreatorRole(revokeAddress as `0x${string}`);
      setRevokeAddress("");
      alert("Creator role revoked successfully!");
    } catch (error) {
      console.error("Error revoking creator role:", error);
      setRevokeError(
        "Failed to revoke creator role. Make sure you have admin permissions."
      );
    } finally {
      setIsLoadingRevoke(false);
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

        {!isAdmin ? (
          <div className="relative">
            <div className="absolute -inset-2 bg-gradient-to-r from-red-200 to-pink-200 rounded-[2rem] transform rotate-1 opacity-80"></div>
            <div className="backdrop-blur-md bg-white/30 p-8 rounded-[2rem] shadow-xl border border-white/40 relative z-10">
              <div className="flex flex-col items-center text-center">
                <div className="bg-gradient-to-br from-red-200 to-pink-200 p-5 rounded-full w-20 h-20 flex items-center justify-center mb-6">
                  <ShieldAlert className="w-10 h-10 text-red-600" />
                </div>
                <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                  Access Denied
                </h1>
                <p className="text-purple-800 mb-6">
                  You must be an admin to access this page.
                </p>
                <Link
                  href="/"
                  className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-full font-medium shadow-lg hover:shadow-pink-300/30 transition-all duration-300 transform hover:scale-105"
                >
                  Return to Home
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Grant Role Section */}
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-green-200 to-blue-200 rounded-[2rem] transform rotate-1 opacity-80"></div>
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-200 to-green-200 rounded-[2rem] transform -rotate-1 opacity-60"></div>
              <div className="backdrop-blur-md bg-white/30 p-8 rounded-[2rem] shadow-xl border border-white/40 relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-gradient-to-br from-green-200 to-blue-200 p-4 rounded-full w-16 h-16 flex items-center justify-center">
                    <UserPlus className="w-8 h-8 text-green-600" />
                  </div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                    Grant Campaign Creator Role
                  </h1>
                </div>

                <form onSubmit={handleGrantSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-purple-800 mb-2">
                      Ethereum Address
                    </label>
                    <input
                      type="text"
                      value={grantAddress}
                      onChange={(e) => setGrantAddress(e.target.value)}
                      className="w-full border border-white/40 rounded-xl px-4 py-3 bg-white/50 backdrop-blur-sm focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-inner text-purple-900"
                      placeholder="0x..."
                      required
                    />
                  </div>

                  {grantError && (
                    <div className="backdrop-blur-md bg-red-100/50 border border-red-200 rounded-xl p-3 text-red-600 text-sm">
                      {grantError}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isLoadingGrant}
                    className="w-full bg-gradient-to-r from-green-500 to-blue-600 text-white px-6 py-3 rounded-full font-medium shadow-lg hover:shadow-green-300/30 disabled:opacity-50 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                  >
                    {isLoadingGrant ? "Processing..." : "Grant Creator Role"}
                    <UserPlus className="w-5 h-5" />
                  </button>
                </form>
              </div>
            </div>

            {/* Revoke Role Section */}
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-red-200 to-pink-200 rounded-[2rem] transform rotate-1 opacity-80"></div>
              <div className="absolute -inset-2 bg-gradient-to-r from-pink-200 to-red-200 rounded-[2rem] transform -rotate-1 opacity-60"></div>
              <div className="backdrop-blur-md bg-white/30 p-8 rounded-[2rem] shadow-xl border border-white/40 relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-gradient-to-br from-red-200 to-pink-200 p-4 rounded-full w-16 h-16 flex items-center justify-center">
                    <UserMinus className="w-8 h-8 text-red-600" />
                  </div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                    Revoke Campaign Creator Role
                  </h1>
                </div>

                <form onSubmit={handleRevokeSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-purple-800 mb-2">
                      Ethereum Address
                    </label>
                    <input
                      type="text"
                      value={revokeAddress}
                      onChange={(e) => setRevokeAddress(e.target.value)}
                      className="w-full border border-white/40 rounded-xl px-4 py-3 bg-white/50 backdrop-blur-sm focus:ring-2 focus:ring-red-500 focus:border-transparent shadow-inner text-purple-900"
                      placeholder="0x..."
                      required
                    />
                  </div>

                  {revokeError && (
                    <div className="backdrop-blur-md bg-red-100/50 border border-red-200 rounded-xl p-3 text-red-600 text-sm">
                      {revokeError}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isLoadingRevoke}
                    className="w-full bg-gradient-to-r from-red-500 to-pink-600 text-white px-6 py-3 rounded-full font-medium shadow-lg hover:shadow-red-300/30 disabled:opacity-50 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                  >
                    {isLoadingRevoke ? "Processing..." : "Revoke Creator Role"}
                    <UserMinus className="w-5 h-5" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
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