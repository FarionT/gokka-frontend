import { Komentar } from '../../components';
import './Testimoni.scss';

// import logo
// import Bintang from '../../assets/Logo/Bintang.svg';
import { useLoader } from '../../utils/userLoader';
import { useEffect, useState } from 'react';
import { getAllTestimonials } from '../../services/testimonial.services';
import { useErrorHandler } from '../../utils/getAuth';
// import { Button } from '../../ui-kit';

const Testimoni = () => {
  const { showLoader, hideLoader } = useLoader();
  const [data, setData] = useState<any>([]);
  const [totalReview, setTotalReview] = useState(0);
  const [averageReview, setAverageReview] = useState('');
  const handleErrorResponse = useErrorHandler();
  const fetchData = async() => {
    try {
      showLoader()
      const params = {
        pagination: true,
        page: 1,
        row: 10,
        sort_by: 'created_at',
        sort_type: 'DESC'
      }
      const res = await getAllTestimonials(params);
      if (res.status === 200) {
        const datas = res.data.data;
        setTotalReview(datas.total_review)
        setAverageReview(datas.average_review);
        const merged = [...data, ...datas.rows]
        setData(merged)
      } else handleErrorResponse(res)
    } finally {
      hideLoader();
    }
  }

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <div className='testimoni py-8 px-8 xl:px-0'>
      <div className='gradient-gold text-center text-4xl md:text-7xl font-bold'>Review Produk</div>
      <div className='flex items-center justify-center gap-4 pt-4'>
        <div className='text-white text-2xl md:text-4xl font-bold'>{averageReview} dari 5.00</div>
        {/* <div className='flex items-center justify-center'>
          <img src={Bintang} className='w-6 md:w-10' />
          <img src={Bintang} className='w-6 md:w-10' />
          <img src={Bintang} className='w-6 md:w-10' />
          <img src={Bintang} className='w-6 md:w-10' />
          <img src={Bintang} className='w-6 md:w-10' />
        </div> */}
      </div>
      <div className='text-white text-center text-xs md:text-base'>Berdasarkan hasil dari {totalReview ?? 0} review</div>
      {/* <Button className='font-bold w-fit flex mx-auto my-4'>Tulis Komentar</Button> */}
      <div className='flex text-center gradient-gold gradient-gold-line font-bold py-4 md:text-2xl'>Komentar Terbaru</div>
      {data.length > 0 ? data.map((data: any) => (
        <Komentar 
          key={data.id}
          name={data.name} 
          time={data.time} 
          product={data.item_name} 
          comment={data.comment}    
          rating={data.star}    
        />
      )) : <div className='text-white text-md flex justify-center'>No data</div>}
    </div>
  )
}

export default Testimoni;