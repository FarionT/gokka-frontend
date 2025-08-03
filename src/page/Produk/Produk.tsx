import "./Produk.scss";
import { Button, Modal, Tab, TabKatalog, Tabs, TabsKatalog } from "../../ui-kit";
import { ProdukKatalog } from "../../components";
import { useEffect, useState } from "react";
import { category, produk } from "./ListData";

// import logo
import Shopee from '../../assets/Logo/Shopee.svg';
import Blibli from '../../assets/Logo/Blibli.svg';
import Lazada from '../../assets/Logo/Lazada.svg';
import Tokopedia from '../../assets/Logo/Tokopedia.svg';
import TahanLama from '../../assets/Logo/TahanLama.svg';

// import gambar
import NoHalal from "../../assets/Logo/NoHalal.png";
import NoPIRT from "../../assets/Logo/NoPIRT.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation, Pagination } from "swiper/modules";
import KatalogBackground from '../../assets/Image/ProdukKatalog/KatalogBackground.jpg';

const Produk = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [products, setProducts] = useState(produk);
  // const [selectedProduct, setSelectedProduct] = useState({
  //   name: "",
  //   color: "",
  //   image: "",
  // });
  const [selectedProductId, setSelectedProductId] = useState(0);
  const [typeActiveTabIndex, setTypeActiveTabIndex] = useState(0);
  const [categoryActiveTabIndex, setCategoryActiveTabIndex] = useState(0);
  const [modalActiveIndex, setModalActiveIndex] = useState(0);

  const typeIndex = ["cair", "bubuk"];

  const categoryIndex = [
    "all",
    "buah",
    "dessert",
    "floral",
    "segar_unik",
    "rempah_kacang",
    "kopi_teh",
  ];

  const handleTypeTabChange = (index: number) => {
    setTypeActiveTabIndex(index);
  };

  const handleCategoryTabChange = (index: number) => {
    setCategoryActiveTabIndex(index);
  };

  useEffect(() => {
    setCategoryActiveTabIndex(0);
    setProducts(produk.filter((item) => item.type === typeIndex[typeActiveTabIndex]));
  }, [typeActiveTabIndex]);

  useEffect(() => {
    if (categoryActiveTabIndex === 0) {
      setProducts(produk);
    } else {
      setProducts(
        produk.filter(
          (item) => item.category === categoryIndex[categoryActiveTabIndex]
        )
      );
    }
  }, [categoryActiveTabIndex]);

  // useEffect(() => {
  //   const currentProduct = produk.find((item) => item.id === selectedProductId);
  //   // setSelectedProduct(currentProduct ?? { name: "", image: "", color: "" });
  // }, [selectedProductId]);

  const openModal = (): void => setIsModalOpen(true);
  const closeModal = (): void => setIsModalOpen(false);

  return (
    <div className="produk p-8">
      <Tabs
        position="center"
        activeTab={typeActiveTabIndex}
        onChange={handleTypeTabChange}
      >
        <Tab title="Cair">
          <TabsKatalog
            position="center"
            activeTab={categoryActiveTabIndex}
            onChange={handleCategoryTabChange}
          >
            {category.map((item, index) => (
              <TabKatalog title={item.icon} key={index} name={item.name} >
                <div className="flex flex-wrap gap-4 md:gap-8 max-w-[1200px] mx-auto justify-center">
                  {products.filter(item => item.type === 'cair').map((product, index) => (
                    <ProdukKatalog
                      key={index}
                      name={product.name}
                      color={product.color}
                      image={product.image}
                      onClick={() => {
                        openModal();
                        setSelectedProductId(product.id - 1);
                      }}
                    />
                  ))}
                </div>
              </TabKatalog>
            ))}
          </TabsKatalog>
        </Tab>
        <Tab title="Bubuk">
          <TabsKatalog
            position="center"
            activeTab={categoryActiveTabIndex}
            onChange={handleCategoryTabChange}
          >
            {category.map((item, index) => (
              <TabKatalog title={item.icon} key={index} name={item.name} >
                <div className="flex flex-wrap gap-4 md:gap-8 max-w-[1200px] mx-auto justify-center">
                  {products.filter(item => item.type === 'bubuk').map((product, index) => (
                    <ProdukKatalog
                      key={index}
                      name={product.name}
                      color={product.color}
                      image={product.image}
                      onClick={() => {
                        openModal();
                        setSelectedProductId(product.id - 1);
                      }}
                    />
                  ))}
                </div>
              </TabKatalog>
            ))}
          </TabsKatalog>
        </Tab>
      </Tabs>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="produk-modal h-full rounded-xl text-white flex flex-col md:flex-row ">
          <div 
            style={{ backgroundColor: produk[selectedProductId].color }}
            className="h-1/2 md:h-full md:w-1/2 w-full flex flex-col relative rounded-tl-xl rounded-tr-xl md:rounded-tr-none rounded-bl-none md:rounded-bl-xl py-8"
          >
            <img className='absolute w-full h-full object-cover top-0 rounded-tr-none rounded-br-xl md:rounded-tr-xl rounded-bl-xl md:rounded-bl-none pattern rotate-180' src={KatalogBackground} />
            <div className="text-white flex items-end gap-4 justify-center relative z-2">
              <span className="font-bold text-3xl">{typeActiveTabIndex === 0 ? 'Cair' : 'Bubuk'}</span>{' '}
              <span className="font-bold text-xl">{produk[selectedProductId].variant![modalActiveIndex].title}</span>
            </div>
            <div className="my-auto">
              <Swiper 
                effect={'coverflow'}
                grabCursor={true}
                slidesPerView={1}
                loop={true}
                coverflowEffect={{
                  rotate: 0,
                  stretch: 0,
                  depth: 90, 
                  modifier: 1, 
                  slideShadows: false, 
                  scale: 0.75,
                }}
                onSlideChange={(swiper) => {
                  setModalActiveIndex(swiper.activeIndex);
                }}
                pagination={{ clickable: true }}
                navigation={true}
                modules={[EffectCoverflow, Pagination, Navigation]}
              >
                {produk[selectedProductId].variant?.map((item, index) => (
                  <SwiperSlide key={index}>
                    <div 
                      className="flex flex-col items-center p-4"
                    >
                      <img src={item.image} loading="lazy" className="w-48 md:w-96" />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
          <div className="produk-modal-text p-6 md:p-8 flex flex-col md:h-full h-1/2">
            {/* DESKRIPSI  */}
            <div className="pt-2 pb-8">
              <div className="gradient-gold gradient-gold-line flex font-bold text-2xl md:text-4xl pb-4">Deskripsi</div>
              <div className="text-sm md:text-base">
                Produk ini merupakan pilihan praktis yang siap disajikan serta dapat
                digunakan sebagai bahan baku untuk berbagai jenis makanan dan
                minuman. Sangat cocok digunakan dalam berbagai jenis usaha seperti
                bubble tea, es krim, es buah, kue, minuman, kafe, kopi, teh, dan
                lain sebagainya. Diproduksi menggunakan gula asli dari merk Gulaku,
                produk ini telah bersertifikat HALAL, sehingga aman dan terpercaya
                untuk dikonsumsi.
              </div>
            </div>
            {/* BAHAN DAN KUALITAS  */}
            <div className="pt-6 pb-8">
              <div className="gradient-gold gradient-gold-line flex font-bold text-2xl md:text-4xl py-4">Bahan & Kualitas</div>
              <div className="gradient-gold w-fit font-semibold pb-2 md:text-xl">Gula Asli</div>
              <div className="text-sm md:text-base">➤ Diproduksi menggunakan gula asli dari merk <span className="font-bold">Gulaku</span>.</div>
              <div>
                <div className="gradient-gold w-fit font-semibold pt-6 pb-4 md:text-xl">Izin Edar & Halal</div>
                <div className="flex justify-center gap-8 md:gap-12 shrink-0">
                  <div className="flex flex-col items-center text-sm md:text-base">
                    <img src={NoPIRT} className="h-16 pb-2" />
                    <div className="text-center">Nomor P-IRT:</div>
                    <div className="text-center font-bold">2073671040052-26</div>
                  </div>
                  <div className="w-2 h-full bg-white"></div>
                  <div className="flex flex-col items-center text-sm md:text-base">
                    <img src={NoHalal} className="h-16 pb-2" />
                    <div className="text-center">Nomor Halal:</div>
                    <div className="text-center font-bold">36110006299010322</div>
                  </div>
                </div>
              </div>
            </div>
            {/* PENYIMPANAN  */}
            <div className="pt-6 pb-8">
              <div className="gradient-gold gradient-gold-line flex font-bold text-2xl md:text-4xl">Penyimpanan</div>
              <div className="gradient-gold w-fit font-semibold py-4 md:text-xl">Praktis & Tahan Lama</div>
              <div className="flex gap-6 md:gap-8 items-center pb-4">
                <img src={TahanLama} className="w-16 h-16 md:w-20 md:h-20" />
                <div className="text-sm md:text-base">➤ Produk memiliki masa kadaluwarsa selama 1 tahun sejak tanggal pembelian.</div>
              </div>
              <div className="flex gap-6 md:gap-8 items-center">
                <img src={TahanLama} className="w-16 h-16 md:w-20 md:h-20" />
                <div className="text-sm md:text-base">➤ Dapat disimpan pada suhu ruangan tanpa memerlukan pendingin tambahan.</div>
              </div>
            </div>
            {/* PENGEMASAN  */}
            <div className="pt-6 pb-8">
              <div className="gradient-gold gradient-gold-line flex font-bold text-2xl md:text-4xl py-6">Pengemasan</div>
              <div className="flex gap-6 md:gap-8 items-center pb-4">
                <img src={TahanLama} className="w-16 h-16 md:w-20 md:h-20" />
                <div className="text-sm md:text-base">➤ Setiap botol dikemas dalam dus dengan tambahan pelindung bubble wrap untuk menjada keamanan selama pengirimann.</div>
              </div>
              <div className="flex gap-6 md:gap-8 items-center">
                <img src={TahanLama} className="w-16 h-16 md:w-20 md:h-20" />
                <div className="text-sm md:text-base">➤ Produk diproduksi setiap hari dan selalu dikirim dalam kondisi baru.</div>
              </div>
            </div>
            {/* PENYAJIAN  */}
            <div className="pt-6 pb-8">
              <div className="gradient-gold gradient-gold-line flex font-bold text-2xl md:text-4xl">Penyajian</div>
              <div className="pt-4 text-sm md:text-base">
                ➤ Campurkan 20 ml sirup + 20 ml air gula (sesuai selera) + 180 ml air, dan tambahkan es batu. Beberapa varian rasa dapat dikreasikan dengan buah asli, cokelat, susu, atau teh.
              </div>
            </div>
            {/* KOMPOSISI  */}
            <div className="pt-6 pb-8">
              <div className="gradient-gold gradient-gold-line flex font-bold text-2xl md:text-4xl">Komposisi</div>
              <div className="pt-4 text-sm md:text-base">
                ➤ Gula (55%)<br/>
                ➤ Air (32%)<br/>
                ➤ Perisa/Essence (5%) <br/>
                ➤ Stevia ({'<'}1%) <br/>
                ➤ Potassium Sorbat (5%)
              </div>
            </div>
            {/* KEBIJAKAN KAMI  */}
            <div className="pt-6 pb-8">
              <div className="gradient-gold gradient-gold-line flex font-bold text-2xl md:text-4xl">Kebijakan Kami</div>
              <div className="pt-4 text-sm md:text-base">
                ➤ Jika terjadi kerusakan atau kehilangan barang selama proses pengiriman, hal tersebut berada di luar tanggung jawab pihak toko. Pengemasan telah dilakukan sesuai standar keamanan.
              </div>
            </div>
            <div className="flex flex-col items-center text-center text-3xl md:text-5xl/15 pt-7">
              <span className='font-bold'>Bebasin Gayamu,</span>
              <span className='font-bold'>Rasain Gokka</span>
              <span className='font-bold gradient-gold'>Sekarang!</span>
              <span className='text-white pt-3 text-xs xl:text-base w-68'>Produk kami dapat dibeli di berbagai platform e-commerce</span>
            </div>
            <div className='flex items-center justify-center gap-8 md:gap-12 py-12'>
              <a className='flex flex-col items-center justify-between gap-1' href='#'>
                <img src={Shopee} className='h-9 md:h-15' />
                <div className='text-xs md:text-lg'>Shopee</div>
              </a>
              <a className='flex flex-col items-center justify-between gap-1' href='#'>
                <img src={Blibli} className='h-9 md:h-15' />
                <div className='text-xs md:text-lg'>Blibli</div>
              </a>
              <a className='flex flex-col items-center justify-between gap-1' href='#'>
                <img src={Lazada} className='h-9 md:h-15' />
                <div className='text-xs md:text-lg'>Lazada</div>
              </a>
              <a className='flex flex-col items-center justify-between gap-1' href='#'>
                <img src={Tokopedia} className='h-9 md:h-15' />
                <div className='text-xs md:text-lg'>Tokopedia</div>
              </a>
            </div>
            <a href="https://linktr.ee/gokkaindonesia" target="__blank" className="mx-auto pb-8">
              <Button className="font-bold w-fit">Beli Sekarang</Button>
            </a>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Produk;
