// import recipe image
import IceLatteHazelnut from '../../assets/Image/IceLatteHazelnut.svg';
import SodaOrangeBlackcurrant from '../../assets/Image/SodaOrangeBlackcurrant.svg';
import HotLatteHazelnut from '../../assets/Image/HotLatteHazelnut.svg';
import IceBlackcurrantTea from '../../assets/Image/IceBlackcurrantTea.svg';

// import video
// Ice Latte Hazelnut
import IceLatteHazulnutStepOne from '../../assets/Video/IceLatteHazelnut/1.mp4';
import IceLatteHazulnutStepTwo from '../../assets/Video/IceLatteHazelnut/2.mp4';
import IceLatteHazulnutStepThree from '../../assets/Video/IceLatteHazelnut/3.mp4';
import IceLatteHazulnutStepFour from '../../assets/Video/IceLatteHazelnut/4.mp4';

// Hot Latte Hazelnut
import HotLatteHazelnutStepOne from '../../assets/Video/HotLatteHazelnut/1.mp4';
import HotLatteHazelnutStepTwo from '../../assets/Video/HotLatteHazelnut/2.mp4';
import HotLatteHazelnutStepThree from '../../assets/Video/HotLatteHazelnut/3.mp4';
import HotLatteHazelnutStepFour from '../../assets/Video/HotLatteHazelnut/4.mp4';

// Soda Orange Blackcurrant
import SodaOrangeBlackcurrantStepOne from '../../assets/Video/SodaOrangeBlackcurrant/1.mp4';
import SodaOrangeBlackcurrantStepTwo from '../../assets/Video/SodaOrangeBlackcurrant/2.mp4';
import SodaOrangeBlackcurrantStepThree from '../../assets/Video/SodaOrangeBlackcurrant/3.mp4';
import SodaOrangeBlackcurrantStepFour from '../../assets/Video/SodaOrangeBlackcurrant/4.mp4';

// Ice Tea Blackcurrant
import IceTeaBlackcurrantStepOne from '../../assets/Video/IceTeaBlackcurrant/1.mp4';
import IceTeaBlackcurrantStepTwo from '../../assets/Video/IceTeaBlackcurrant/2.mp4';
import IceTeaBlackcurrantStepThree from '../../assets/Video/IceTeaBlackcurrant/3.mp4';
import IceTeaBlackcurrantStepFour from '../../assets/Video/IceTeaBlackcurrant/4.mp4';

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
    ingredients: [
      '➤ 1 Cup Ice',
      '➤ 2 Shot Espreso',
      '➤ 30 ml Gokka Sirup Hazelnut',
      '➤ 150ml Steamed Milk'
    ],
    steps: [
      {
        title: 'Siapkan gelas dan es kosong',
        content: 'Kami rekomendasikan agar menggunakan gelas transapran agar secara visual terlihat estetik.',
        image: IceLatteHazulnutStepOne
      },
      {
        title: 'Tambahkan susu 150ml',
        content: 'Untuk susu kami rekomendasikan susu UHT atau full cream untuk rasa yang maksimal.',
        image: IceLatteHazulnutStepTwo
      },
      {
        title: 'Tambahkan dua shot espreso',
        content: 'Kamu bebas memilih merek kopi kesukaan anda.',
        image: IceLatteHazulnutStepThree
      },
      {
        title: 'Tambahkan 30ml Sirup Gokka dan siap dinikmati',
        content: 'Kami rekomendasikan sirup Gokka rasa hazelnut.',
        image: IceLatteHazulnutStepFour
      },
    ]
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
    steps: [
      {
        title: 'Siapkan gelas dan es kosong',
        content: 'Kami rekomendasikan agar menggunakan gelas transparan agar secara visual terlihat estetik.',
        image: SodaOrangeBlackcurrantStepOne
      },
      {
        title: 'Tambahkan 150ml air soda',
        content: 'Kami rekomendasi soda, dengan merk Soda, 7up, dan Sprite.',
        image: SodaOrangeBlackcurrantStepTwo
      },
      {
        title: 'Tambahkan 20ml sirup Gokka Orange',
        content: 'Kami rekomendasi sirup Gokka rasa orange.',
        image: SodaOrangeBlackcurrantStepThree
      },
      {
        title: 'Tambahkan 20ml sirup Gokka dan siap dinikmati',
        content: 'Kami rekomendasi sirup Gokka rasa blackcurrant.',
        image: SodaOrangeBlackcurrantStepFour
      },
    ]
  },
  {
    id: 3,
    name: 'Hot Latte Hazelnut',
    time: '4 Mins',
    slogan: 'Hangat Nyaman',
    image: HotLatteHazelnut,
    ingredients: [
      '➤ 2 Shot Espreso',
      '➤ 150 ml Steamed Milk',
      '➤ 30 ml Gokka Sirup Hazelnut',
    ],
    steps: [
      {
        title: 'Tambahkan dua shot espreso',
        content: 'Kamu bebas memilih merek kopi kesukaan anda.',
        image: HotLatteHazelnutStepOne
      },
      {
        title: 'Tambahkan 30ml Sirup Gokka',
        content: 'Kami rekomendasikan sirup Gokka rasa hazelnut.',
        image: HotLatteHazelnutStepTwo
      },
      {
        title: 'Aduk hingga tercampur merata',
        content: 'Kami rekomendasikan aduk dengan sendok.',
        image: HotLatteHazelnutStepThree
      },
      {
        title: 'Tambahkan susu 150ml dan siap dinikmati',
        content: 'Gunakan susu UHT atau full cream untuk rasa yang maksimal.',
        image: HotLatteHazelnutStepFour
      },
    ]
  },
  {
    id: 4,
    name: 'Ice Tea Blackcurrant',
    time: '4 Mins',
    slogan: 'Dingin Menyegarkan',
    image: IceBlackcurrantTea,
    ingredients: [
      '➤ 1 Cup Ice',
      '➤ 150 ml Tea',
      '➤ 30 ml Gokka Sirup Blackcurant'
    ],
    steps: [
      {
        title: 'Siapkan gelas dan es kosong',
        content: 'Kami rekomendasikan agar menggunakan gelas transparan agar secara visual terlihat estetik.',
        image: IceTeaBlackcurrantStepOne
      },
      {
        title: 'Tuangkan 150 ml teh',
        content: 'Hati hati',
        image: IceTeaBlackcurrantStepTwo
      },
      {
        title: 'Tambahkan 30ml Sirup Gokka',
        content: 'Kami rekomendasikan sirup Gokka Blackcurrant, Strawberry, dan Orange.',
        image: IceTeaBlackcurrantStepThree
      },
      {
        title: 'Aduk atau bisa langsung anda nikmati!',
        content: 'Nikmati kesegaran rasa produk kami. Ayo tunggu apa lagi, cobain sekarang!',
        image: IceTeaBlackcurrantStepFour
      },
    ]
  },
]