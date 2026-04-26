import { useNavigate, useSearchParams } from 'react-router';
import { AdminButton, Breadcrumb, InputField, Toast } from '../../ui-kit';
import './AdminExpeditionDetail.scss';

// Importing Images
import { useEffect, useState } from 'react';
import { useLoader } from '../../utils/userLoader';
import { checkPermission, useErrorHandler } from '../../utils/getAuth';
import { createExpedition, getExpeditionById, updateExpedition } from '../../services/expedition.services';

const AdminExpeditionDetail = () => {
  const handleErrorResponse = useErrorHandler();
  const { showLoader, hideLoader } = useLoader();
  const [name, setName] = useState('');

  const navigate = useNavigate();
  const [searchParams] = useSearchParams()
  const id = searchParams.get('id')

  const permissionRead = checkPermission('expedition', 'read');

  const fetchData = async () => {
    if (!id) return
    try {
      showLoader()
      const res = await getExpeditionById(id)
      if (res.status === 200) {
        const data = res.data.data;
        setName(data.name);
      }
    } finally {
      hideLoader()
    }
  }

  useEffect(() => {
    if (permissionRead) {
      if (!id) return
      fetchData();
    } else {
      navigate('/admin/v1/dashboard')
    }
  }, [id]);

  const breadcrumbData = [
    { label: 'Expedition', href: '/admin/v1/expedition' },
    { label: 'Detail', href: '/' },
  ];

  const handleSubmit = async () => {
    const data = {
      name,
    }
    try {
      showLoader()
      if (id) {
        const res = await updateExpedition(id, data)
        if (res.status === 200) {
          Toast('Success', 'success', res.data.message)
          navigate('/admin/v1/expeditions')
        } else handleErrorResponse(res)
      } else {
        const res = await createExpedition(data)
        if (res.status === 201) {
          Toast('Success', 'success', res.data.message)
          navigate('/admin/v1/expeditions')
        } else handleErrorResponse(res)
      }
    } finally {
      hideLoader()
    }
  }

  return (
    <div className="admin-faq-detail">
      <Breadcrumb items={breadcrumbData} />
      <div className='text-5xl font-normal py-8'>{id ? 'Update Expedition' : 'Create Expedition'}</div>
      <div className='pb-5 gap-5 flex flex-col'>
        <InputField 
          label='Name'
          placeholder='Name'
          type='text'
          rows={4}
          value={name}
          className='w-64'
          onChange={(e: any) => setName(e)}       
        />
      </div>
      <div className='flex justify-end gap-5'>
        <AdminButton color='secondary' onClick={() => navigate('/admin/v1/faq')}>Back</AdminButton>
        <AdminButton disabled={name === ''} onClick={handleSubmit}>Save</AdminButton>
      </div>
    </div>
  )
}

export default AdminExpeditionDetail;