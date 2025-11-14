import { useNavigate } from 'react-router';
import { AdminButton, Breadcrumb } from '../../ui-kit';
import './AdminDashboard.scss';

// Importing Images
const AdminDashboard = () => {
  const navigate = useNavigate();
  return (
    <div className="admin-dashboard">
      <Breadcrumb items={[]} />
      <div className='text-5xl font-normal py-8'>Dashboard</div>
      <AdminButton onClick={() => navigate('/')}>
        Go to Main Page
      </AdminButton>
    </div>
  )
}

export default AdminDashboard;