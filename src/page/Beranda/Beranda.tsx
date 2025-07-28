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
import Model from '../../assets/Image/Model.png';

// Importing ui kit
import { Button } from '../../ui-kit';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { ProdukBeranda } from '../../components';
import { useNavigate } from 'react-router';

const Beranda = () => {
  const navigate = useNavigate();

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

  return (
    <div className="beranda">
      {/* banner  */}
      <div className='beranda-banner'>
        <img src={Model} className='beranda-banner-image' />
        <div className='flex flex-col items-center gap-2 beranda-banner-text'>
          <div className='gradient-gold font-bold text-xl md:text-4xl text-shadow-xs/10'>Jelajahi Rasa, Penuh Warna!</div>
          <div className='font-semibold text-white'>Kami memiliki 54 varian rasa</div>
          <Button className='font-bold w-fit'>Jelajahi</Button>
        </div>
      </div>
      {/* produk kami  */}
      <div className='beranda-produk'>
        <div className='gradient-gold gradient-gold-line flex w-fit font-semibold py-8 text-base md:text-2xl'>PRODUK KAMI</div>
        <div className='mx-auto flex gradient-gold font-bold w-fit text-3xl md:text-6xl py-8'>Produk Best Seller</div>
        <div className='gradient-gold gradient-gold-both flex font-semibold py-8 text-2xl px-4'>SIRUP CAIR</div>
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
        <Button onClick={() => navigate('/produk')} className='font-bold w-fit mx-auto flex my-8'>Jelajahi Produk</Button>
        <div className='gradient-gold gradient-gold-both flex font-semibold py-8 text-2xl'>SIRUP BUBUK</div>
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
        <Button onClick={() => navigate('/produk')} className='font-bold w-fit mx-auto flex my-8'>Jelajahi Produk</Button>
      </div>
      {/* beranda tentang kami */}
      <div className='beranda-tentang mx-auto'>
        <div className='w-fit flex text-xl font-semibold gradient-gold gradient-gold-line -ps-8'>TENTANG KAMI</div>
        <div className="flex flex-col items-center text-center text-3xl md:text-5xl/15 py-15">
          <span className='font-bold'>Kita, Lebih dari Sekadar Sirup</span>
        </div>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-16 text-white px-8 xl:px-0'>
          <img src={BrandOwner} className='w-full rounded-3xl grayscale'/>
          <div className='flex flex-col gap-16'>
            <div className='flex justify-between'>
              {tentangLogo.map((item, index) => (
                <div className='flex flex-col items-center text-center shrink-0 w-16 md:w-24 gap-0 md:gap-3' key={index}>
                  <img src={item.src} className='h-20 xl:h-28 2xl:h-32' />
                  <div className='text-wrap text-xs md:text-base'>{item.caption}</div>
                </div>
              ))}
            </div>
            <div className='flex flex-col gap-6 items-center text-center'>
              <div className='font-semibold text-3xl'>Pemilik Brand Gokka - Innawati</div>
              <div className=''>
                Kami, sangat suka berinovasi untuk memiliki varian rasa yang banyak dan kreatif dalam membuat rasa esen. Sehingga dapat memenuhi kebutuhan konsumen yang bervariasi
              </div>
              <Button className='w-fit font-bold'>Baca Artikel</Button>
            </div>
          </div>
        </div>
        <div className='flex flex-col py-16 items-center'>
          <img src={Rame} className='w-full max-w-xl'/>
          <div className='flex flex-col items-center text-3xl md:text-5xl/15 py-7 font-semibold'>
            <span>Ayo Temukan</span>
            <span className='gradient-gold'>Duniamu!</span>
          </div>
          <Button className='w-fit font-bold'>Jelajahi</Button>
        </div>
      </div>
      {/* beranda pembelian  */}
      <div className='beranda-pembelian flex flex-col py-20'>
        <div className='w-fit flex text-xl font-semibold gradient-gold gradient-gold-line'>PEMBELIAN</div>
        <div className="flex flex-col items-center text-center text-3xl md:text-5xl/15 pt-7">
          <span className='font-bold'>Bebasin Gayamu,</span>
          <span className='font-bold'>Rasain Gokka</span>
          <span className='font-bold gradient-gold'>Sekarang!</span>
          <span className='text-white pt-3 text-xs xl:text-base w-68'>Produk kami dapat dibeli di berbagai platform e-commerce</span>
        </div>
        <div className='flex items-center justify-center gap-12 md:gap-24 py-12'>
          <a className='flex flex-col items-center justify-between gap-1' href='#'>
            <img src={Shopee} className='h-9 md:h-20' />
            <div className='text-xs md:text-lg'>Shopee</div>
          </a>
          <a className='flex flex-col items-center justify-between gap-1' href='#'>
            <img src={Blibli} className='h-9 md:h-20' />
            <div className='text-xs md:text-lg'>Blibli</div>
          </a>
          <a className='flex flex-col items-center justify-between gap-1' href='#'>
            <img src={Lazada} className='h-9 md:h-20' />
            <div className='text-xs md:text-lg'>Lazada</div>
          </a>
          <a className='flex flex-col items-center justify-between gap-1' href='#'>
            <img src={Tokopedia} className='h-9 md:h-20' />
            <div className='text-xs md:text-lg'>Tokopedia</div>
          </a>
        </div>
        <Button className='mx-auto font-bold' onClick={() => console.log('hehe')}>Beli Sekarang</Button>
      </div>
    </div>
  )
}

export default Beranda;