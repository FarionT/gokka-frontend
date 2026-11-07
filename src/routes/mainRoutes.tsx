import { lazy } from 'react';
import { Route, Routes } from 'react-router';
import PublicRoutes from './publicRoutes';

// Each page is loaded only when it is visited, so the first visit does not download
// every page's code and images at once.
const Beranda = lazy(() => import('../page/Beranda').then((m) => ({ default: m.Beranda })));
const FAQ = lazy(() => import('../page/FAQ').then((m) => ({ default: m.FAQ })));
const Produk = lazy(() => import('../page/Produk').then((m) => ({ default: m.Produk })));
const Resep = lazy(() => import('../page/Resep').then((m) => ({ default: m.Resep })));
const ResepDetail = lazy(() => import('../page/ResepDetail').then((m) => ({ default: m.ResepDetail })));
const ResepStep = lazy(() => import('../page/ResepStep').then((m) => ({ default: m.ResepStep })));
const TentangKami = lazy(() => import('../page/TentangKami').then((m) => ({ default: m.TentangKami })));
const Testimoni = lazy(() => import('../page/Testimoni').then((m) => ({ default: m.Testimoni })));
// import PrivateRoutes from './privateRoutes';
// import CustomRoutes from './customRoutes';

const MainRoutes = () => {
  return (
    <Routes>
      <Route element={<PublicRoutes />}>
        <Route element={<Beranda />} path='/' />
        <Route element={<FAQ />} path='/faq' />
        <Route element={<Produk />} path='/produk' />
        <Route element={<Resep />} path='/resep' />
        <Route element={<ResepDetail />} path='/resep/:id' />
        <Route element={<ResepStep />} path='/resep/:id/step' />
        <Route element={<TentangKami />} path='/tentang-kami' />
        <Route element={<Testimoni />} path='/testimoni' />
        <Route element={<Beranda />} path='*' />
      </Route>
      {/* <Route element={<PrivateRoutes />}>
        <Route element={<AdminDashboard />} path='/admin/v1/dashboard' />
        <Route element={<AdminFAQ />} path='/admin/v1/faq' />
        <Route element={<AdminFAQDetail />} path='/admin/v1/faq/detail' />
        <Route element={<AdminProduct />} path='/admin/v1/products' />
        <Route element={<AdminProductDetail />} path='/admin/v1/products/detail' />
        <Route element={<AdminRecipe />} path='/admin/v1/recipes' />
        <Route element={<AdminRecipeDetail />} path='/admin/v1/recipes/detail' />
        <Route element={<AdminPromo />} path='/admin/v1/promos' />
        <Route element={<AdminPromoDetail />} path='/admin/v1/promos/detail' />
        <Route element={<AdminTestimonial />} path='/admin/v1/testimonials' />
        <Route element={<AdminTestimonialDetail />} path='/admin/v1/testimonials/detail' />
        <Route element={<AdminExpedition />} path='/admin/v1/expeditions' />
        <Route element={<AdminExpeditionDetail />} path='/admin/v1/expeditions/detail' />
        <Route element={<AdminCompany />} path='/admin/v1/company' />
        <Route element={<AdminContent />} path='/admin/v1/contents' />
        <Route element={<AdminContentBeranda />} path='/admin/v1/contents/beranda' />
      </Route>
      <Route element={<CustomRoutes />}>
        <Route element={<Login />} path='/admin/v1/login' />
        <Route element={<ChangePassword />} path='/admin/v1/change-password' />
      </Route> */}
    </Routes>
  )
}

export default MainRoutes;