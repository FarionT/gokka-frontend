import { Route, Routes } from 'react-router';
import { Beranda } from '../page';

const MainRoutes = () => {
  return (
    <Routes>
      <Route element={<Beranda />} path='/' />
    </Routes>
  )
}

export default MainRoutes;