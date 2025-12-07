import { useNavigate } from 'react-router';
import { AdminButton, AdminModal, Breadcrumb, InputField, Table, Toast } from '../../ui-kit';
import type { Column } from '../../ui-kit/Table/Table';
import './AdminRecipe.scss';

// Importing Images
import { useEffect, useState } from 'react';
import { useDebounce } from '../../utils/useDebounce';
import { deleteRecipe, getAllRecipes } from '../../services/recipe.services';
import { useLoader } from '../../utils/userLoader';
import { useErrorHandler } from '../../utils/getAuth';

const AdminRecipe = () => {
  const { showLoader, hideLoader } = useLoader();
  const handleErrorResponse = useErrorHandler();
  const [page, setPage] = useState(1);
  const row = 10;
  const [search, setSearch] = useState('');
  const [totalItem, setTotalItem] = useState(0);
  const [data, setData] = useState<any>([]);
  const [selectedId, setSelectedId] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();
  const debouncedSearch = useDebounce(search, 500);
  const faqColumns: Column<any>[] = [
    { 
      header: 'Name', 
      accessor: 'name' 
    },
    { 
      header: 'Product', 
      accessor: 'product_name' 
    },
    { 
      header: 'Action', 
      accessor: 'id', 
      render: (props: any) => {
        return (
          <div className='flex gap-4'>
            <AdminButton onClick={() => navigate(`/admin/v1/recipes/detail?id=${props.id}`)}>Edit</AdminButton>
            <AdminButton color='destructive' onClick={() => { setSelectedId(props.id); openModal(); }}>Delete</AdminButton>
          </div>
        )
      }
    },
  ];

  const breadcrumbData = [
    { label: 'Recipe', href: '/admin/v1/recipes' },
  ];

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };
  const handlePrevPage = () => {
    setPage((prevPage) => Math.max(1, prevPage - 1));
  };

  const fetchData = async () => {
    const params = {
      pagination: true,
      page: page,
      row: row,
      search: debouncedSearch
    }
    try {
      showLoader();
      const res = await getAllRecipes(params)
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
      showLoader();
      const res = await deleteRecipe(id)
        if (res.status === 200) {
          Toast('Success', 'success', res.data.message)
          fetchData();
        } else handleErrorResponse(res)
    } finally {
      closeModal();
      hideLoader();
    }
  }

  useEffect(() => {
    fetchData();
  }, [page, debouncedSearch])

  useEffect(() => {
    setPage(1)
  }, [debouncedSearch])

  const openModal = (): void => setIsModalOpen(true);
  const closeModal = (): void => setIsModalOpen(false);

  return (
    <div className="admin-dashboard">
      <Breadcrumb items={breadcrumbData} />
      <div className='text-5xl font-normal py-8'>Recipe</div>
      <div className='flex justify-between items-end mb-5'>
        <InputField 
          label='Search' 
          placeholder='Search'
          type='text' 
          value={search} 
          onChange={(e: any) => setSearch(e)}    
          className='w-64'      
        />
        <AdminButton className='' onClick={() => navigate('/admin/v1/recipes/detail')}>Create</AdminButton>
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

export default AdminRecipe;