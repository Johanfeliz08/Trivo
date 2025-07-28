"use client";
import TabBar from "@/components/ui/Feed/TabBar";
import Feed from "@/components/ui/Feed/Feed";
import ActionBar from "@/components/ui/Feed/ActionBar";
import { useState } from "react";
import FeedByFilters from "@/components/ui/Feed/busqueda-por-filtros/FeedByFilters";
import TabBarByFilters from "@/components/ui/Feed/busqueda-por-filtros/TabBarByFilters";

export default function FeedPage() {
  const [currentTab, setCurrentTab] = useState("recomendados"); // Current tab for feed
  const [currentUserId, setCurrentUserId] = useState(null);
  const [applyFilters, setApplyFilters] = useState(false);
  const [filters, setFilters] = useState({
    interesIds: [],
    habilidadIds: [],
  });

  return (
    <>
      <div className="feed-container w-full h-full flex flex-col items-center justify-evenly overflow-hidden 2xl:py-10 xl:py-3 xl:gap-4">
        {applyFilters ? (
          <>
            <TabBarByFilters currentTab={currentTab} setCurrentTab={setCurrentTab} />
            <FeedByFilters currentTab={currentTab} setCurrentUserId={setCurrentUserId} applyFilters={applyFilters} setApplyFilters={setApplyFilters} filters={filters} setFilters={setFilters} />
          </>
        ) : (
          <>
            <TabBar currentTab={currentTab} setCurrentTab={setCurrentTab} />
            <Feed currentTab={currentTab} setCurrentUserId={setCurrentUserId} />
          </>
        )}

        <ActionBar userId={currentUserId} applyFilters={applyFilters} setApplyFilters={setApplyFilters} filters={filters} setFilters={setFilters} />
      </div>
    </>
  );
}
