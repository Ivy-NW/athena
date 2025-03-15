"use client";

import { useCrowdfunding } from "@/blockchain/hooks/useCrowdfunding";
import { CampaignCard } from "./CampaignCard";
import Link from "next/link";
import { useEffect, useState } from "react";
import { QueryObserverResult } from "@tanstack/react-query";
import { ReadContractErrorType } from "viem";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { useAccount } from "wagmi";
import { Campaign } from "@/types/crowdfunding";

export function CampaignGrid() {
  const { campaigns, refetchCampaigns } = useCrowdfunding() as {
    campaigns: Campaign[];
    refetchCampaigns: () => Promise<
      QueryObserverResult<unknown, ReadContractErrorType>
    >;
  };

  const { address } = useAccount();
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("active");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    const fetchCampaigns = async () => {
      setLoading(true);
      try {
        await refetchCampaigns();
      } catch (error) {
        console.error("Error fetching campaigns:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, [refetchCampaigns]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filter]);

  // Calculate total active campaigns dynamically
  const totalActiveCampaigns = campaigns?.filter(
    (campaign) => !campaign.isCompleted
  ).length;

  const filteredCampaigns = campaigns?.filter((campaign) => {
    const searchLower = searchTerm.toLowerCase().trim();
    const campaignTitle = campaign.title.toLowerCase();
    const campaignOwner = campaign.owner.toLowerCase();

    switch (filter) {
      case "active":
        if (campaign.isCompleted) return false;
        break;
      case "completed":
        if (!campaign.isCompleted) return false;
        break;
      case "myCampaigns":
        if (!address || campaignOwner !== address.toLowerCase()) return false;
        break;
    }

    if (searchTerm) {
      return (
        campaignTitle.includes(searchLower) ||
        campaignOwner.includes(searchLower)
      );
    }

    return true;
  });

  const getCampaignCount = () => {
    switch (filter) {
      case "active":
        return totalActiveCampaigns || 0;
      case "completed":
        return (campaigns?.length || 0) - (totalActiveCampaigns || 0);
      case "myCampaigns":
        return filteredCampaigns?.length || 0;
      default:
        return campaigns?.length || 0;
    }
  };

  const totalItems = searchTerm
    ? filteredCampaigns?.length
    : getCampaignCount();
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCampaigns = filteredCampaigns?.slice(startIndex, endIndex);

  const PaginationButton = ({
    page,
    current,
  }: {
    page: number;
    current: boolean;
  }) => (
    <button
      onClick={() => setCurrentPage(page)}
      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
        current
          ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg shadow-purple-300/30 transform scale-110"
          : "backdrop-blur-md bg-white/30 border border-white/40 text-purple-900 hover:bg-white/50"
      }`}
    >
      {page}
    </button>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="backdrop-blur-md bg-white/30 p-8 rounded-[2rem] shadow-xl border border-white/40">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-purple-900 font-medium">Loading campaigns from the blockchain...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-4">
      {/* Search and Filter Section */}
      <div className="backdrop-blur-md bg-white/30 p-6 rounded-[2rem] shadow-xl border border-white/40">
        <div className="flex flex-col space-y-6 lg:space-y-0 lg:flex-row lg:items-center lg:justify-between">
          {/* Search Bar Container */}
          <div className="relative flex-grow lg:max-w-md">
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-pink-200 to-purple-200 p-2 rounded-full">
              <Search className="text-purple-700 w-5 h-5" />
            </div>
            <input
              type="text"
              placeholder="Search by title or address..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-14 pr-4 py-3.5 rounded-full bg-white/50 backdrop-blur-sm 
                   border border-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 
                   text-purple-900 placeholder-purple-400
                   transition-all duration-300 ease-in-out shadow-inner"
            />
          </div>

          {/* Filter Buttons Container */}
          <div className="flex flex-wrap gap-3 justify-start lg:justify-end">
            <button
              onClick={() => setFilter("all")}
              className={`px-5 py-3 rounded-full transition-all duration-300 ease-in-out text-sm font-medium
                   ${
                     filter === "all"
                       ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg shadow-purple-500/30"
                       : "backdrop-blur-md bg-white/30 border border-white/40 text-purple-900 hover:bg-white/50"
                   }`}
            >
              All Campaigns
            </button>
            <button
              onClick={() => setFilter("active")}
              className={`px-5 py-3 rounded-full transition-all duration-300 ease-in-out text-sm font-medium
                   ${
                     filter === "active"
                       ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg shadow-purple-500/30"
                       : "backdrop-blur-md bg-white/30 border border-white/40 text-purple-900 hover:bg-white/50"
                   }`}
            >
              Active
            </button>
            <button
              onClick={() => setFilter("completed")}
              className={`px-5 py-3 rounded-full transition-all duration-300 ease-in-out text-sm font-medium
                   ${
                     filter === "completed"
                       ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg shadow-purple-500/30"
                       : "backdrop-blur-md bg-white/30 border border-white/40 text-purple-900 hover:bg-white/50"
                   }`}
            >
              Completed
            </button>
            <button
              onClick={() => setFilter("myCampaigns")}
              className={`px-5 py-3 rounded-full transition-all duration-300 ease-in-out text-sm font-medium
                   ${
                     filter === "myCampaigns"
                       ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg shadow-purple-500/30"
                       : "backdrop-blur-md bg-white/30 border border-white/40 text-purple-900 hover:bg-white/50"
                   }`}
            >
              My Campaigns
            </button>
          </div>
        </div>
      </div>

      {/* Campaigns Grid */}
      {!currentCampaigns || currentCampaigns.length === 0 ? (
        <div className="flex items-center justify-center py-12">
          <div className="backdrop-blur-md bg-white/30 p-8 rounded-[2rem] shadow-xl border border-white/40">
            <p className="text-purple-900 font-medium">No campaigns found.</p>
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentCampaigns.map((campaign) => (
              <Link href={`/campaign/${campaign.id}`} key={campaign.id} className="transform hover:scale-[1.02] transition-all duration-300">
                <CampaignCard campaign={campaign} />
              </Link>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-3 mt-12">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md bg-white/30 border border-white/40 text-purple-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:bg-white/50"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {[...Array(totalPages)].map((_, i) => (
                <PaginationButton
                  key={i + 1}
                  page={i + 1}
                  current={currentPage === i + 1}
                />
              ))}

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md bg-white/30 border border-white/40 text-purple-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:bg-white/50"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}