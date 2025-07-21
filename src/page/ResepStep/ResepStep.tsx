// import react
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

// import data
import { resepData, type TRecipe } from "../Resep/ResepData";

import './ResepStep.scss';
import { Button } from "../../ui-kit";

const ResepStep = () => {
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
  });

  useEffect(() => {
    const isIdExists = resepData.find(item => item.id === Number(params.id));
    if (isIdExists) {
      setRecipe(isIdExists);
    } else {
      navigate(-1);
    }
  }, []);

  return (
    <div className="resep-step p-8">
      <div>hehe</div>
      {recipe.steps.map((item, index) => (
        <div key={index} className="resep-step-item grid md:grid-cols-2">
          <video width={300}>
            <source src={item.image} />
          </video>
          <div className="p-8">
            <div className="flex gradient-gold gradient-gold-line font-semibold pb-8">Step {index + 1}</div>
            <div className="text-white font-bold text-4xl pb-4">{item.title}</div>
            <div className="text-white pb-8">{item.content}</div>
            <Button className="font-bold w-fit">Beli Produk</Button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ResepStep;