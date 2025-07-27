import './Komentar.scss';

// import logo
import Avatar from '../../assets/Logo/Avatar.svg';
import Bintang from '../../assets/Logo/Bintang.svg';
import Info from '../../assets/Logo/Info.svg';

type TKomentar = {
  name: string;
  time: string | Date;
  product: string;
  comment: string;
  rating?: number;
  onClick?: () => void;
}

const Komentar = ({
  name,
  time,
  product,
  comment,
  rating,
  onClick
}: TKomentar) => {
  const commentTime = time ? new Date(time) : new Date();
  const commentDate = String(commentTime.getDate()).padStart(2, '0');
  const commentMonth = String(commentTime.getMonth() + 1).padStart(2, '0');
  const commentYear = commentTime.getFullYear();
  const commentHour = commentTime.getHours();
  const commentMinute = commentTime.getMinutes();
  const rate = rating;

  const finalTime = `${commentDate}/${commentMonth}/${commentYear} | ${commentHour}:${commentMinute}`

  return (
    <div className="komentar flex justify-between gap-6 text-xs md:text-base">
      <div className='flex gap-3 md:gap-6'>
        <div className='flex flex-col items-center gap-1'>
          <img src={Avatar} />
          <div className='komentar-profile-name'>{name.split(' ')[0]}</div>
        </div>
        <div>
          <div className='komentar-content-time'>{finalTime}</div>
          <div className='flex py-2 gap-0.5'>
            <img src={Bintang} className='w-3 md:w-4' />
            <img src={Bintang} className='w-3 md:w-4' />
            <img src={Bintang} className='w-3 md:w-4' />
            <img src={Bintang} className='w-3 md:w-4' />
            <img src={Bintang} className='w-3 md:w-4' />
          </div>
          <div className='text-white font-medium'>{product}</div>
          <div className='text-white'>{comment}</div>
        </div>
      </div>
      <div className='flex flex-col justify-center items-center gap-1 right-0' onClick={onClick}>
        <img src={Info} className='opacity-40 w-12' />
        <div className='text-center komentar-info-text'>Info lebih</div>
      </div>
    </div>
  )
}

export default Komentar;