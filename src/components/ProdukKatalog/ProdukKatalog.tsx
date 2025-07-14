import './ProdukKatalog.scss';
import Info from '../../assets/Logo/Info.svg';

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
    <div className='relative produk-katalog w-72 rounded-2xl' onClick={onClick} style={{ background: `linear-gradient(to top, ${color}, ${color}B3, ${color}99` }}>
      <img src={image} className='mx-auto w-52' />
      <img className='absolute w-6 h-6 top-4 right-4' src={Info} />
      <div className='absolute z-5 w-full h-fit bottom-0'>
        <div className='absolute produk-katalog-text-bg z-5 w-full h-full bottom-0 opacity-80 rounded-b-2xl'></div>
        <div className='relative flex font-semibold gradient-gold gradient-gold-line z-6'>RASA</div>
        <div className='p-5 pt-3 font-bold text-2xl text-white z-6 relative'>{name}</div>
      </div>
    </div>
  )
}

export default ProdukKatalog;