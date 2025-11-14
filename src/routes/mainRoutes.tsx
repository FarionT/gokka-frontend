import { Route, Routes } from 'react-router';
import { 
  AdminDashboard,
  AdminFAQ,
  AdminFAQDetail,
  AdminProduct,
  AdminProductDetail,
  AdminPromo,
  AdminPromoDetail,
  AdminRecipe,
  AdminRecipeDetail,
  Beranda, 
  ChangePassword, 
  FAQ, 
  Login, 
  Produk, 
  Resep, 
  ResepDetail, 
  ResepStep, 
  TentangKami, 
  Testimoni
} from '../page';
import PublicRoutes from './publicRoutes';
import PrivateRoutes from './privateRoutes';
import CustomRoutes from './customRoutes';

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
      <Route element={<PrivateRoutes />}>
        <Route element={<AdminDashboard />} path='/admin/v1/dashboard' />
        <Route element={<AdminFAQ />} path='/admin/v1/faq' />
        <Route element={<AdminFAQDetail />} path='/admin/v1/faq/detail' />
        <Route element={<AdminProduct />} path='/admin/v1/products' />
        <Route element={<AdminProductDetail />} path='/admin/v1/products/detail' />
        <Route element={<AdminRecipe />} path='/admin/v1/recipes' />
        <Route element={<AdminRecipeDetail />} path='/admin/v1/recipes/detail' />
        <Route element={<AdminPromo />} path='/admin/v1/promos' />
        <Route element={<AdminPromoDetail />} path='/admin/v1/promos/detail' />
      </Route>
      <Route element={<CustomRoutes />}>
        <Route element={<Login />} path='/admin/v1/login' />
        <Route element={<ChangePassword />} path='/admin/v1/change-password' />
      </Route>
    </Routes>
  )
}

export default MainRoutes;