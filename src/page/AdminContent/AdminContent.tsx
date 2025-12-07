import { useNavigate } from 'react-router';
import { Breadcrumb } from '../../ui-kit';
import './AdminContent.scss';

const AdminContent = () => {
  const navigate = useNavigate();
  const breadcrumbData = [
    { label: 'Content', href: '/admin/v1/content' },
  ];

  return (
    <div className="admin-dashboard">
      <Breadcrumb items={breadcrumbData} />
      <div className='text-5xl font-normal py-8'>Content</div>
      <div>
        <div className='border border-gray-500 w-54 flex justify-center py-3 px-6 rounded-lg cursor-pointer' onClick={() => navigate('/admin/v1/contents/beranda')}>Beranda</div>
      </div>
    </div>
  )
}

export default AdminContent;