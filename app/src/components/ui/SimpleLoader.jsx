export default function SimpleLoader() {
  return (
    <>
      <div className="loader absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40 flex flex-col justify-center items-center bg-[rgba(238,235,255,.7)] w-full h-full">
        <div className="spinner w-13 h-13 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    </>
  );
}
