import TabBar from "@/components/ui/Home/Feed/TabBar";
import Feed from "@/components/ui/Home/Feed/Feed";

export default function feedPage() {
  return (
    <>
      <div className="feed-container w-full h-full flex flex-col items-center justify-start py-10">
        <TabBar />
        <Feed />
      </div>
    </>
  );
}
