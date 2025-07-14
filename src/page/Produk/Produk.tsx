import './Produk.scss';
import { Modal, Tab, TabKatalog, Tabs, TabsKatalog } from '../../ui-kit';
import { ProdukKatalog } from '../../components';
import { useEffect, useState } from 'react';

// import logo
import All from '../../assets/Logo/All.svg';
import Buah from '../../assets/Logo/Buah.svg';
import Dessert from '../../assets/Logo/Dessert.svg';
import Floral from '../../assets/Logo/Floral.svg';
import SegarUnik from '../../assets/Logo/SegarUnik.svg';
import RempahKacang from '../../assets/Logo/RempahKacang.svg';
import KopiTeh from '../../assets/Logo/KopiTeh.svg';

const category = [
  {
    name: 'All',
    icon: All
  },
  {
    name: 'Buah',
    icon: Buah
  },
  {
    name: 'Dessert',
    icon: Dessert
  },
  {
    name: 'Floral',
    icon: Floral
  },
  {
    name: 'Segar & Unik',
    icon: SegarUnik
  },
  {
    name: 'Rempah & Kacang',
    icon: RempahKacang
  },
  {
    name: 'Kopi & Teh',
    icon: KopiTeh
  },
]

const produk = [
  {
    id: 1,
    name: 'Mangga',
    color: '#fcba03',
    type: 'cair',
    category: 'buah'
  },
  {
    id: 2,
    name: 'Apel',
    color: '#000000',
    type: 'cair',
    category: 'buah'
  },
  {
    id: 3,
    name: 'Oreo',
    color: '#000000',
    type: 'cair',
    category: 'dessert'
  },
  {
    id: 4,
    name: 'Melati',
    color: '#ffffff',
    type: 'cair',
    category: 'floral'
  },
  {
    id: 5,
    name: 'Mawar',
    color: '#000000',
    type: 'cair',
    category: 'floral'
  },
  {
    id: 6,
    name: 'Lemon Jasmine',
    color: '#000000',
    type: 'cair',
    category: 'segar_unik'
  },
  {
    id: 7,
    name: 'Lemon Jasmine',
    color: '#000000',
    type: 'cair',
    category: 'segar_unik'
  },
  {
    id: 8,
    name: 'Lemon Jasmine',
    color: '#000000',
    type: 'cair',
    category: 'segar_unik'
  },
  {
    id: 9,
    name: 'Almond',
    color: '#000000',
    type: 'cair',
    category: 'rempah_kacang'
  },
  {
    id: 10,
    name: 'Kopi',
    color: '#000000',
    type: 'cair',
    category: 'kopi'
  },
]

const Produk = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [products, setProducts] = useState(produk);
  const [selectedProduct, setSelectedProduct] = useState({})
  const [selectedProductId, setSelectedProductId] = useState(0)
  const [typeActiveTabIndex, setTypeActiveTabIndex] = useState(0);
  const [categoryActiveTabIndex, setCategoryActiveTabIndex] = useState(0);
  
  const typeIndex = ['cair', 'bubuk']
  
  const categoryIndex = [
    'all',
    'buah',
    'dessert',
    'floral',
    'segar_unik',
    'rempah_kacang',
    'kopi_teh'
  ]
  
  const handleTypeTabChange = (index: number) => {
    setTypeActiveTabIndex(index);
  };

  useEffect(() => {
    setCategoryActiveTabIndex(0)
    setProducts(produk.filter(item => item.type === typeIndex[0]))
  }, [typeActiveTabIndex])
  
  useEffect(() => {
    if (categoryActiveTabIndex === 0) {
      setProducts(produk)
    } else {
      setProducts(produk.filter(item => item.category === categoryIndex[categoryActiveTabIndex]))
    }
  }, [categoryActiveTabIndex])

  useEffect(() => {
    const currentProduct = produk.find(item => item.id === selectedProductId);
    setSelectedProduct(currentProduct ?? {})
  }, [selectedProductId])

  const openModal = (): void => setIsModalOpen(true);
  const closeModal = (): void => setIsModalOpen(false);

  return (
    <div className='produk'>
      <Tabs position='center' activeTab={typeActiveTabIndex} onChange={handleTypeTabChange}>
        <Tab title='Cair'>
          <TabsKatalog position='center' activeTab={categoryActiveTabIndex} onChange={setCategoryActiveTabIndex}>
            {category.map((item, index) => (
              <TabKatalog title={item.icon} key={index}>
                <div className='flex flex-wrap gap-8 max-w-[1600px] mx-auto p-6'>
                  {products.map((product, index) => (
                    <ProdukKatalog
                      key={index}
                      name={product.name}
                      color={product.color}
                      image={Floral}
                      onClick={() => { openModal(); setSelectedProductId(product.id) }}
                    />
                  ))}
                </div>
              </TabKatalog>
            ))}
          </TabsKatalog>
        </Tab>
        <Tab title='Bubuk'>
          <TabsKatalog position='center' activeTab={categoryActiveTabIndex} onChange={setCategoryActiveTabIndex}>
            {category.map((item, index) => (
              <TabKatalog title={item.icon} key={index}>
                <div className='flex flex-wrap gap-8 max-w-[1600px] mx-auto p-6'>
                  {products.map((product, index) => (
                    <ProdukKatalog
                      key={index}
                      name={product.name}
                      color={product.color}
                      image={Floral}
                      onClick={() => { openModal(); setSelectedProductId(product.id) }}
                    />
                  ))}
                </div>
              </TabKatalog>
            ))}
          </TabsKatalog>
        </Tab>
      </Tabs>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div>{selectedProduct ? selectedProduct.name : ''}</div>
        <div>{selectedProduct ? selectedProduct.color : ''}</div>
        <div>{selectedProduct ? selectedProduct.name : ''}</div>
      </Modal>
    </div>
  )
}

export default Produk;