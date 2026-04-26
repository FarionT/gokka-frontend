import "./Produk.scss";
import { Button, Modal, Tab, TabKatalog, Tabs, TabsKatalog } from "../../ui-kit";
import { ProdukKatalog } from "../../components";
import { useEffect, useState } from "react";

// import logo
import All from '../../assets/Logo/All.svg';
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
import { getAllProducts, getProductById, getProductCategory } from "../../services/product.services";
import { useLoader } from "../../utils/userLoader";
import { useErrorHandler } from "../../utils/getAuth";
import React from "react";

const Produk = () => {
  const { showLoader, hideLoader } = useLoader();
  const handleErrorResponse = useErrorHandler();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedProductId, setSelectedProductId] = useState('');
  const [typeActiveTabIndex, setTypeActiveTabIndex] = useState(0);
  const [categoryActiveTabIndex, setCategoryActiveTabIndex] = useState(0);
  const [modalActiveIndex, setModalActiveIndex] = useState(0);
  const [categoryId, setCategoryId] = useState('')
  const [subcategoryId, setSubcategoryId] = useState('')
  const [productData, setProductData] = useState<any>([]);
  const [categoryData, setCategoryData] = useState<any>([])
  const [productDetail, setProductDetail] = useState<any>({
    id: '',
    color: '',
    product_variants: [
      {
        id: '',
        name: '',
        path: ''
      }
    ],
    product_compositions: [
      {
        name: ''
      }
    ]
  })

  const handleTypeTabChange = (index: number) => {
    setTypeActiveTabIndex(index);
    setCategoryId(categoryData[index].id)
    setSubcategoryId('')
    setCategoryActiveTabIndex(0)
  };

  const handleCategoryTabChange = (index: number) => {
    setCategoryActiveTabIndex(index);
    if (index === 0) {
      setSubcategoryId('')
    } else {
      const subcategory = categoryData.find((category: any) => category.id === categoryId).product_subcategories;
      setSubcategoryId(subcategory[index].id)
    }
  };

  // useEffect(() => {
  //   setCategoryActiveTabIndex(0);
  //   setProducts(produk.filter((item) => item.type === typeIndex[typeActiveTabIndex]));
  // }, [typeActiveTabIndex]);

  // useEffect(() => {
  //   if (categoryActiveTabIndex === 0) {
  //     setProducts(produk);
  //   } else {
  //     setProducts(
  //       produk.filter(
  //         (item) => item.category === categoryIndex[categoryActiveTabIndex]
  //       )
  //     );
  //   }
  // }, [categoryActiveTabIndex]);

  // useEffect(() => {
  //   const currentProduct = produk.find((item) => item.id === selectedProductId);
  //   // setSelectedProduct(currentProduct ?? { name: "", image: "", color: "" });
  // }, [selectedProductId]);

  const fetchProductData = async() => {
    try {
      showLoader()
      const params = {
        pagination: false,
        category: categoryId,
        subcategory: subcategoryId
      }
      const res = await getAllProducts(params);
      if (res.status === 200) {
        const datas = res.data.data;
        setProductData(datas)
      } else handleErrorResponse(res)
    } finally {
      hideLoader();
    }
  }

  const fetchProductCategoryData = async () => {
    try {
      showLoader()
      const res = await getProductCategory();
      if (res.status === 200) {
        const datas = res.data.data;
        setCategoryId(datas[0].id)
        const tmp: any = datas.map((item: any) => {
          const tmpItem = {
            id: 1,
            name: 'All',
            path: All
          }
          return {
            ...item,
            product_subcategories: [
              tmpItem,
              ...item.product_subcategories
            ]
          }
        })
        setCategoryData(tmp)
      } else handleErrorResponse(res)
    } finally {
      hideLoader()
    }
  }

  const fetchProductDetailData = async () => {
    try {
      showLoader()
      const res = await getProductById(selectedProductId);
      if (res.status === 200) {
        const datas = res.data.data;
        setProductDetail(datas);
      } else handleErrorResponse(res)
    } finally {
      hideLoader()
    }
  }

  useEffect(() => {
    // fetchProductData();
    fetchProductCategoryData();
  }, [])

  useEffect(() => {
    fetchProductData();
    // setCategoryId('')
  }, [categoryId])
  
  useEffect(() => {
    fetchProductData();
  }, [subcategoryId])

  useEffect(() => {
    fetchProductDetailData();
  }, [selectedProductId])

  const openModal = (): void => setIsModalOpen(true);
  const closeModal = (): void => setIsModalOpen(false);

  return (
    <div className="produk p-8">
      <Tabs
        position="center"
        activeTab={typeActiveTabIndex}
        onChange={handleTypeTabChange}
      >
        {categoryData.length > 0 ? categoryData.map((category: any) => (
          <Tab title={category.name} key={category.id}>
            <TabsKatalog
              position="center"
              activeTab={categoryActiveTabIndex}
              onChange={handleCategoryTabChange}
            >
              {category.product_subcategories.map((subcategory: any) => (
                <TabKatalog title={subcategory.path} key={subcategory.id} name={subcategory.name} >
                  <div className="flex flex-wrap gap-4 md:gap-8 max-w-[1200px] mx-auto justify-center">
                    {productData.length > 0 ? productData.map((product: any) => (
                      <ProdukKatalog
                        key={product.id}
                        name={product.name}
                        color={product.color}
                        image={product.path}
                        onClick={() => {
                          openModal();
                          setSelectedProductId(product.id);
                        }}
                      />
                    )) : <div className="text-white">Belum ada produk</div>}
                  </div>
                </TabKatalog>
              ))}
            </TabsKatalog>
          </Tab>
        )) : <div></div>}
        {/* <Tab title="Bubuk">
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
        </Tab> */}
      </Tabs>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="produk-modal h-full rounded-xl text-white flex flex-col md:flex-row ">
          <div 
            style={{ backgroundColor: productDetail.color }}
            className="h-1/2 md:h-full md:w-1/2 w-full flex flex-col relative rounded-tl-xl rounded-tr-xl md:rounded-tr-none rounded-bl-none md:rounded-bl-xl py-8"
          >
            <img className='absolute w-full h-full object-cover top-0 rounded-tr-none rounded-br-xl md:rounded-tr-xl rounded-bl-xl md:rounded-bl-none pattern rotate-180' src={KatalogBackground} />
            <div className="text-white flex items-end gap-4 justify-center relative z-2">
              <span className="font-bold text-3xl">{typeActiveTabIndex === 0 ? 'Cair' : 'Bubuk'}</span>{' '}
              <span className="font-bold text-xl">{productDetail.product_variants ? productDetail.product_variants![modalActiveIndex].name : ''}</span>
            </div>
            <div className="my-auto">
              <Swiper 
                effect={'coverflow'}
                grabCursor={true}
                slidesPerView={1}
                loop={false}
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
                {productDetail.product_variants ? productDetail.product_variants.map((item: any) => (
                  <SwiperSlide key={item.id}>
                    <div 
                      className="flex flex-col items-center p-4"
                    >
                      <img src={item.path} loading="lazy" className="w-48 md:w-96" />
                    </div>
                  </SwiperSlide>
                )) : <div>No Data</div>}
              </Swiper>
            </div>
          </div>
          <div className="produk-modal-text p-6 md:p-8 flex flex-col md:h-full h-1/2">
            {/* DESKRIPSI  */}
            <div className="pt-2 pb-8">
              <div className="gradient-gold gradient-gold-line flex font-bold text-2xl md:text-4xl pb-4">Deskripsi</div>
              <div className="text-sm md:text-base">
                {productDetail.description}
              </div>
            </div>
            {/* BAHAN DAN KUALITAS  */}
            <div className="pt-6 pb-8">
              <div className="gradient-gold gradient-gold-line flex font-bold text-2xl md:text-4xl py-4">Bahan & Kualitas</div>
              <div className="gradient-gold w-fit font-semibold pb-2 md:text-xl">Gula Asli</div>
              <div className="text-sm md:text-base">➤ Diproduksi menggunakan gula asli dari merk <span className="font-bold">Gulaku</span>.</div>
              <div>
                <div className="gradient-gold w-fit font-semibold pt-6 pb-4 md:text-xl">Izin Edar & Halal</div>
                <div className="flex flex-col xs:flex-row justify-center gap-4 xs:gap-8 md:gap-12 shrink-0">
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
                {productDetail.product_compositions ? productDetail.product_compositions.map((item: any) => 
                  <React.Fragment key={item.id}> 
                  ➤ {item.name}<br/>
                  </React.Fragment>) : <></>}
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
                <div className='h-9 md:h-15 flex items-center justify-center p-1 gap-0' >
                  <img src={Lazada} className="h-full w-full" />
                </div>
                <div className='text-xs md:text-lg'>Lazada</div>
              </a>
              <a className='flex flex-col items-center justify-between gap-1' href='#'>
                <div className='h-9 md:h-15 flex items-center justify-center p-1 gap-0' >
                  <img src={Tokopedia} className="h-full w-full" />
                </div>
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
