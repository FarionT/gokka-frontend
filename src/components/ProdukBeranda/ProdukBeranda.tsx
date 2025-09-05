import './ProdukBeranda.scss';
import Shop from '../../assets/Logo/Shop.svg';
import Medal from '../../assets/Image/Medal.svg';
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
      <div className='absolute z-5 flex bg-[#332d1e] p-2 rounded-2xl bottom-8 left-5 gap-1 xs:gap-2'>
        <div className='relative -ml-5 -mt-5 h-fit flex justify-center'>
          <img className='w-14 xs:w-16' src={Medal} />
          <div className='absolute top-4.5 xs:top-5 font-semibold'>20%</div>
        </div>
        <div className=''>
          <div className='text-white text-sm xs:text-lg'>Great deals</div>
          <div className='line-through decoration-red-800 decoration-2 text-[#73726e] font-semibold text-[10px]'>Rp. 44.000,00</div>
          <div className='font-semibold text-xs xs:text-sm'>Rp. 35.200,00</div>
        </div>
      </div>
      <img src={image} className='mx-auto w-96 relative z-2' />
      <img className='absolute w-full h-full z-1 top-0 rounded-2xl pattern' src={KatalogBackground} />
      <a href='https://linktr.ee/gokkaindonesia' target='__blank' className='flex flex-col absolute justify-center bottom-8 right-4 w-16 h-16 xs:w-20 xs:h-20 items-center rounded-full z-2 produk-beranda-beli'>
        <img className='w-7 xs:w-8 mx-auto' src={Shop} />
        <div className='font-semibold text-xs xs:text-sm text-white pt-0.5'>Beli</div>
      </a>
    </div>
  )
}

export default ProdukBeranda;