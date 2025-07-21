import { Route, Routes } from 'react-router';
import { 
  Beranda, 
  FAQ, 
  Produk, 
  Resep, 
  ResepDetail, 
  ResepStep, 
  TentangKami, 
  Testimoni
} from '../page';

const MainRoutes = () => {
  return (
    <Routes>
      <Route element={<Beranda />} path='/' />
      <Route element={<FAQ />} path='/faq' />
      <Route element={<Produk />} path='/produk' />
      <Route element={<Resep />} path='/resep' />
      <Route element={<ResepDetail />} path='/resep/:id' />
      <Route element={<ResepStep />} path='/resep/:id/step' />
      <Route element={<TentangKami />} path='/tentang-kami' />
      <Route element={<Testimoni />} path='/testimoni' />
      <Route element={<Beranda />} path='*' />
    </Routes>
  )
}

export default MainRoutes;