import { useState } from 'react';
import './ProdukKatalog.scss';
import Info from '../../assets/Logo/Info.svg';
import KatalogBackground from '../../assets/Image/ProdukKatalog/KatalogBackground.jpg';

type TProdukKatalog = {
  image: string,
  // Small WebP copy from the API; null for images uploaded before thumbnails existed.
  thumbnail?: string | null,
  // Cards in the first row load right away instead of waiting for lazy loading.
  priority?: boolean,
  name: string,
  color: string,
  onClick?: (event: React.MouseEvent) => void
}

const ProdukKatalog = ({
  image,
  thumbnail,
  priority = false,
  name,
  color,
  onClick
}: TProdukKatalog) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [thumbnailFailed, setThumbnailFailed] = useState(false);
  const src = thumbnail && !thumbnailFailed ? thumbnail : image;

  const handleImageError = () => {
    // A missing thumbnail falls back to the full image instead of showing nothing.
    if (src !== image) {
      setThumbnailFailed(true);
      return;
    }
    setImageLoaded(true);
  };

  return (
    <div className='relative produk-katalog w-[150px] md:w-[200px] rounded-2xl overflow-hidden' onClick={onClick} style={{ background: color }}>
      <img className='absolute w-full h-full z-1 top-0 rounded-2xl pattern' src={KatalogBackground} loading="lazy" />
      {/* Full card width: this box was wider than the card on desktop (208px vs 200px), which
          pushed opaque product images (e.g. posters) 4px past the card's right edge. */}
      <div className='w-full h-42 md:h-56 mx-auto flex items-center justify-center'>
        {!imageLoaded && (
          <div className='absolute inset-0 flex items-center justify-center z-10'>
            <div className='w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin' />
          </div>
        )}
        <img
          src={src}
          alt={name}
          className={`relative mx-auto w-34 md:w-50 z-2 transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding="async"
          onLoad={() => setImageLoaded(true)}
          onError={handleImageError}
        />
      </div>
      <img className='absolute w-6 h-6 top-4 right-4 z-4' src={Info} />
      <div className='absolute z-5 w-full h-fit bottom-0'>
        <div className='absolute produk-katalog-text-bg z-5 w-full h-full bottom-0 opacity-80 rounded-b-2xl'></div>
        <div className='relative flex text-sm md:text-base font-semibold gradient-gold gradient-gold-line z-6'>RASA</div>
        <div className='px-2 md:px-5 pb-3 font-bold text-[15px] md:text-lg text-white z-6 relative'>{name}</div>
      </div>
    </div>
  )
}

export default ProdukKatalog;