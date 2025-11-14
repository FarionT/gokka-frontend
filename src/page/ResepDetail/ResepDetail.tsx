// import react
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import './ResepDetail.scss';

// import image 
import WingRight from '../../assets/Image/WingRight.svg';

// import logo 
import Jam from '../../assets/Logo/Jam.svg';
import { Button } from "../../ui-kit";
import { useLoader } from "../../utils/userLoader";
import { useErrorHandler } from "../../utils/getAuth";
import { getRecipeDetailById } from "../../services/recipe.services";


const ResepDetail = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { showLoader, hideLoader } = useLoader();
  const handleErrorResponse = useErrorHandler();
  const [data, setData] = useState<any>({
    name: '',
    path: '',
    recipe_ingredients: []
  })

  const fetchData = async() => {
    if (!params.id) return
    try {
      showLoader()
      const res = await getRecipeDetailById(params.id);
      if (res.status === 200) {
        const datas = res.data.data;
        setData(datas)
      } else if (res.status === 404) {
        navigate(-1)
      } else handleErrorResponse(res)
    } finally {
      hideLoader()
    }
  }
  useEffect(() => {
    if (params.id) {
      fetchData()
    }
  }, [params.id]);

  return (
    <div className="resep-detail">
      <div className="text-white text-center text-sm md:text-base pb-2 pt-8">Resep Kami</div>
      <div className="gradient-gold mx-auto font-bold text-4xl pb-16 text-center text-nowrap">{data ? data.name : ''}</div>
      <div className='resep-detail-item flex flex-col py-10 overflow-hidden'>
        <div className='resep-detail-item-circle flex justify-center items-center mx-auto'>
          <img src={WingRight} className='resep-detail-item-wing-left w-72' />
          <img src={WingRight} className='resep-detail-item-wing-right w-72' />
          <img src={data.path ? data.path : Jam} className="w-64" />
        </div>
      </div>
      <div className="text-white flex flex-col gap-4 pt-12 pb-8">
        <div className="text-center font-bold text-3xl pb-2">Bahan yang kamu butuhkan:</div>
        <div className="text-sm mx-auto">
          {data.recipe_ingredients.map((item: any) => (
            <div key={item.id}>{item.name}</div>
          ))}
        </div>
      </div>
      <div className="flex py-8">
        <Button className="font-bold w-fit mx-auto" onClick={() => navigate(`/resep/${params.id}/step`)}>Lihat Resep</Button>
      </div>
    </div>
  )
}

export default ResepDetail;