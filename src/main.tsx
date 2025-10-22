import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'swiper/swiper-bundle.css'
import { ToastContainer } from "react-toastify";
// import 'swiper/css';
import App from './App.tsx'
import { BrowserRouter } from 'react-router'
import { LoaderProvider } from './utils/loaderContext.tsx';

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
    <BrowserRouter>
      <LoaderProvider>
        <App />
        <ToastContainer />
      </LoaderProvider>
    </BrowserRouter>
  // </StrictMode>,
)
