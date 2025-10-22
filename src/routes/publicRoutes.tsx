import { Outlet } from 'react-router';
import { Footer, Navbar } from '../components';
const BasicLayout = () => {
  return <Outlet />;
};

const PublicRoutes = () => {
  return (
    <>
      <Navbar />
      <BasicLayout />
      <Footer/>
    </>
  )
};


export default PublicRoutes;