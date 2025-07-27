import './ProdukBeranda.scss';
import Shop from '../../assets/Logo/Shop.svg';
import KatalogBackground from '../../assets/Image/ProdukKatalog/KatalogBackground.jpg';

type TProdukBeranda = {
  image: string,
  name: string,
  color: string,
  onClick?: (event: React.MouseEvent) => void
}

const ProdukBeranda = ({
  image,
  name,
  color,
  onClick
}: TProdukBeranda) => {

  return (
    <div 
      className='relative produk-beranda w-fit pt-5 rounded-2xl'
      onClick={onClick} 
      style={{ backgroundColor: color}}
      // style={{ background: `linear-gradient(to top, ${color}, ${color}B3, ${color}99` }}
    >
      <div className='text-center produk-beranda-title relative z-3'>
        <div className='font-bold text-4xl'>{name}</div>
        <div className='font-semibold text-xl'>+Nyegerin</div>
      </div>
      <img src={image} className='mx-auto w-96 relative z-2' />
      <img className='absolute w-full h-full z-1 top-0 rounded-2xl pattern' src={KatalogBackground} />
      <a href='https://linktr.ee/gokkaindonesia' target='__blank' className='flex flex-col absolute justify-center bottom-8 right-4 w-20 h-20 items-center rounded-full z-2 produk-beranda-beli'>
        <img className='w-8 mx-auto' src={Shop} />
        <div className='font-semibold text-sm text-white'>Beli</div>
      </a>
    </div>
  )
}

export default ProdukBeranda;