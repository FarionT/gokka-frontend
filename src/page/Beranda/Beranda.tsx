import './Beranda.scss';
import { produk } from '../Produk/ListData';

// Importing Images
import Shopee from '../../assets/Logo/Shopee.svg';
import Blibli from '../../assets/Logo/Blibli.svg';
import Lazada from '../../assets/Logo/Lazada.svg';
import Tokopedia from '../../assets/Logo/Tokopedia.svg';
import BrandOwner from '../../assets/Image/BrandOwner.jpg';
import KualitasPremium from '../../assets/Logo/KualitasPremium.svg';
import TahanLama from '../../assets/Logo/TahanLama.svg';
import TerjaminHalal from '../../assets/Logo/TerjaminHalal.svg';
import VariatifRasa from '../../assets/Logo/VariatifRasa.svg';
import Rame from '../../assets/Image/Rame.svg';
import Model from '../../assets/Image/Banner1.png';
import ModelTwo from '../../assets/Image/Model2.png';
import KatalogBackground from '../../assets/Image/ProdukKatalog/KatalogBackground.jpg';
import TestimoniOne from '../../assets/Image/Testimoni1.png';
import TestimoniTwo from '../../assets/Image/Testimoni2.jpg';
import TestimoniThree from '../../assets/Image/Testimoni3.png';
import WingRight from '../../assets/Image/WingRight.svg';
import Right from '../../assets/Logo/Right.svg';
import Left from '../../assets/Logo/Left.svg';

// Importing ui kit
import { Button } from '../../ui-kit';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { ProdukBeranda, TestimoniBeranda } from '../../components';
import { resepData } from '../Resep/ResepData';
import { useRef, useState } from 'react';

const Beranda = () => {
  const tentangLogo = [
    {
      src: VariatifRasa,
      caption: 'Variatif Rasa'
    },
    {
      src: TahanLama,
      caption: 'Tahan Lama'
    },
    {
      src: TerjaminHalal,
      caption: 'Terjamin Halal'
    },
    {
      src: KualitasPremium,
      caption: 'Kualitas Premium'
    },
  ]

  const [activeResepSlide, setActiveResepSlide] = useState(0);
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const swiperRef = useRef<any>(null);

  return (
    <div className="beranda">
      {/* banner  */}
      <div className='beranda-banner h-[700px] relative overflow-hidden'>
        <Swiper
          modules={[Autoplay]}
          // autoplay={{
          //   delay: 2500,
          //   disableOnInteraction: false,
          // }}
          slidesPerView={1}
          className='xl:mx-auto mx-6 h-full'
        >
          <SwiperSlide className='overflow-hidden'>
            <div className='relative w-full h-full'>
              <img src={Model} className='relative beranda-banner-image aspect-square object-cover object-top h-full w-full mx-auto' />
            </div>
          </SwiperSlide>
          <SwiperSlide className='overflow-hidden aspect-square'>
            <div className='relative w-full h-full'>
              <img src={ModelTwo} className='relative beranda-banner-image aspect-square object-cover object-top h-full w-full mx-auto' />
            </div>
          </SwiperSlide>
        </Swiper>
        <img src={KatalogBackground} className='absolute top-0 w-full h-full pattern rotate-180 object-cover' />
        <div className='flex flex-col items-center gap-2 beranda-banner-text relative z-4'>
          <div className='gradient-gold font-bold text-xl md:text-4xl text-shadow-xs/10'><span>Jelajahi Rasa,</span>{' '}<span>Penuh Warna!</span></div>
          <div className='font-semibold text-white'>Kami memiliki 54 varian rasa</div>
          <a href='/produk'>
            <Button className='font-bold w-fit'>Jelajahi</Button>
          </a>
        </div>
        {/* <img src={Model} className='beranda-banner-image' />
        <div className='flex flex-col items-center gap-2 beranda-banner-text'>
          <div className='gradient-gold font-bold text-xl md:text-4xl text-shadow-xs/10'>Jelajahi Rasa, Penuh Warna!</div>
          <div className='font-semibold text-white'>Kami memiliki 54 varian rasa</div>
          <Button className='font-bold w-fit'>Jelajahi</Button>
        </div> */}
      </div>
      {/* produk kami  */}
      <div className='beranda-produk'>
        <div className='gradient-gold gradient-gold-line flex w-fit font-semibold py-8 text-base md:text-2xl'>PRODUK KAMI</div>
        <div className='mx-auto flex gradient-gold font-bold w-fit text-3xl md:text-4xl py-8'>Produk Best Seller</div>
        <div className='gradient-gold gradient-gold-both flex font-semibold py-8 text-base md:text-2xl px-4'>SIRUP CAIR</div>
        <div className='px-8 xl:px-0'>
          <Swiper
            modules={[Pagination, Navigation]}
            navigation
            spaceBetween={50}
            slidesPerView={1}
            pagination={{ clickable: true }}
            className='xl:mx-auto mx-6'
            breakpoints={{ 
              768: {
                slidesPerView: 2
              },
              1200: {
                slidesPerView: 3
              }
            }}
          >
            <SwiperSlide><ProdukBeranda image={produk[0].image} name={produk[0].name} color={produk[0].color} /></SwiperSlide>
            <SwiperSlide><ProdukBeranda image={produk[0].image} name={produk[0].name} color={produk[0].color} /></SwiperSlide>
            <SwiperSlide><ProdukBeranda image={produk[0].image} name={produk[0].name} color={produk[0].color} /></SwiperSlide>
          </Swiper>
        </div>
        <a href='/produk' className='w-fit flex mx-auto'>
          <Button className='font-bold w-fit mx-auto my-8'>Jelajahi Produk</Button>
        </a>
        <div className='gradient-gold gradient-gold-both flex font-semibold py-8 text-base md:text-2xl'>SIRUP BUBUK</div>
        <div className='px-8 xl:px-0'>
          <Swiper
            modules={[Pagination, Navigation]}
            navigation
            spaceBetween={50}
            slidesPerView={1}
            pagination={{ clickable: true }}
            className='xl:mx-auto mx-6'
            breakpoints={{ 
              768: {
                slidesPerView: 2
              },
              1200: {
                slidesPerView: 3
              }
            }}
          >
            <SwiperSlide><ProdukBeranda image={produk[0].image} name={produk[0].name} color={produk[0].color} /></SwiperSlide>
            <SwiperSlide><ProdukBeranda image={produk[0].image} name={produk[0].name} color={produk[0].color} /></SwiperSlide>
            <SwiperSlide><ProdukBeranda image={produk[0].image} name={produk[0].name} color={produk[0].color} /></SwiperSlide>
          </Swiper>
        </div>
        <a href='/produk' className='w-fit flex mx-auto'>
          <Button className='font-bold w-fit mx-auto flex my-8'>Jelajahi Produk</Button>
        </a>
      </div>
      {/* beranda tentang kami */}
      <div className='beranda-tentang mx-auto'>
        <div className='w-fit flex text-base md:text-2xl font-semibold gradient-gold gradient-gold-line -ps-8'>TENTANG KAMI</div>
        <div className="flex flex-col items-center text-center text-3xl md:text-4xl py-15">
          <span className='font-bold'>Kita, Lebih dari Sekadar</span>
          <span className='font-bold gradient-gold'>Sirup</span>
        </div>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-16 text-white px-8 xl:px-0'>
          <img src={BrandOwner} className='w-full rounded-3xl grayscale'/>
          <div className='flex flex-col gap-16'>
            <div className='flex justify-between'>
              {tentangLogo.map((item, index) => (
                <div className='flex flex-col items-center text-center shrink-0 w-16 md:w-24 gap-0 md:gap-3' key={index}>
                  <img src={item.src} className='h-20 md:h-24 xl:h-28 2xl:h-32' />
                  <div className='text-wrap text-xs md:text-base'>{item.caption}</div>
                </div>
              ))}
            </div>
            <div className='flex flex-col gap-6 items-center text-center'>
              <div className='font-semibold text-xl md:text-3xl'>Pemilik Brand Gokka - Innawati</div>
              <div className=''>
                Kami, sangat suka berinovasi untuk memiliki varian rasa yang banyak dan kreatif dalam membuat rasa esen. Sehingga dapat memenuhi kebutuhan konsumen yang bervariasi
              </div>
              <a href='/tentang-kami'>
                <Button className='w-fit font-bold'>Baca Artikel</Button>
              </a>
            </div>
          </div>
        </div>
        <div className='flex flex-col py-16 items-center'>
          <img src={Rame} className='w-full max-w-xl'/>
          <div className='flex flex-col items-center text-3xl md:text-4xl py-7 font-semibold'>
            <span>Ayo Temukan</span>
            <span className='gradient-gold'>Duniamu!</span>
          </div>
          <a href='/produk'>
            <Button className='w-fit font-bold'>Jelajahi</Button>
          </a>
        </div>
      </div>
      {/* RESEP KAMI  */}
      <div className='beranda-resep'>
        <div className='font-bold text-3xl md:text-4xl text-center'>
          Kreasikan Rasa<br/>dengan <span className='gradient-gold'>Gokka</span>
        </div>
        <div className=''>
          <Swiper
            loop
            spaceBetween={50}
            slidesPerView={1}
            pagination={{ clickable: true }}
            className='xl:mx-auto mx-6'
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
            onSlideChange={(swiper) => {
              setActiveResepSlide(swiper.activeIndex)
            }}
          >
            {resepData.map((item, index) => (
              <SwiperSlide>
                <div className='beranda-resep-item flex flex-col py-10 overflow-hidden' key={index}>
                  <div className='beranda-resep-item-circle flex justify-center items-center mx-auto'>
                    <img src={WingRight} className='beranda-resep-item-wing-left' />
                    <img src={WingRight} className='beranda-resep-item-wing-right' />
                    <img src={item.image} />
                  </div>
                  <div className='flex font-semibold text-xl pb-8 mx-auto py-8'>{item.name}</div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="flex justify-between px-10 items-center w-fit gap-8 md:gap-16 mx-auto">
            <div onClick={() => swiperRef.current?.slidePrev()} className={`cursor-pointer`} >
              <img src={Left} className='w-5' /> 
            </div>
            <a href={`/resep/${activeResepSlide + 1}`} className='mx-auto'>
              <Button className='font-bold mx-auto word'>Baca Artikel</Button>
            </a>
            <div onClick={() => swiperRef.current?.slideNext()} className={`cursor-pointer`} >
              <img src={Right} className='w-5' /> 
            </div>
          </div>
        </div>
      </div>
      {/* TESTIMONI  */}
      <div className='beranda-testimoni py-8'>
        <div className='gradient-gold gradient-gold-line w-fit flex font-semibold py-8 text-base md:text-2xl'>TESTIMONI</div>
        <div className='text-3xl md:text-4xl text-center font-bold'>
          Kata Besti Kamu<br/>Gokka <span className='gradient-gold'>Juara!</span>
        </div>
        <div className='text-white text-center text-sm md:text-base pt-6 pb-12'>Kami memiliki 22.000 + Rating 5 di <br/>e-commerce</div>
        <div className='px-8 xl:px-0'>
          <Swiper
            modules={[Pagination, Navigation]}
            navigation
            spaceBetween={50}
            slidesPerView={1}
            pagination={{ clickable: true }}
            className='xl:mx-auto mx-6'
            breakpoints={{ 
              768: {
                slidesPerView: 2
              },
              1200: {
                slidesPerView: 3
              }
            }}
          >
            <SwiperSlide><TestimoniBeranda product={'Lemon'} review={'Rasa sangat enak'} user={'Oween N'} image={TestimoniOne} /></SwiperSlide>
            <SwiperSlide><TestimoniBeranda product={'Lemon'} review={'Rasa sangat enak'} user={'Oween N'} image={TestimoniTwo} /></SwiperSlide>
            <SwiperSlide><TestimoniBeranda product={'Lemon'} review={'Rasa sangat enak'} user={'Oween N'} image={TestimoniThree} /></SwiperSlide>
          </Swiper>
        </div>
        <a href='/testimoni' className='flex justify-center py-8 mx-auto w-fit'>
          <Button className='w-fit font-bold'>Review</Button>
        </a>
      </div>
      {/* beranda pembelian  */}
      <div className='beranda-pembelian flex flex-col py-20'>
        <div className='w-fit flex text-base md:text-2xl font-semibold gradient-gold gradient-gold-line'>PEMBELIAN</div>
        <div className="flex flex-col items-center text-center text-3xl md:text-4xl pt-7">
          <span className='font-bold'>Bebasin Gayamu,</span>
          <span className='font-bold'>Rasain Gokka</span>
          <span className='font-bold gradient-gold'>Sekarang!</span>
          <span className='text-white pt-3 text-xs xl:text-base w-68'>Produk kami dapat dibeli di berbagai platform e-commerce</span>
        </div>
        <div className='flex items-center justify-center gap-8 md:gap-15 lg:gap-24 py-12'>
          <a className='flex flex-col items-center justify-between gap-1' href='#'>
            <img src={Shopee} className='h-9 md:h-14 lg:h-18' />
            <div className='text-xs md:text-base lg:text-lg'>Shopee</div>
          </a>
          <a className='flex flex-col items-center justify-between gap-1' href='#'>
            <img src={Blibli} className='h-9 md:h-14 lg:h-18' />
            <div className='text-xs md:text-base lg:text-lg'>Blibli</div>
          </a>
          <a className='flex flex-col items-center justify-between gap-1' href='#'>
            <img src={Lazada} className='h-9 md:h-14 lg:h-18' />
            <div className='text-xs md:text-base lg:text-lg'>Lazada</div>
          </a>
          <a className='flex flex-col items-center justify-between gap-1' href='#'>
            <img src={Tokopedia} className='h-9 md:h-14 lg:h-18' />
            <div className='text-xs md:text-base lg:text-lg'>Tokopedia</div>
          </a>
        </div>
        <a href='https://linktr.ee/gokkaindonesia'  className='w-fit flex mx-auto'>
          <Button className='mx-auto font-bold'>Beli Sekarang</Button>
        </a>
      </div>
    </div>
  )
}

export default Beranda;