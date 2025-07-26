import MetricIndicator from "./MetricIndicator";

export default function SmallWidget({ icon, title, value, percentageChange, valueType }) {
  return (
    <>
      <div className="widget flex flex-col bg-white rounded-2xl px-8 py-6 shadow-md border border-gray-300 w-full gap-2">
        <div className="widget-header flex flex-row justify-start items-center gap-2">
          <div className="icon size-5 fill-primary">{icon}</div>
          <h2 className="text-lg font-regular">{title}</h2>
        </div>
        <div className="widget-content flex flex-row gap-2 items-center justify-start">
          <p className="text-2xl font-semibold text-primary">{value}</p>
          <MetricIndicator percentageChange={percentageChange} type={valueType} />
        </div>
      </div>
    </>
  );
}
