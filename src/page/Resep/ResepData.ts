import IceLatteHazelnut from '../../assets/Image/IceLatteHazelnut.svg';
import SodaOrangeBlackcurrant from '../../assets/Image/SodaOrangeBlackcurrant.svg';
import HotLatteHazelnut from '../../assets/Image/HotLatteHazelnut.svg';
import IceBlackcurrantTea from '../../assets/Image/IceBlackcurrantTea.svg';

export type TRecipeStep = {
  title: string,
  content: string,
  image: string
}

export type TRecipe = {
  id: number,
  name: string,
  time: string,
  slogan: string,
  image: string,
  ingredients: string[],
  steps: TRecipeStep[]
}

export const resepData: TRecipe[] = [
  {
    id: 1,
    name: 'Ice Latte Hazelnut',
    time: '4 Mins',
    slogan: 'Dingin Menyegarkan',
    image: IceLatteHazelnut,
    ingredients: [],
    steps: []

  },
  {
    id: 2,
    name: 'Soda Orange Blackcurrant',
    time: '4 Mins',
    slogan: 'Dingin Menyegarkan',
    image: SodaOrangeBlackcurrant,
    ingredients: [
      '➤ 1 Cup Ice',
      '➤ 150 ml Soda (Soda / 7up / Sprite)',
      '➤ 20 ml Gokka Sirup Orange',
      '➤ 20 ml Gokka Sirup Blackcurant'
    ],
    steps: []
  },
  {
    id: 3,
    name: 'Hot Latte Hazelnut',
    time: '4 Mins',
    slogan: 'Hangat Nyaman',
    image: HotLatteHazelnut,
    ingredients: [],
    steps: []
  },
  {
    id: 4,
    name: 'Ice Blackcurrant Tea',
    time: '4 Mins',
    slogan: 'Dingin Menyegarkan',
    image: IceBlackcurrantTea,
    ingredients: [],
    steps: []
  },
]