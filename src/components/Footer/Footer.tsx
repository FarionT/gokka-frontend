import './Footer.scss';

// Import Images
import Tiktok from '../../assets/Logo/Tiktok.svg';
import Instagram from '../../assets/Logo/Instagram.svg';
import Shopee from '../../assets/Logo/Shopee.svg';
import Blibli from '../../assets/Logo/Blibli.svg';
import Lazada from '../../assets/Logo/Lazada.svg';
import Tokopedia from '../../assets/Logo/Tokopedia.svg';
import Gokka from '../../assets/Logo/Gokka.svg';
import Whatsapp from '../../assets/Logo/Whatsapp.svg';
import Email from '../../assets/Logo/Email.svg';

const Footer = () => {
  return (
    <div className='footer text-sm xl:text-base relative bottom-0'>
      <div className="py-10 md:py-12 max-w-[1200px] mx-6 xl:mx-auto">
        <img src={Gokka} />
        <div className='flex flex-col md:flex-row md:gap-11 justify-between'>
          <div className="max-w-lg">
            <div className='pt-6'>Gokka adalah brand sirup dari PT. GTK International Indonesia, didirikan pada 2021 oleh Inawati. Berbasis di Tangerang, Gokka menawarkan 54 varian sirup dan 43 varian bubuk, dipasarkan khusus untuk anak muda di Pulau Jawa melalui e-commerce seperti Shopee, Tokopedia, Blibli, dan Lazada.</div>
            <div>
              <div className='font-semibold pt-6'>Alamat</div>
              <div>Jl. Merapi No.2 Blok E, Poris Gaga, Kec. Batuceper, Kota Tangerang, Banten 15122</div>
            </div>
            <div>
              <div className='font-semibold pt-6 pb-3'>No. Kontak/Email</div>
              <div className='flex flex-col gap-5'>
                <div className='flex items-center gap-4'>
                  <img src={Whatsapp} className='w-9' />
                  <div>0877-7522-3936</div>
                </div>
                <div className='flex items-center gap-4'>
                  <img src={Email} className='w-9' />
                  <div>gokkaindonesia@gmail.com</div>
                </div>
              </div>
            </div>
          </div>
          <div className="text-xs pt-6">
            <div className="flex flex-col gap-6">
              <div className='flex items-center place-content-center md:place-content-end gap-7'>
                <a className='flex flex-col items-center justify-between gap-1' href='#'>
                  <img src={Tiktok} className='h-9' />
                  <div>Tiktok</div>
                </a>
                <a className='flex flex-col items-center justify-between gap-1' href='#'>
                  <img src={Instagram} className='h-9' />
                  <div>Instagram</div>
                </a>
              </div>
              <div className='flex items-center justify-center gap-7'>
                <a className='flex flex-col items-center justify-between gap-1' href='#'>
                  <img src={Shopee} className='h-9' />
                  <div>Shopee</div>
                </a>
                <a className='flex flex-col items-center justify-between gap-1' href='#'>
                  <img src={Blibli} className='h-9' />
                  <div>Blibli</div>
                </a>
                <a className='flex flex-col items-center justify-between gap-1' href='#'>
                  <img src={Lazada} className='h-9' />
                  <div>Lazada</div>
                </a>
                <a className='flex flex-col items-center justify-between gap-1' href='#'>
                  <img src={Tokopedia} className='h-9' />
                  <div>Tokopedia</div>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="flex underline place-content-center gap-6 md:gap-14 pt-6 md:place-content-end">
            <a>Beranda</a>
            <a>Tentang Kami</a>
            <a>Produk</a>
            <a>FAQ</a>
        </div>
        <div className='flex place-content-center md:place-content-start pt-6 font-[275]'>Michael Febryanto Lie. 2025 - Site by Cingarts</div>
      </div>
    </div>
  )
}

export default Footer;