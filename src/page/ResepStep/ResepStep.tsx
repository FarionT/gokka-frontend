// import react
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";

// import data
import './ResepStep.scss';
import { Button } from "../../ui-kit";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import Right from '../../assets/Logo/Right.svg';
import Left from '../../assets/Logo/Left.svg';
import { useLoader } from "../../utils/userLoader";
import { useErrorHandler } from "../../utils/getAuth";
import { getRecipeStepById } from "../../services/recipe.services";

const ResepStep = () => {
  const params = useParams();
  const [activeSlide, setActiveSlide] = useState(0);

  const { showLoader, hideLoader } = useLoader();
  const handleErrorResponse = useErrorHandler();
  const [totalStep, setTotalStep] = useState(1)
  const [stepsData, setStepsData] = useState<Record<number, any>>({});

  const fetchData = async (step: number) => {
    if (!params.id) return;
    try {
      showLoader();
      const res = await getRecipeStepById({ id: params.id, step });
      if (res.status === 200) {
        const data = res.data.data;
        setTotalStep(data.total_step);
        setStepsData((prev) => ({
          ...prev,
          [step]: data,
        }));
      } else handleErrorResponse(res);
    } finally {
      hideLoader();
    }
  };

  useEffect(() => {
    if (params.id) {
      fetchData(1); // fetch first step on mount
    }
  }, [params.id]);

  const handleSlideChange = (swiper: any) => {
    const newStep = swiper.activeIndex + 1;
    setActiveSlide(swiper.activeIndex);

    // Fetch only if not already fetched
    if (!stepsData[newStep]) {
      fetchData(newStep);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const swiperRef = useRef<any>(null);

  return (
    <div className="resep-step">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div>
          <Swiper
            modules={[Navigation, Pagination]}
            pagination
            
            // navigation={{
            //   prevEl: navigationPrevRef.current,
            //   nextEl: navigationNextRef.current,
            // }}
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
            onSlideChange={handleSlideChange}
          >
            {Array.from({ length: totalStep }).map((_, index) => {
              const stepNumber = index + 1;
              const stepData = stepsData[stepNumber]
              return  (
                <SwiperSlide key={index}>
                  <div className="resep-step-item aspect-square">
                    {stepData?.path ? (
                      <video
                        className="relative h-full w-full object-cover object-[0%_65%]"
                        autoPlay
                        muted
                        loop
                        playsInline
                      >
                        <source src={stepData.path} type="video/mp4" />
                      </video>
                    ) : (
                      <div className="flex items-center justify-center h-full text-white">
                        Loading video...
                      </div>
                    )}
                  </div>
                </SwiperSlide>
              )
            })}
          </Swiper>
        </div>
        <div className="px-8 pt-3 pb-8 resep-step-text">
          <div className="flex gradient-gold gradient-gold-line font-semibold pb-8">
            Step {activeSlide + 1}
          </div>
          <div className="font-bold text-2xl lg:text-4xl pb-4">
            {stepsData[activeSlide + 1]?.name || "Loading..."}
          </div>
          <div className="text-sm lx:text-base pb-8">
            {stepsData[activeSlide + 1]?.description || ""}
          </div>
          <a href="https://linktr.ee/gokkaindonesia" target="__blank">
            <Button className="font-bold w-fit">Beli Produk</Button>
          </a>
        </div>
        <div className="flex justify-between px-10 py-8">
          <div
            onClick={() => swiperRef.current?.slidePrev()}
            className={`cursor-pointer ${
              activeSlide === 0 ? "opacity-50" : ""
            }`}
          >
            <img src={Left} />
          </div>
          <div
            onClick={() => swiperRef.current?.slideNext()}
            className={`cursor-pointer ${
              activeSlide === totalStep - 1 ? "opacity-50" : ""
            }`}
          >
            <img src={Right} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResepStep;