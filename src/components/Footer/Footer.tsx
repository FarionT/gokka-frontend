import './Footer.scss';

// Import Logo
import Tiktok from '../../assets/Logo/Tiktok.svg';
import Instagram from '../../assets/Logo/Instagram.svg';
import Shopee from '../../assets/Logo/Shopee.svg';
import Blibli from '../../assets/Logo/Blibli.svg';
import Lazada from '../../assets/Logo/Lazada.svg';
import Tokopedia from '../../assets/Logo/Tokopedia.svg';

const Footer = () => {
  return (
    <div className="my-gold-element px-[62px] pt-[48px] pb-[27px]">
      <div className='flex'>
        <image />
        <div className="kiri">
          <div>Gokka adalah brand sirup dari PT. GTK International Indonesia, didirikan pada 2021 oleh Inawati. Berbasis di Tangerang, Gokka menawarkan 54 varian sirup dan 43 varian bubuk, dipasarkan khusus untuk anak muda di Pulau Jawa melalui e-commerce seperti Shopee, Tokopedia, Blibli, dan Lazada.</div>
          <div>
            <div>Alamat</div>
            <div>Jl. Merapi No.2 Blok E, Poris Gaga, Kec. Batuceper, Kota Tangerang, Banten 15122</div>
          </div>
          <div>
            <div>No. Kontak/Email</div>
            <div>
              <div>
                <image />
                <div>0877-7522-3936</div>
              </div>
              <div>
                <image />
                <div>gokkaindonesia@gmail.com</div>
              </div>
            </div>
          </div>
        </div>
        <div className="kanan">
          <div className="logos">
            <div className='logos atas'>
              <div>
                <img src={Tiktok} />
                <div>Tiktok</div>
              </div>
              <div>
                <img src={Instagram} />
                <div>Instagram</div>
              </div>
            </div>
            <div className='logos atas'>
              <div>
                <img src={Shopee} />
                <div>Shopee</div>
              </div>
              <div>
                <img src={Blibli} />
                <div>Blibli</div>
              </div>
              <div>
                <img src={Lazada} />
                <div>Lazada</div>
              </div>
              <div>
                <img src={Tokopedia} />
                <div>Tokopedia</div>
              </div>
            </div>
          </div>
          <div className="menu bar">
              <a></a>
          </div>
        </div>
      </div>
      <div>Michael Febryanto Lie. 2025 - Site by Cingarts</div>
    </div>
  )
}

export default Footer;