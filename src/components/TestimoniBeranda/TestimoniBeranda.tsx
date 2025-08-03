import './TestimoniBeranda.scss';

// import logo
import Bintang from '../../assets/Logo/Bintang.svg';

type TTestimoniBeranda = {
  product: string;
  review: string;
  image: string;
  user: string;
  star?: number
}

const TestimoniBeranda = ({
  product,
  review,
  image,
  user,
  star
}: TTestimoniBeranda) => {
  return (
    <div className='testimoni-beranda rounded-2xl h-full'>
      <div className="relative aspect-square rounded-t-2xl">
        <img src={image} className="h-full w-full object-cover object-[0%_65%] rounded-t-2xl" />
        <div className='bg-[#332D1E] opacity-60 z-1 h-full w-full absolute top-0'></div>
        <div className='flex py-2 gap-1 absolute justify-center w-full bottom-2 z-2'>
          <img src={Bintang} className='w-8 md:w-10' />
          <img src={Bintang} className='w-8 md:w-10' />
          <img src={Bintang} className='w-8 md:w-10' />
          <img src={Bintang} className='w-8 md:w-10' />
          <img src={Bintang} className='w-8 md:w-10' />
        </div>
      </div>
      <div className='testimoni-beranda-text text-center p-6 rounded-b-2xl'>
        <div className='font-bold'>Produk: {product}</div>
        <div className='font-normal' >{user}</div>
        <div className='font-normal'>"{review}"</div>
      </div>
      {star ? <></> : <></>}
      {/* <img src={Bintang} /> */}
    </div>
  )
}

export default TestimoniBeranda;