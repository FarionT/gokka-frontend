import './Beranda.scss';

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

// Importing ui kit
import { Button } from '../../ui-kit';

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

  return (
    <div className="beranda">
      <div className='beranda-tentang max-w-[1600px] mx-auto px-16'>
        <div className='w-fit flex text-xl font-semibold gradient-gold gradient-gold-line'>TENTANG KAMI</div>
        <div className="flex flex-col items-center text-center text-3xl md:text-5xl/15 py-15">
          <span className='font-bold'>Kita, Lebih dari Sekadar Sirup</span>
        </div>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-16 text-white'>
          <img src={BrandOwner} className='w-full rounded-3xl grayscale'/>
          <div className='flex flex-col gap-16'>
            <div className='flex justify-between'>
              {tentangLogo.map((item, index) => (
                <div className='flex flex-col items-center text-center' key={index}>
                  <img src={item.src} className='h-20 xl:h-28 2xl:h-32' />
                  <div>{item.caption}</div>
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
      </div>
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