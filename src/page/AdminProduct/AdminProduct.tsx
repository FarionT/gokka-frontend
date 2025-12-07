import { useNavigate } from 'react-router';
import { AdminButton, AdminModal, Breadcrumb, InputField, Table, Toast } from '../../ui-kit';
import type { Column } from '../../ui-kit/Table/Table';
import './AdminProduct.scss';

// Importing Images
import { useEffect, useState } from 'react';
import { useDebounce } from '../../utils/useDebounce';
import { deleteProduct, getAllProducts, getProductCategory } from '../../services/product.services';
import { useLoader } from '../../utils/userLoader';
import { useErrorHandler } from '../../utils/getAuth';

const AdminFAQ = () => {
  const { showLoader, hideLoader } = useLoader();
  const handleErrorResponse = useErrorHandler();
  const [page, setPage] = useState(1);
  const row = 10;
  const [search, setSearch] = useState('');
  const [totalItem, setTotalItem] = useState(0);
  const [data, setData] = useState<any>([]);
  const [selectedId, setSelectedId] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [subcategoryId, setSubcategoryId] = useState('')
  const [productCategories, setProductCategories] = useState<any>([])
  const [productSubcategories, setProductSubcategories] = useState<any>([])
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();
  const debouncedSearch = useDebounce(search, 500);
  const faqColumns: Column<any>[] = [
    { 
      header: 'Name', 
      accessor: 'name' 
    },
    { 
      header: 'Category', 
      accessor: 'category_name' 
    },
    { 
      header: 'Subcategory', 
      accessor: 'subcategory_name' 
    },
    { 
      header: 'Action', 
      accessor: 'id', 
      render: (props: any) => {
        return (
          <div className='flex gap-4'>
            <AdminButton onClick={() => navigate(`/admin/v1/products/detail?id=${props.id}`)}>Edit</AdminButton>
            <AdminButton color='destructive' onClick={() => { setSelectedId(props.id); openModal(); }}>Delete</AdminButton>
          </div>
        )
      }
    },
  ];

  const breadcrumbData = [
    { label: 'Product', href: '/admin/v1/products' },
  ];

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };
  const handlePrevPage = () => {
    setPage((prevPage) => Math.max(1, prevPage - 1));
  };

  const fetchData = async () => {
    try {
      showLoader()
      const params = {
        pagination: true,
        page: page,
        row: row,
        search: debouncedSearch,
        category: categoryId,
        subcategory: subcategoryId
      }
      const res = await getAllProducts(params)
      if (res.status === 200) {
        const totalData = res.data.data;
        setTotalItem(totalData.count);
        setData(totalData.rows)
      } else handleErrorResponse(res)
    } finally {
      hideLoader()
    }
  }

  const deleteData = async (id: any) => {
    try {
      showLoader()
      const res = await deleteProduct(id)
      if (res.status === 200) {
        Toast('Success', 'success', res.data.message)
        fetchData();
      } else handleErrorResponse(res)
    } finally {
      hideLoader()
    }
  }

  useEffect(() => {
    fetchData();
  }, [page, debouncedSearch, categoryId, subcategoryId])

  useEffect(() => {
    setPage(1)
  }, [debouncedSearch])

  const getProductCategoryFunc = async () => {
    try {
      showLoader()
      const res = await getProductCategory()
      if (res.status === 200) {
        const data = res.data.data;
        setProductCategories(data);
      } else handleErrorResponse(res)
    } finally {
      hideLoader()
    }
  }

  useEffect(() => {
    getProductCategoryFunc();
  }, [])

  useEffect(() => {
    setSubcategoryId('')
    setProductSubcategories([])
  }, [categoryId])

  useEffect(() => {
    const productSubcategories = productCategories.find((category: any) => category.id === categoryId)?.product_subcategories || [];
    setProductSubcategories(productSubcategories);
    // setProductSubcategoryId('');
  }, [productCategories, categoryId])

  const openModal = (): void => setIsModalOpen(true);
  const closeModal = (): void => setIsModalOpen(false);

  return (
    <div className="admin-dashboard">
      <Breadcrumb items={breadcrumbData} />
      <div className='text-5xl font-normal py-8'>Product</div>
      <div className='flex justify-between items-end mb-5'>
        <div className='flex gap-5'>
          <InputField 
            label='Search' 
            placeholder='Search'
            type='text' 
            value={search} 
            onChange={(e: any) => setSearch(e)}    
            className='w-64'      
          />
          <InputField 
            label='Category' 
            placeholder='Category'
            type='dropdown' 
            value={categoryId} 
            options={productCategories.map((category: any) => ({ label: category.name, value: category.id }))}
            onChange={(e: any) => setCategoryId(e)}    
            className='w-64'      
          />
          <InputField 
            label='Subcategory' 
            placeholder='Subcategory'
            type='dropdown' 
            disabled={categoryId === ''}
            options={productSubcategories.map((category: any) => ({ label: category.name, value: category.id }))}
            value={subcategoryId} 
            onChange={(e: any) => setSubcategoryId(e)}    
            className='w-64'      
          />
        </div>
        <AdminButton className='' onClick={() => navigate('/admin/v1/products/detail')}>Create</AdminButton>
      </div>
      <Table
          data={data}
          columns={faqColumns}
          usePagination={true}
          totalItems={totalItem}
          rows={row}
          page={page}
          onNextPage={handleNextPage}
          onPrevPage={handlePrevPage}
        />
      <AdminModal isOpen={isModalOpen} onClose={closeModal}>
        <div className='bg-white h-fit w-full p-5 flex flex-col gap-5'>
          <div className='text-xl'>Delete item?</div>
          <div className='flex justify-end gap-5'>
            <AdminButton color='secondary' onClick={() => closeModal()}>Cancel</AdminButton>
            <AdminButton color='destructive' onClick={() => deleteData(selectedId)}>Delete</AdminButton>
          </div>
        </div>
      </AdminModal>
    </div>
  )
}

export default AdminFAQ;