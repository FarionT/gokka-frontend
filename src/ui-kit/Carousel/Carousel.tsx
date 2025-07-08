import React, { useState, useEffect, useRef, useCallback } from 'react';
import type { FC, ReactNode, MouseEvent, TouchEvent } from 'react';

// Define interface for a carousel item
interface CarouselItem {
  id: number;
  content: ReactNode;
}

// Define interface for Carousel component props
interface CarouselProps {
  items: CarouselItem[];
}

// Main App component to demonstrate the Carousel
const CarouselContainer: FC = () => {
  const carouselItems: CarouselItem[] = [
    { id: 1, content: <div className="p-6 bg-blue-500 text-white text-center rounded-lg shadow-md">Item 1: Blue</div> },
    { id: 2, content: <div className="p-6 bg-green-500 text-white text-center rounded-lg shadow-md">Item 2: Green</div> },
    { id: 3, content: <div className="p-6 bg-red-500 text-white text-center rounded-lg shadow-md">Item 3: Red</div> },
    { id: 4, content: <div className="p-6 bg-yellow-500 text-white text-center rounded-lg shadow-md">Item 4: Yellow</div> },
    { id: 5, content: <div className="p-6 bg-purple-500 text-white text-center rounded-lg shadow-md">Item 5: Purple</div> },
    { id: 6, content: <div className="p-6 bg-indigo-500 text-white text-center rounded-lg shadow-md">Item 6: Indigo</div> },
    { id: 7, content: <div className="p-6 bg-pink-500 text-white text-center rounded-lg shadow-md">Item 7: Pink</div> },
    { id: 8, content: <div className="p-6 bg-teal-500 text-white text-center rounded-lg shadow-md">Item 8: Teal</div> },
  ];

  return (
    <div className="min-h-screen bg-gray-100 font-sans flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Responsive React Carousel</h1>
        <CarouselLayout items={carouselItems} />
      </div>
    </div>
  );
}

// Carousel Component
const Carousel: FC<CarouselProps> = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [itemsPerPage, setItemsPerPage] = useState<number>(3); // Default for large screens
  const carouselRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef<boolean>(false);
  const startPos = useRef<number>(0);
  const currentTranslate = useRef<number>(0);
  const prevTranslate = useRef<number>(0);
  const animationFrameId = useRef<number | null>(null);

  // Calculate total number of pages based on items and itemsPerPage
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const maxIndex = Math.max(0, items.length - itemsPerPage);

  // Adjust itemsPerPage based on screen width
  const updateItemsPerPage = useCallback(() => {
    if (window.innerWidth >= 1024) { // lg breakpoint
      setItemsPerPage(3);
    } else if (window.innerWidth >= 768) { // md breakpoint
      setItemsPerPage(2);
    } else { // sm and below
      setItemsPerPage(1);
    }
  }, []);

  useEffect(() => {
    updateItemsPerPage(); // Set initial items per page
    window.addEventListener('resize', updateItemsPerPage);

    // Clean up event listener
    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, [updateItemsPerPage]);

  // Ensure currentIndex doesn't exceed the bounds when itemsPerPage changes
  useEffect(() => {
    setCurrentIndex(prevIndex => Math.min(prevIndex, maxIndex));
  }, [itemsPerPage, maxIndex]);

  // Navigation handlers
  const goToNext = useCallback(() => {
    setCurrentIndex(prevIndex => Math.min(prevIndex + 1, maxIndex));
  }, [maxIndex]);

  const goToPrev = useCallback(() => {
    setCurrentIndex(prevIndex => Math.max(prevIndex - 1, 0));
  }, []);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(Math.min(index * itemsPerPage, maxIndex));
  }, [itemsPerPage, maxIndex]);

  // Touch/Mouse event handlers for swiping
  const getPositionX = useCallback((event: MouseEvent | TouchEvent): number => {
    return (event as MouseEvent).pageX || (event as TouchEvent).touches[0].clientX;
  }, []);

  const setSliderPosition = useCallback(() => {
    if (carouselRef.current) {
      carouselRef.current.style.transform = `translateX(${currentTranslate.current}px)`;
    }
  }, []);

  const animation = useCallback(() => {
    setSliderPosition();
    if (isDragging.current) {
      animationFrameId.current = requestAnimationFrame(animation);
    }
  }, [setSliderPosition]);

  const touchStart = useCallback((event: MouseEvent | TouchEvent) => {
    isDragging.current = true;
    startPos.current = getPositionX(event);
    if (carouselRef.current) {
      carouselRef.current.style.transition = 'none'; // Disable transition during drag
    }
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current); // Stop any ongoing animation
    }
  }, [getPositionX]);

  const touchMove = useCallback((event: MouseEvent | TouchEvent) => {
    if (!isDragging.current) return;
    const currentPosition = getPositionX(event);
    currentTranslate.current = prevTranslate.current + currentPosition - startPos.current;
    animationFrameId.current = requestAnimationFrame(animation);
  }, [getPositionX, animation]);

  const touchEnd = useCallback(() => {
    isDragging.current = false;
    if (carouselRef.current) {
      carouselRef.current.style.transition = 'transform 0.3s ease-out'; // Re-enable transition
    }

    const movedBy = currentTranslate.current - prevTranslate.current;
    const carouselWidth = carouselRef.current?.offsetWidth || 0;
    const itemWidth = carouselWidth / itemsPerPage;
    const threshold = itemWidth / 4; // Move to next/prev if dragged more than 1/4 of an item width

    if (movedBy < -threshold && currentIndex < maxIndex) {
      goToNext();
    } else if (movedBy > threshold && currentIndex > 0) {
      goToPrev();
    } else {
      // Snap back to current slide if not enough movement
      currentTranslate.current = -currentIndex * itemWidth;
      setSliderPosition();
    }

    prevTranslate.current = currentTranslate.current;
  }, [currentIndex, maxIndex, itemsPerPage, goToNext, goToPrev, setSliderPosition]);

  const touchCancel = useCallback(() => {
    isDragging.current = false;
    if (carouselRef.current) {
      carouselRef.current.style.transition = 'transform 0.3s ease-out';
    }
    // Snap back to current slide
    const carouselWidth = carouselRef.current?.offsetWidth || 0;
    const itemWidth = carouselWidth / itemsPerPage;
    currentTranslate.current = -currentIndex * itemWidth;
    setSliderPosition();
    prevTranslate.current = currentTranslate.current;
  }, [currentIndex, itemsPerPage, setSliderPosition]);

  // Update transform when currentIndex or itemsPerPage changes
  useEffect(() => {
    if (carouselRef.current) {
      const carouselWidth = carouselRef.current.offsetWidth;
      const itemWidth = carouselWidth / itemsPerPage;
      currentTranslate.current = -currentIndex * itemWidth;
      prevTranslate.current = currentTranslate.current; // Keep prevTranslate in sync
      setSliderPosition();
    }
  }, [currentIndex, itemsPerPage, setSliderPosition]);

  // Calculate the transform style for the carousel track
  const transformStyle: React.CSSProperties = {
    transform: `translateX(${currentTranslate.current}px)`,
    transition: 'transform 0.3s ease-out', // Default transition
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="relative w-full overflow-hidden rounded-xl shadow-xl bg-white p-4">
          {/* Carousel Track */}
          <div
            className="flex cursor-grab active:cursor-grabbing"
            ref={carouselRef}
            style={transformStyle}
            onMouseDown={touchStart}
            onMouseMove={touchMove}
            onMouseUp={touchEnd}
            onMouseLeave={touchEnd} // End drag if mouse leaves the area
            onTouchStart={touchStart}
            onTouchMove={touchMove}
            onTouchEnd={touchEnd}
            onTouchCancel={touchCancel}
          >
            {items.map((item: CarouselItem) => (
              <div
                key={item.id}
                className="flex-shrink-0 p-2"
                onClick={() => console.log(item.id)}
                style={{ width: `${100 / itemsPerPage}%` }} // Distribute width evenly
              >
                {item.content}
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          {currentIndex > 0 && (
            <button
              onClick={goToPrev}
              className="absolute top-1/2 left-4 -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full shadow-lg hover:bg-opacity-75 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-75"
              aria-label="Previous slide"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
            </button>
          )}
          {currentIndex < maxIndex && (
            <button
              onClick={goToNext}
              className="absolute top-1/2 right-4 -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full shadow-lg hover:bg-opacity-75 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-75"
              aria-label="Next slide"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
            </button>
          )}

          {/* Pagination Bullets */}
          <div className="flex justify-center mt-6 space-x-2">
            {Array.from({ length: totalPages }).map((_, pageIndex: number) => (
              <button
                key={pageIndex}
                onClick={() => goToSlide(pageIndex)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  pageIndex === Math.floor(currentIndex / itemsPerPage)
                    ? 'bg-blue-600 w-5' // Active bullet is wider
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide page ${pageIndex + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;