import { useNavigate } from 'react-router';
import { AdminButton, Breadcrumb, InputField, Table } from '../../ui-kit';
import type { Column } from '../../ui-kit/Table/Table';
import './AdminProduct.scss';

// Importing Images
import { useEffect, useState } from 'react';
import { useDebounce } from '../../utils/useDebounce';
import { deleteProduct, getAllProducts } from '../../services/product.services';
import { useLoader } from '../../utils/userLoader';

const AdminFAQ = () => {
  const { showLoader, hideLoader } = useLoader();
  const [page, setPage] = useState(1);
  const [row, setRow] = useState(10);
  const [search, setSearch] = useState('');
  const [totalItem, setTotalItem] = useState(0);
  const [data, setData] = useState<any>([]);

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
            <AdminButton color='destructive' onClick={() => deleteData(props.id)}>Delete</AdminButton>
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
        search: debouncedSearch
      }
      const res = await getAllProducts(params)
      if (res.status === 200) {
        const totalData = res.data.data;
        setTotalItem(totalData.count);
        setData(totalData.rows)
      }
    } finally {
      hideLoader()
    }
  }

  const deleteData = async (id: any) => {
    try {
      showLoader()
      const res = await deleteProduct(id)
      if (res.status === 200) {
        fetchData();
      }
    } finally {
      hideLoader()
    }
  }

  useEffect(() => {
    fetchData();
  }, [page, debouncedSearch])

  return (
    <div className="admin-dashboard">
      <Breadcrumb items={breadcrumbData} />
      <div className='text-5xl font-normal py-8'>Product</div>
      <div className='flex justify-between items-end mb-5'>
        <InputField 
          label='Search' 
          placeholder='Search'
          type='text' 
          value={search} 
          onChange={(e: any) => setSearch(e)}    
          className='w-64'      
        />
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
    </div>
  )
}

export default AdminFAQ;