import './ProdukKatalog.scss';
import Info from '../../assets/Logo/Info.svg';
import KatalogBackground from '../../assets/Image/ProdukKatalog/KatalogBackground.jpg';


type TProdukKatalog = {
  image: string,
  name: string,
  color: string,
  onClick?: (event: React.MouseEvent) => void
}

const ProdukKatalog = ({
  image,
  name,
  color,
  onClick
}: TProdukKatalog) => {

  return (
    <div className='relative produk-katalog w-[150px] md:w-[200px] rounded-2xl' onClick={onClick} style={{ background: color }}>
      <img className='absolute w-full h-full z-1 top-0 rounded-2xl pattern' src={KatalogBackground} loading="lazy" />
      <img src={image} className='relative mx-auto w-52 z-2' loading="lazy" />
      <img className='absolute w-6 h-6 top-4 right-4 z-4' src={Info} />
      <div className='absolute z-5 w-full h-fit bottom-0'>
        <div className='absolute produk-katalog-text-bg z-5 w-full h-full bottom-0 opacity-80 rounded-b-2xl'></div>
        <div className='relative flex text-sm md:text-base font-semibold gradient-gold gradient-gold-line z-6'>RASA</div>
        <div className='px-2 md:px-5 py-3 font-bold text-[15px] md:text-lg text-white z-6 relative'>{name}</div>
      </div>
    </div>
  )
}

export default ProdukKatalog;