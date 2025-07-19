"use client";
import TabBar from "@/components/ui/Feed/TabBar";
import Feed from "@/components/ui/Feed/Feed";
import ActionBar from "@/components/ui/Feed/ActionBar";
import { useState } from "react";

export default function FeedPage() {
  const [currentTab, setCurrentTab] = useState("recomendados"); // Current tab for feed
  const [currentUserId, setCurrentUserId] = useState(null);

  return (
    <>
      <div className="feed-container w-full h-full flex flex-col items-center justify-evenly overflow-hidden 2xl:py-10 xl:py-3 xl:gap-4">
        <TabBar currentTab={currentTab} setCurrentTab={setCurrentTab} />
        <Feed currentTab={currentTab} setCurrentUserId={setCurrentUserId} />
        <ActionBar userId={currentUserId} />
      </div>
    </>
  );
}
