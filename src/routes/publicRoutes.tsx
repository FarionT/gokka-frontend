import { Suspense } from 'react';
import { Outlet } from 'react-router';
import { Footer, Navbar } from '../components';
const BasicLayout = () => {
  // Pages are lazy-loaded (see mainRoutes.tsx). Navbar and footer stay visible while
  // a page's code downloads; the empty block keeps the footer from jumping up.
  return (
    <Suspense fallback={<div className='min-h-screen' />}>
      <Outlet />
    </Suspense>
  );
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