import { Route, Routes } from 'react-router';
import { 
  Beranda, 
  Produk, 
  Resep 
} from '../page';

const MainRoutes = () => {
  return (
    <Routes>
      <Route element={<Beranda />} path='/' />
      <Route element={<Produk />} path='/produk' />
      <Route element={<Resep />} path='/resep' />
    </Routes>
  )
}

export default MainRoutes;