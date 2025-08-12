// import react
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";

// import data
import { resepData, type TRecipe } from "../Resep/ResepData";

import './ResepStep.scss';
import { Button } from "../../ui-kit";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import Right from '../../assets/Logo/Right.svg';
import Left from '../../assets/Logo/Left.svg';

const ResepStep = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [activeSlide, setActiveSlide] = useState(0);

  const [recipe, setRecipe] = useState<TRecipe>({
    id: 0,
    name: '',
    image: '',
    slogan: '',
    time: '',
    ingredients: [],
    steps: []
  });

  useEffect(() => {
    const isIdExists = resepData.find(item => item.id === Number(params.id));
    if (isIdExists) {
      setRecipe(isIdExists);
    } else {
      navigate(-1);
    }
  }, []);

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
            onSlideChange={(swiper) => {
              setActiveSlide(swiper.activeIndex)
            }}
          >
            {recipe.steps.map((item, index) => (
              <SwiperSlide>
                <div key={index} className="resep-step-item aspect-square">
                  <video className="relative h-full w-full object-cover object-[0%_65%]" autoPlay muted loop playsInline >
                    <source src={item.image} type="video/mp4" />
                  </video>
                </div>
                {/* <div className="p-8">
                  <div className="flex gradient-gold gradient-gold-line font-semibold pb-8">Step {index + 1}</div>
                  <div className="text-white font-bold text-4xl pb-4">{item.title}</div>
                  <div className="text-white pb-8">{item.content}</div>
                  <Button className="font-bold w-fit">Beli Produk</Button>
                </div> */}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        {recipe.steps.length > 0 ? (
          <div className="px-8 pt-3 pb-8 resep-step-text">
            <div className="flex gradient-gold gradient-gold-line font-semibold pb-8">Step {activeSlide + 1}</div>
            <div className="font-bold text-2xl lg:text-4xl pb-4">{recipe.steps[activeSlide].title}</div>
            <div className="text-sm lx:text-base pb-8">{recipe.steps[activeSlide].content}</div>
            <a href='https://linktr.ee/gokkaindonesia' target='__blank'>
              <Button className="font-bold w-fit">Beli Produk</Button>
            </a>
          </div>
        ) : (<div></div>)}
        <div className="flex justify-between px-10 py-8">
          <div onClick={() => swiperRef.current?.slidePrev()} className={`cursor-pointer ${activeSlide === 0 ? 'opacity-50' : ''}`} >
            <img src={Left} /> 
          </div>
          <div onClick={() => swiperRef.current?.slideNext()} className={`cursor-pointer ${activeSlide === recipe.steps.length - 1 ? 'opacity-50' : ''}`} >
            <img src={Right} /> 
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResepStep;