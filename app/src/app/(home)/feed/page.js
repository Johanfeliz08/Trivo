import TabBar from "@/components/ui/Home/Feed/TabBar";
import Feed from "@/components/ui/Home/Feed/Feed";
import ActionBar from "@/components/ui/Home/Feed/ActionBar";

export default function feedPage() {
  return (
    <>
      <div className="feed-container w-full h-full flex flex-col items-center justify-evenly overflow-hidden 2xl:py-10 xl:py-3 xl:gap-4">
        <TabBar />
        <Feed />
        <ActionBar />
      </div>
    </>
  );
}
