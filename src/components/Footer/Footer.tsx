import './Footer.scss';

// Import Images
import Tiktok from '../../assets/Logo/Tiktok.svg';
import Instagram from '../../assets/Logo/Instagram.svg';
import Shopee from '../../assets/Logo/Shopee.svg';
import Blibli from '../../assets/Logo/Blibli.svg';
import Lazada from '../../assets/Logo/Lazada.svg';
import Tokopedia from '../../assets/Logo/Tokopedia.svg';
import Gokka from '../../assets/Logo/Gokka.png';
import Whatsapp from '../../assets/Logo/Whatsapp.svg';
import Email from '../../assets/Logo/Email.svg';
import { useLoader } from '../../utils/userLoader';
import { useErrorHandler } from '../../utils/getAuth';
import { useEffect, useState } from 'react';
import { getCompanyData } from '../../services/company.services';

const Footer = () => {
  const { showLoader, hideLoader } = useLoader();
  const handleErrorResponse = useErrorHandler();
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const fetchData = async () => {
    try {
      showLoader();
      const res = await getCompanyData()
      if (res.status === 200) {
        const data = res.data.data;
        setAddress(data.address);
        setPhoneNumber(data.phone_number);
        setEmail(data.email);
        setDescription(data.description);
      } else handleErrorResponse(res)
    } finally {
      hideLoader()
    }
  }

  useEffect(() => {
    fetchData();
  }, []);
    
  return (
    <div className='footer text-sm xl:text-base relative bottom-0'>
      <div className="py-10 md:py-12 max-w-[1200px] mx-6 xl:mx-auto">
        <img src={Gokka} className='w-32 md:w-48' />
        <div className='flex flex-col md:flex-row md:gap-11 justify-between'>
          <div className="max-w-lg">
            <div className='pt-6'>{description}</div>
            <div>
              <div className='font-semibold pt-6'>Alamat</div>
              <div>{address}</div>
            </div>
            <div>
              <div className='font-semibold pt-6 pb-3'>No. Kontak/Email</div>
              <div className='flex flex-col gap-5'>
                <div className='flex items-center gap-4'>
                  <img src={Whatsapp} className='w-9' />
                  <div>{phoneNumber}</div>
                </div>
                <div className='flex items-center gap-4'>
                  <img src={Email} className='w-9' />
                  <div>{email}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="text-xs pt-6">
            <div className="flex flex-col gap-6">
              <div className='flex items-center place-content-center md:place-content-end gap-7'>
                <a className='flex flex-col items-center justify-between gap-1' href="https://linktr.ee/gokkaindonesia" target='__blank'>
                  <img src={Tiktok} className='h-9' />
                  <div>Tiktok</div>
                </a>
                <a className='flex flex-col items-center justify-between gap-1' href="https://linktr.ee/gokkaindonesia" target='__blank'>
                  <img src={Instagram} className='h-9' />
                  <div>Instagram</div>
                </a>
              </div>
              <div className='flex items-center justify-center gap-7'>
                <a className='flex flex-col items-center justify-between gap-1' href="https://linktr.ee/gokkaindonesia" target='__blank'>
                  <img src={Shopee} className='h-9' />
                  <div>Shopee</div>
                </a>
                <a className='flex flex-col items-center justify-between gap-1' href="https://linktr.ee/gokkaindonesia" target='__blank'>
                  <img src={Blibli} className='h-9' />
                  <div>Blibli</div>
                </a>
                <a className='flex flex-col items-center justify-between gap-1' href="https://linktr.ee/gokkaindonesia" target='__blank'>
                  <img src={Lazada} className='h-9' />
                  <div>Lazada</div>
                </a>
                <a className='flex flex-col items-center justify-between gap-1' href="https://linktr.ee/gokkaindonesia" target='__blank'>
                  <img src={Tokopedia} className='h-9' />
                  <div>Tokopedia</div>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="flex underline place-content-center gap-6 md:gap-14 pt-6 md:place-content-end">
            <a href='/'>Beranda</a>
            <a href='/tentang-kami'>Tentang Kami</a>
            <a href='/produk'>Produk</a>
            <a href='/faq'>FAQ</a>
        </div>
        <div className='flex place-content-center md:place-content-start pt-6 font-[275]'>Michael Febryanto Lie. 2025 - Site by Cingarts</div>
      </div>
    </div>
  )
}

export default Footer;