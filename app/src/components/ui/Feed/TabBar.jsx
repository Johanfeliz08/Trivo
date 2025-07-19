export default function TabBar({ currentTab, setCurrentTab }) {
  return (
    <>
      <div className="tab-bar w-180 bg-primary h-10 rounded-2xl flex items-center justify-center gap-3 shadow-md">
        <div className="tab">
          <button
            type="button"
            className={`text-white font-light hover:underline hover:font-semibold ease-in-out duration-300 ${currentTab === "recomendados" ? "font-semibold underline" : ""}`}
            onClick={() => setCurrentTab("recomendados")}
          >
            Recomendados
          </button>
        </div>
        <div className="separator">
          <span className="text-white font-regular">|</span>
        </div>
        <div className="tab">
          <button
            type="button"
            className={`text-white font-light hover:underline hover:font-semibold ease-in-out duration-300 ${currentTab === "matches" ? "font-semibold underline" : ""}`}
            onClick={() => setCurrentTab("matches")}
          >
            Matches
          </button>
        </div>
      </div>
    </>
  );
}
