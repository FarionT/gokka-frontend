// import react
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import './ResepDetail.scss';

// import data
import { resepData, type TRecipe } from "../Resep/ResepData";

// import image 
import WingRight from '../../assets/Image/WingRight.svg';

// import logo 
import Jam from '../../assets/Logo/Jam.svg';
import { Button } from "../../ui-kit";


const ResepDetail = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState<TRecipe>({
    id: 0,
    name: '',
    image: '',
    slogan: '',
    time: '',
    ingredients: [],
    steps: []
  })
  useEffect(() => {
    const isIdExists = resepData.find(item => item.id === Number(params.id));
    if (isIdExists) {
      setRecipe(isIdExists);
    } else {
      navigate(-1);
    }
  }, []);

  return (
    <div className="resep-detail">
      <div className="text-white text-center text-sm md:text-base pb-2 pt-8">Resep Kami</div>
      <div className="gradient-gold mx-auto font-bold text-4xl pb-16 text-center text-nowrap">{recipe.name}</div>
      <div className='resep-detail-item flex flex-col py-10 overflow-hidden'>
        <div className='resep-detail-item-circle flex justify-center items-center mx-auto'>
          <img src={WingRight} className='resep-detail-item-wing-left w-72' />
          <img src={WingRight} className='resep-detail-item-wing-right w-72' />
          <img src={recipe.image ? recipe.image : Jam} className="w-64" />
        </div>
      </div>
      <div className="text-white flex flex-col gap-4 pt-12 pb-8">
        <div className="text-center font-bold text-3xl pb-2">Bahan yang kamu butuhkan:</div>
        <div className="text-sm mx-auto">
          {recipe.ingredients.map((item, index) => (
            <div key={index}>{item}</div>
          ))}
        </div>
      </div>
      <a className="flex py-8" href={`/resep/${params.id}/step`}>
        <Button className="font-bold w-fit mx-auto">Lihat Resep</Button>
      </a>
    </div>
  )
}

export default ResepDetail;