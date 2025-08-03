import "./TentangKami.scss";

// import logo
import RightNumbering from "../../assets/Logo/RightNumbering.svg";
import NoHalal from "../../assets/Logo/NoHalal.svg";
import NoPIRT from "../../assets/Logo/NoPIRT.svg";

// import image
import Owner from "../../assets/Image/BrandOwner.jpg";
import { Timeline } from "../../components";

// import data
import { filosofiData, timelineData, visiMisiData } from "./TentangKamiData";

const TentangKami = () => {
  return (
    <div className="tentang">
      {/* filosofi  */}
      <div className="p-8">
        <div className="flex gradient-gold gradient-gold-line-left font-semibold">
          Nilai Filosofis
        </div>
        <div className="flex flex-wrap justify-center gap-8 py-8">
          {filosofiData.map((item, index) => (
            <div key={index} className="justify-center items-center max-w-80">
              <img src={item.image} className="mx-auto pb-6" />
              <div className="flex gradient-gold gradient-gold-line-both font-bold">
                {item.title}
              </div>
              <div className="tentang-filosofi-item-content flex items-center gap-6 py-5">
                <div className="w-10 h-10 items-center justify-center flex">
                  <img
                    src={RightNumbering}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="text-white">{item.content}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* sejarah kami  */}
      <div className="p-8">
        <div className="flex gradient-gold gradient-gold-line-left font-semibold py-8 text-2xl">
          Sejarah Kami
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <img src={Owner} className="rounded-4xl mb-8 md:mb-12" />
          <div>
            <div className="gradient-gold font-bold text-2xl md:text-4xl w-fit mx-auto pb-8">
              Berdiri Sejak 2021
            </div>
            <Timeline data={timelineData} />
          </div>
        </div>
      </div>
      {/* fakta singkat */}
      <div className="tentang-fakta p-8 mx-auto w-fit">
        <div className="flex gradient-gold gradient-gold-line-both font-semibold">
          Fakta Singkat
        </div>
        <div className="text-white text-center text-3xl font-bold pt-8 break-words">
          Gokka berasal dari Kata “Go” artinya Maju dan Kata “Ka” artinya Karya.
        </div>
      </div>
      {/* visi misi  */}
      <div className="p-8">
        <div className="flex gradient-gold gradient-gold-line-left font-semibold text-2xl pb-8">Visi-Misi Kami</div>
        <div>
          <div className="flex gradient-gold font-bold text-2xl w-fit pb-4">Visi</div>
          <div className="flex flex-col gap-3 pb-8">
            {visiMisiData.filter(item => item.category === 'visi').map((item, index) => (
              <div className="flex gap-5" key={index}>
                <img src={RightNumbering} className="w-5"/>
                <div className="text-white">{item.content}</div>
              </div>
            ))}
          </div>
          <div className="flex gradient-gold font-bold text-2xl w-fit pb-4">Misi</div>
          <div className="flex flex-col gap-3 pb-8">
            {visiMisiData.filter(item => item.category === 'misi').map((item, index) => (
              <div className="flex gap-5" key={index}>
                <img src={RightNumbering} className="w-5"/>
                <div className="text-white">{item.content}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* kehalalan dan kualitas  */}
      <div className="px-8 pt-8 py-16">
        <div className="flex gradient-gold gradient-gold-line-left font-semibold text-2xl pb-8">Kehalalan & Kualitas</div>
        <div className="flex gradient-gold w-fit mx-auto font-bold text-2xl md:text-4xl pb-8">Produk Kami Halal</div>
        <div className="flex gap-5 pb-6">
          <img src={RightNumbering} className="w-5"/>
          <div className="text-white">Gokka hadir dengan pilihan rasa seru yang bisa kamu mix & match sesuka hati. Tenang aja, semuanya udah halal, jadi bisa dinikmati bareng siapa pun, kapan pun!</div>
        </div>
        <div className="flex justify-center gap-8 text-white text-sm md:text-base">
          <div className="flex flex-col items-center">
            <img src={NoPIRT} />
            <div className="text-center">Nomor P-IRT:</div>
            <div className="text-center font-bold">2073671040052-26</div>
          </div>
          <div className="flex flex-col items-center">
            <img src={NoHalal} />
            <div className="text-center">Nomor Halal:</div>
            <div className="text-center font-bold">36110006299010322</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TentangKami;
