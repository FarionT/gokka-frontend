import { Route, Routes } from 'react-router';
import { 
  Beranda, 
  FAQ, 
  Produk, 
  Resep 
} from '../page';

const MainRoutes = () => {
  return (
    <Routes>
      <Route element={<Beranda />} path='/' />
      <Route element={<FAQ />} path='/faq' />
      <Route element={<Produk />} path='/produk' />
      <Route element={<Resep />} path='/resep' />
    </Routes>
  )
}

export default MainRoutes;