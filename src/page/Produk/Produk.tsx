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

// import gambar
import NoHalal from "../../assets/Logo/NoHalal.svg";
import NoPIRT from "../../assets/Logo/NoPIRT.svg";
import { Swiper, SwiperSlide } from "swiper/react";

const Produk = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [products, setProducts] = useState(produk);
  const [selectedProduct, setSelectedProduct] = useState({
    name: "",
    color: "",
    image: "",
  });
  const [selectedProductId, setSelectedProductId] = useState(0);
  const [typeActiveTabIndex, setTypeActiveTabIndex] = useState(0);
  const [categoryActiveTabIndex, setCategoryActiveTabIndex] = useState(0);

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

  useEffect(() => {
    setCategoryActiveTabIndex(0);
    setProducts(produk.filter((item) => item.type === typeIndex[0]));
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

  useEffect(() => {
    const currentProduct = produk.find((item) => item.id === selectedProductId);
    setSelectedProduct(currentProduct ?? { name: "", image: "", color: "" });
  }, [selectedProductId]);

  const openModal = (): void => setIsModalOpen(true);
  const closeModal = (): void => setIsModalOpen(false);

  return (
    <div className="produk">
      <Tabs
        position="center"
        activeTab={typeActiveTabIndex}
        onChange={handleTypeTabChange}
      >
        <Tab title="Cair">
          <TabsKatalog
            position="center"
            activeTab={categoryActiveTabIndex}
            onChange={setCategoryActiveTabIndex}
          >
            {category.map((item, index) => (
              <TabKatalog title={item.icon} name={item.name} key={index}>
                <div className="flex flex-wrap gap-8 max-w-[1600px] mx-auto p-6 justify-center">
                  {products.length > 0 ? products.map((product, index) => (
                    <ProdukKatalog
                      key={index}
                      name={product.name}
                      color={product.color}
                      image={product.image}
                      onClick={() => {
                        openModal();
                        setSelectedProductId(product.id);
                      }}
                    />
                  )) : <div className="font-bold text-3xl text-white">Tidak ada data</div>}
                </div>
              </TabKatalog>
            ))}
          </TabsKatalog>
        </Tab>
        <Tab title="Bubuk">
          <TabsKatalog
            position="center"
            activeTab={categoryActiveTabIndex}
            onChange={setCategoryActiveTabIndex}
          >
            {category.map((item, index) => (
              <TabKatalog title={item.icon} name={item.name} key={index}>
                <div className="flex flex-wrap gap-8 max-w-[1600px] mx-auto p-6 justify-center">
                  {products.length > 0 ? products.map((product, index) => (
                    <ProdukKatalog
                      key={index}
                      name={product.name}
                      color={product.color}
                      image={product.image}
                      onClick={() => {
                        openModal();
                        setSelectedProductId(product.id);
                      }}
                    />
                  )) : <div className="font-bold text-3xl text-white">Tidak ada data</div>}
                </div>
              </TabKatalog>
            ))}
          </TabsKatalog>
        </Tab>
      </Tabs>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="produk-modal rounded-xl text-white">
          <div>
            <Swiper 
              spaceBetween={50}
              slidesPerView={3}
              onSlideChange={() => console.log('slide change')}
              onSwiper={(swiper) => console.log(swiper)}
            >
              <SwiperSlide><img src={produk[0].image} /></SwiperSlide>
            </Swiper>
          </div>
          <div className="produk-modal-text p-8 flex flex-col">
            <div className="gradient-gold gradient-gold-line flex font-bold text-4xl">Deskripsi</div>
            <div>
              Produk ini merupakan pilihan praktis yang siap disajikan serta dapat
              digunakan sebagai bahan baku untuk berbagai jenis makanan dan
              minuman. Sangat cocok digunakan dalam berbagai jenis usaha seperti
              bubble tea, es krim, es buah, kue, minuman, kafe, kopi, teh, dan
              lain sebagainya. Diproduksi menggunakan gula asli dari merk Gulaku,
              produk ini telah bersertifikat HALAL, sehingga aman dan terpercaya
              untuk dikonsumsi.
            </div>
            <div className="gradient-gold gradient-gold-line flex font-bold text-4xl">Bahan & Kualitas</div>
            <div>Gula Asli</div>
            <div>➤ Diproduksi menggunakan gula asli dari merk <span className="font-semibold">Gulaku</span></div>
            <div>Izin Edar & Halal</div>
            <div className="flex justify-center gap-8">
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
            <div className="gradient-gold gradient-gold-line flex font-bold text-4xl">Penyimpanan</div>
            <div>Praktis & Tahan Lama</div>
            <div className="gradient-gold gradient-gold-line flex font-bold text-4xl">Pengemasan</div>
            <div>Praktis & Tahan Lama</div>
            <div className="gradient-gold gradient-gold-line flex font-bold text-4xl">Komposisi</div>
            <div className="pt-4">
              ➤ Gula (55%)<br/>
              ➤ Air (32%)<br/>
              ➤ Perisa/Essence (5%) <br/>
              ➤ Stevia ({'<'}1%) <br/>
              ➤ Potassium Sorbat (5%)
            </div>
            <div className="gradient-gold gradient-gold-line flex font-bold text-4xl">Kebijakan</div>
            <div className="pt-4">
              ➤ Jika terjadi kerusakan atau kehilangan barang selama proses pengiriman, hal tersebut berada di luar tanggung jawab pihak toko. Pengemasan telah dilakukan sesuai standar keamanan.
            </div>
            <div className="flex flex-col items-center text-center text-3xl md:text-5xl/15 pt-7">
              <span className='font-bold'>Bebasin Gayamu,</span>
              <span className='font-bold'>Rasain Gokka</span>
              <span className='font-bold gradient-gold'>Sekarang!</span>
              <span className='text-white pt-3 text-xs xl:text-base w-68'>Produk kami dapat dibeli di berbagai platform e-commerce</span>
            </div>
            <div className='flex items-center justify-center gap-12 md:gap-24 py-12'>
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
            <a href="https://linktr.ee/gokkaindonesia" target="__blank" className="mx-auto">
              <Button className="font-bold w-fit">Beli Sekarang</Button>
            </a>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Produk;
