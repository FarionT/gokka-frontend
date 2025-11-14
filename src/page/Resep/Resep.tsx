import './Resep.scss';

// import image
import WingRight from '../../assets/Image/WingRight.svg';

// import logo 
import Jam from '../../assets/Logo/Jam.svg';
import { Button } from '../../ui-kit';

// import data
import { useEffect, useState } from 'react';
import { useLoader } from '../../utils/userLoader';
import { useErrorHandler } from '../../utils/getAuth';
import { getAllRecipes } from '../../services/recipe.services';
import { useNavigate } from 'react-router';

const Resep = () => {
  const navigate = useNavigate();
  const { showLoader, hideLoader } = useLoader();
  const handleErrorResponse = useErrorHandler();
  const [data, setData] = useState<any>([])
  const fetchData = async () => {
    try {
      showLoader();
      const params = {
        pagination: false
      }
      const res = await getAllRecipes(params);
      if (res.status === 200) {
        const datas = res.data.data;
        setData(datas.rows)
      } else handleErrorResponse(res)
    } finally {
      hideLoader();
    }

  }
  useEffect(() => {
    fetchData();
  }, [])

	return (
		<div className='resep py-8'>
      <div className='text-center font-light text-white px-8'>Resep Kami</div>
      <div className='gradient-gold w-fit mx-auto font-bold text-4xl py-2 px-8'>Varian Resep</div>
      <div className='text-center text-white pb-4 px-8'>Berikut adalah resep-resep minuman yang bisa kamu buat dengan Gokka.</div>
      {data.length > 0 ? data.map((item: any) => (
        <div className='resep-item flex flex-col py-10 overflow-hidden' key={item.id}>
          <div className='flex gradient-gold gradient-gold-line font-bold text-xl pb-8  px-8'>{item.name}</div>
          <div className='resep-item-circle flex justify-center items-center mx-auto'>
            <img src={WingRight} className='resep-item-wing-left' />
            <img src={WingRight} className='resep-item-wing-right' />
            <img src={item.path} />
          </div>
          <div className='text-white text-center pt-4 pb-2 text-xs md:text-base'>{item.description}</div>
          <div className='flex justify-center gap-2 text-xs md:text-base items-center'>
            <img src={Jam} />
            <div className='text-white'>{item.time}</div>
          </div>
          <Button className='font-bold mx-auto w-fit mt-4 m' onClick={() => navigate(`/resep/${item.id}`)}>Pelajari</Button>
        </div>
      )) : <div className='text-white flex justify-center my-10'>Belum ada resep</div>}
		</div>
	)
}

export default Resep;