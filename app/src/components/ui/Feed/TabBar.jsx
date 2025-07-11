export default function TabBar() {
  return (
    <>
      <div className="tab-bar w-180 bg-primary h-10 rounded-2xl flex items-center justify-center gap-3 shadow-md">
        <div className="tab">
          <a href="/home/feed/recomendados" className="text-white font-light hover:underline hover:font-semibold ease-in-out duration-300">
            Recomendados
          </a>
        </div>
        <div className="separator">
          <span className="text-white font-regular">|</span>
        </div>
        <div className="tab">
          <a href="/home/feed/matches" className="text-white font-light hover:underline hover:font-semibold ease-in-out duration-300">
            Matches
          </a>
        </div>
      </div>
    </>
  );
}
