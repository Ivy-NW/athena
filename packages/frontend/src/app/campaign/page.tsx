// app/page.tsx
"use client";
// import { Profile } from "@/components/profile";
import { CampaignGrid } from "@/components/campaigns/CampaignGrid";
import CampaignsNavbar from "@/components/campaigns/navbar";
import EduAssistant from "@/components/edu-assistant";

export default function Home() {
  return (
    <div className="min-h-screen ">
      <div className="container mx-auto p-4">
        <EduAssistant />
        <CampaignsNavbar />
        {/* <Profile /> */}
        <CampaignGrid />
      </div>
    </div>
  );
}
