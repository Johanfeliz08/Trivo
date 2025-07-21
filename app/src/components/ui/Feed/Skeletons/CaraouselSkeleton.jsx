import UserCardSkeleton from "@/components/ui/Feed/Skeletons/userCardSkeleton";

const CarouselSkeleton = () => {
  return (
    <>
      <UserCardSkeleton className="prev absolute z-30 ease-in-out duration-500 2xl:translate-x-60 xl:translate-x-40 blur-[3px]" />
      <UserCardSkeleton className="active absolute z-40 ease-in-out duration-500" />
      <UserCardSkeleton className="next absolute z-30 ease-in-out duration-500 2xl:-translate-x-60 xl:-translate-x-40 blur-[3px]" />
    </>
  );
};

export default CarouselSkeleton;
