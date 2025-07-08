import { Route, Routes } from 'react-router';
import { 
  Beranda, 
  Resep 
} from '../page';

const MainRoutes = () => {
  return (
    <Routes>
      <Route element={<Beranda />} path='/' />
      <Route element={<Resep />} path='/resep' />
    </Routes>
  )
}

export default MainRoutes;