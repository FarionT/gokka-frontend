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
    <div className="resep-detail p-8">
      <div className="text-white text-center text-xs md:text-base pb-2">Resep Kami</div>
      <div className="gradient-gold w-fit mx-auto font-bold text-4xl pb-16">{recipe.name}</div>
      <div className='resep-detail-item flex flex-col py-10'>
        <div className='resep-detail-item-circle flex justify-center items-center mx-auto'>
          <img src={WingRight} className='resep-detail-item-wing-left w-72' />
          <img src={WingRight} className='resep-detail-item-wing-right w-72' />
          <img src={recipe.image ? recipe.image : Jam} className="w-64" />
        </div>
      </div>
      <div className="text-white">
        <div>Bahan:</div>
        {recipe.ingredients.map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </div>
    </div>
  )
}

export default ResepDetail;