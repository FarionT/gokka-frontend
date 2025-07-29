import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectCoverflow } from 'swiper/modules'; // Import necessary modules

import './ProdukSwiper.scss'; // We'll create this CSS file

// Dummy data for your products
const products = [
  {
    id: 1,
    mainImage: 'path/to/gokka_avocado_main.png', // Main large image for this slide
    previewImage: 'path/to/gokka_avocado_small.png', // Small preview if needed elsewhere, or just the main image used for previews
    title: 'Sirup Alpukat',
    volume: '630 ML',
    backgroundColor: '#388E3C', // A base green, will blend with pattern
    backgroundPattern: 'url(path/to/green_pattern.svg)', // Example pattern, or use the one from your image
    backgroundGradient: 'linear-gradient(to right, #388E3C, #8BC34A)' // Example gradient
  },
  {
    id: 2,
    mainImage: 'path/to/gokka_another_flavor_main.png',
    previewImage: 'path/to/gokka_another_flavor_small.png',
    title: 'Sirup Mangga',
    volume: '630 ML',
    backgroundColor: '#FFC107',
    backgroundPattern: 'url(path/to/yellow_pattern.svg)',
    backgroundGradient: 'linear-gradient(to right, #FFC107, #FFEB3B)'
  },
  {
    id: 3,
    mainImage: 'path/to/gokka_third_flavor_main.png',
    previewImage: 'path/to/gokka_third_flavor_small.png',
    title: 'Sirup Markisa',
    volume: '630 ML',
    backgroundColor: '#9C27B0',
    backgroundPattern: 'url(path/to/purple_pattern.svg)',
    backgroundGradient: 'linear-gradient(to right, #9C27B0, #E040FB)'
  },
  {
    id: 4,
    mainImage: 'path/to/gokka_fourth_flavor_main.png',
    previewImage: 'path/to/gokka_fourth_flavor_small.png',
    title: 'Sirup Lychee',
    volume: '630 ML',
    backgroundColor: '#00BCD4',
    backgroundPattern: 'url(path/to/blue_pattern.svg)',
    backgroundGradient: 'linear-gradient(to right, #00BCD4, #4DD0E1)'
  },
  {
    id: 5,
    mainImage: 'path/to/gokka_fifth_flavor_main.png',
    previewImage: 'path/to/gokka_fifth_flavor_small.png',
    title: 'Sirup Coffee',
    volume: '630 ML',
    backgroundColor: '#795548',
    backgroundPattern: 'url(path/to/brown_pattern.svg)',
    backgroundGradient: 'linear-gradient(to right, #795548, #A1887F)'
  },
];

const ProdukSwiper = () => {
return (
    <div className="product-slider-container">
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        // Ensure exactly 3 slides are shown at once for the 1-center-1 layout
        // For smaller screens, we adjust this in breakpoints
        slidesPerView={3}
        // Space between slides, crucial for side item visibility. Adjust as needed.
        spaceBetween={-150} // Negative space to make them closer, or positive to push apart
        coverflowEffect={{
          rotate: 0, // No rotation
          stretch: 50, // Positive stretch to slightly separate and show full item
          depth: 100, // Depth for a subtle 3D effect
          modifier: 1,
          slideShadows: false, // Set to true if you want shadows on the side items
        }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        pagination={{ clickable: true }}
        modules={[Navigation, Pagination, EffectCoverflow]}
        className="mySwiper"
        breakpoints={{
          // Only one slide fully visible on very small screens
          320: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          // Two slides (active + one partial side) or more, adjust as needed
          768: {
            slidesPerView: 3, // Keep 3 for tablet/desktop to ensure 1 on each side
            spaceBetween: -100, // Adjust for tablets to maintain visual
          },
          // Three slides: 1 on each side + center for larger screens
          1024: {
            slidesPerView: 3,
            spaceBetween: -150, // Adjust space for larger screens to control side item visibility
          },
        }}
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            {({ isActive }) => (
              <div
                className={`product-slide ${isActive ? 'active-slide' : 'inactive-slide'}`}
                style={{
                  backgroundColor: product.backgroundColor,
                  '--product-bg-color': product.backgroundColor,
                  '--product-bg-pattern': product.backgroundPattern,
                  '--product-bg-gradient': product.backgroundGradient,
                } as React.CSSProperties}
              >
                {isActive ? (
                  <div className="main-product-details">
                    <div className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2">{product.title}</div>
                    <div className="text-lg md:text-xl text-white">{product.volume}</div>
                    <img src={product.mainImage} alt={product.title} className="main-product-image" />
                    {/* Water splash effect can be a CSS background or a separate image */}
                    <div className="water-splash"></div>
                  </div>
                ) : (
                  // Inactive slides only show the preview image
                  <img src={product.previewImage || product.mainImage} alt={product.title} className="preview-product-image" />
                )}
              </div>
            )}
          </SwiperSlide>
        ))}

        {/* Custom Navigation Arrows */}
        <div className="swiper-button-prev left-arrow"></div>
        <div className="swiper-button-next right-arrow"></div>
      </Swiper>
       {/* Global close button (top right of the whole section) */}
      <button className="global-close-button">X</button>
    </div>
  );
}

export default ProdukSwiper;