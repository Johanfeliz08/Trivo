export default function nextButton({ mainText, secondaryText, currentStep, setCurrentStep }) {
  return (
    <>
      <div className="next-btn relative">
        <button className=" cursor-pointer" onClick={() => setCurrentStep(currentStep + 1)}>
          <div className="text px-10">
            <span className="main-text font-semibold">{mainText}</span>
            <span className="secondary-text font-light">{secondaryText}</span>
          </div>
          <div className="arrow">
            <svg className="size-8 fill-white" xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24">
              <path d="m18.541,10.894l-4.717-4.717-.707.707,4.616,4.617H5v1h12.735l-4.618,4.617.707.707,4.717-4.716c.296-.296.459-.69.459-1.108s-.163-.812-.459-1.106Z" />
            </svg>
          </div>
        </button>
      </div>
    </>
  );
}
