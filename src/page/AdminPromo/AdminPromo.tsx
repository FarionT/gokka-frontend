import { useNavigate } from 'react-router';
import { AdminButton, Breadcrumb, InputField, Table, Toast } from '../../ui-kit';
import type { Column } from '../../ui-kit/Table/Table';
import './AdminPromo.scss';

// Importing Images
import { useEffect, useState } from 'react';
import { useDebounce } from '../../utils/useDebounce';
import { useLoader } from '../../utils/userLoader';
import { deletePromo, getAllPromos } from '../../services/promo.services';
import { useErrorHandler } from '../../utils/getAuth';

const AdminPromo = () => {
  const { showLoader, hideLoader } = useLoader();
  const handleErrorResponse = useErrorHandler();
  const [page, setPage] = useState(1);
  const row = 10;
  const [search, setSearch] = useState('');
  const [totalItem, setTotalItem] = useState(0);
  const [data, setData] = useState<any>([]);

  const navigate = useNavigate();
  const debouncedSearch = useDebounce(search, 500);
  const faqColumns: Column<any>[] = [
    { 
      header: 'Product', 
      accessor: 'product_name' 
    },
    { 
      header: 'Product Variant', 
      accessor: 'product_variant_name' 
    },
    { 
      header: 'Price', 
      accessor: 'price' 
    },
    { 
      header: 'Discount (%)', 
      accessor: 'discount' 
    },
    { 
      header: 'Final Price', 
      accessor: 'final_price',
      render: (props: any) => {
        return (
          <div>
            {Math.round(props.price * (100 - props.discount) / 100)}
          </div>
        )
      } 
    },
    { 
      header: 'Action', 
      accessor: 'id', 
      render: (props: any) => {
        return (
          <div className='flex gap-4'>
            <AdminButton onClick={() => navigate(`/admin/v1/promos/detail?id=${props.id}`)}>Edit</AdminButton>
            <AdminButton color='destructive' onClick={() => deleteData(props.id)}>Delete</AdminButton>
          </div>
        )
      }
    },
  ];

  const breadcrumbData = [
    { label: 'Promo', href: '/admin/v1/promos' },
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
      const res = await getAllPromos(params)
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
      const res = await deletePromo(id)
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
  }, [page, debouncedSearch])

  useEffect(() => {
    setPage(1)
  }, [debouncedSearch])

  return (
    <div className="admin-promo">
      <Breadcrumb items={breadcrumbData} />
      <div className='text-5xl font-normal py-8'>Promo</div>
      <div className='flex justify-between items-end mb-5'>
        <InputField 
          label='Search' 
          placeholder='Search'
          type='text' 
          value={search} 
          onChange={(e: any) => setSearch(e)}    
          className='w-64'      
        />
        <AdminButton className='' onClick={() => navigate('/admin/v1/promos/detail')}>Create</AdminButton>
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

export default AdminPromo;