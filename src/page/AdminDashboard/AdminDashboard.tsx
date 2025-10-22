import { Breadcrumb } from '../../ui-kit';
import './AdminDashboard.scss';

// Importing Images
const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <Breadcrumb items={[]} />
      <div className='text-5xl font-normal py-8'>Dashboard</div>
    </div>
  )
}

export default AdminDashboard;