import './Resep.scss';

// import image
import WingRight from '../../assets/Image/WingRight.svg';

// import logo 
import Jam from '../../assets/Logo/Jam.svg';
import { Button } from '../../ui-kit';

// import data
import { resepData } from './ResepData';
import { useNavigate } from 'react-router';

const Resep = () => {
  const navigate = useNavigate();

	return (
		<div className='resep'>
      <div className='text-center font-light text-white'>Resep Kami</div>
      <div className='gradient-gold w-fit mx-auto font-bold text-4xl py-2'>Varian Resep</div>
      <div className='text-center text-white pb-4'>Berikut adalah resep-resep minuman yang bisa kamu buat dengan Gokka.</div>
      {resepData.map((item, index) => (
        <div className='resep-item flex flex-col py-10' key={index}>
          <div className='flex gradient-gold gradient-gold-line font-bold text-xl pb-8'>{item.name}</div>
          <div className='resep-item-circle flex justify-center items-center mx-auto'>
            <img src={WingRight} className='resep-item-wing-left' />
            <img src={WingRight} className='resep-item-wing-right' />
            <img src={item.image} />
          </div>
          <div className='text-white text-center pt-4 pb-2 text-xs md:text-base'>{item.slogan}</div>
          <div className='flex justify-center gap-2 text-xs md:text-base items-center'>
            <img src={Jam} />
            <div className='text-white'>{item.time}</div>
          </div>
          <Button className='font-bold mx-auto w-fit mt-4 m' onClick={() => navigate(`/resep/${item.id}`)}>Pelajari</Button>
        </div>
      ))}
		</div>
	)
}

export default Resep;