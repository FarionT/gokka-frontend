import { Komentar } from '../../components';
import './Testimoni.scss';

// import data
import { testimoniData } from './TestimoniData';

// import logo
import Bintang from '../../assets/Logo/Bintang.svg';
// import { Button } from '../../ui-kit';

const Testimoni = () => {
  return (
    <div className='testimoni py-8 px-8 xl:px-0'>
      <div className='gradient-gold text-center text-4xl md:text-7xl font-bold'>Review Produk</div>
      <div className='flex items-center justify-center gap-4 pt-4'>
        <div className='text-white text-2xl md:text-4xl font-bold'>4.8 dari 5</div>
        <div className='flex items-center justify-center'>
          <img src={Bintang} className='w-6 md:w-10' />
          <img src={Bintang} className='w-6 md:w-10' />
          <img src={Bintang} className='w-6 md:w-10' />
          <img src={Bintang} className='w-6 md:w-10' />
          <img src={Bintang} className='w-6 md:w-10' />
        </div>
      </div>
      <div className='text-white text-center text-xs md:text-base'>Berdasarkan hasil dari 500 review</div>
      {/* <Button className='font-bold w-fit flex mx-auto my-4'>Tulis Komentar</Button> */}
      <div className='flex text-center gradient-gold gradient-gold-line font-bold py-4 md:text-2xl'>Komentar Terbaru</div>
      {testimoniData.map((data, index) => (
        <Komentar 
          key={index}
          name={data.name} 
          time={data.time} 
          product={data.product} 
          comment={data.comment}        
        />
      ))}
    </div>
  )
}

export default Testimoni;