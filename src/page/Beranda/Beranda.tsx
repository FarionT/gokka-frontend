import './Beranda.scss';

// Importing Images
import Shopee from '../../assets/Logo/Shopee.svg';
import Blibli from '../../assets/Logo/Blibli.svg';
import Lazada from '../../assets/Logo/Lazada.svg';
import Tokopedia from '../../assets/Logo/Tokopedia.svg';
import { Button } from '../../ui-kit';

const Beranda = () => {
  return (
    <div className="beranda">
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
        <Button className='mx-auto font-bold'>Beli Sekarang</Button>
      </div>
    </div>
  )
}

export default Beranda;