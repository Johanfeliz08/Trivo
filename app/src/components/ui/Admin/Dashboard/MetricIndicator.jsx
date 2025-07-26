export default function MetricIndicator({ percentageChange, type }) {
  return (
    <>
      <div className={`metricIndicator flex flex-row items-center justify-center gap-1 bg-green-300 w-20 rounded-xl py-2 ${type === "positive" ? "bg-green-300" : "bg-red-300"}`}>
        <div className="icon">
          {type === "positive" ? (
            <svg className={`size-5 fill-green-600`} xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="512" height="512">
              <path d="M21,6h-6c-.553,0-1,.447-1,1s.447,1,1,1h5.586l-6.562,6.562c-.564,.564-1.482,.564-2.047,0l-2.539-2.539c-1.344-1.344-3.531-1.344-4.875,0L.293,16.293c-.391,.391-.391,1.023,0,1.414,.195,.195,.451,.293,.707,.293s.512-.098,.707-.293l4.27-4.27c.547-.547,1.5-.547,2.047,0l2.539,2.539c1.344,1.344,3.531,1.344,4.875,0l6.563-6.562v5.586c0,.553,.447,1,1,1s1-.447,1-1v-6c0-1.654-1.346-3-3-3Z" />
            </svg>
          ) : (
            <svg className={`size-5 fill-red-600`} xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="512" height="512">
              <path d="M23,8c-.553,0-1,.447-1,1v5.586l-6.563-6.562c-1.344-1.344-3.531-1.344-4.875,0l-2.577,2.577c-.543,.543-1.428,.543-1.971,0L1.707,6.293c-.391-.391-1.023-.391-1.414,0s-.391,1.023,0,1.414l4.308,4.308c1.322,1.322,3.477,1.322,4.799,0l2.577-2.577c.564-.564,1.482-.564,2.047,0l6.562,6.562h-5.586c-.553,0-1,.447-1,1s.447,1,1,1h6c1.654,0,3-1.346,3-3v-6c0-.553-.447-1-1-1Z" />
            </svg>
          )}
        </div>
        <span className="font-regular">{percentageChange}</span>
      </div>
    </>
  );
}
