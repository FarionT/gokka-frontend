import React, { type FC, type ReactNode, useState, useEffect, useRef, useCallback } from 'react';

// Define the props for the Carousel component
interface CarouselProps {
  /**
   * The content (slides) to be displayed in the carousel. Each direct child will be treated as a carousel item.
   */
  children: ReactNode;
  /**
   * The number of items to show per slide. Defaults to 1.
   * If the total number of items is less than or equal to itemsPerPage, navigation buttons and pagination will be hidden.
   */
  itemsPerPage?: number;
}

const Carousel: FC<CarouselProps> = ({ children, itemsPerPage = 1 }) => {
  // Define the pixel value for the gap (e.g., Tailwind's gap-4 is 16px)
  const GAP_PX = 16; 

  // Convert children to an array to easily iterate and count
  const allItems = React.Children.toArray(children);
  const totalItems = allItems.length;

  // Ref for the inner div that holds all carousel items and gets translated
  const carouselTrackRef = useRef<HTMLDivElement>(null);

  // State for the current slide index. This is the index of the first visible item in the current "page".
  const [currentIndex, setCurrentIndex] = useState(0);

  // States for drag/swipe functionality
  const [isDragging, setIsDragging] = useState(false); // True when a drag operation is active
  const [startX, setStartX] = useState(0); // X-coordinate where the drag started
  const [currentTranslate, setCurrentTranslate] = useState(0); // The current translateX value in pixels
  // This stores the translation value at the beginning of a drag,
  // used to calculate the new currentTranslate during dragMove
  const [prevTranslateWhileDragging, setPrevTranslateWhileDragging] = useState(0);
  // Controls CSS transition for smooth snapping back or moving to a new slide
  const [activeTransition, setActiveTransition] = useState(true);

  // Calculate total pages for pagination based on total items and items per slide
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Calculate the current page index for bullet pagination highlighting
  const currentPage = Math.floor(currentIndex / itemsPerPage);

  // Helper function to get the width of the visible carousel area (viewport)
  // This is the width of the parent element of the carouselTrackRef
  const getCarouselViewportWidth = useCallback(() => {
    // The parentElement of carouselTrackRef is the overflow-hidden div.
    // We subtract the overall carousel padding (p-4 = 16px left + 16px right = 32px)
    // from the parent's width to get the effective inner width for items.
    return (carouselTrackRef.current?.parentElement?.offsetWidth || 0) - (GAP_PX * 2);
  }, []);

  // Calculate the effective width of each item slot, considering gaps
  // This is the width of the content area for a single item.
  const getItemSlotWidth = useCallback(() => {
    const viewportWidth = getCarouselViewportWidth();
    if (itemsPerPage <= 0) return 0; // Avoid division by zero
    // Calculate total gap space for the items on one page
    const totalGapWidthOnPage = (itemsPerPage > 1 ? (itemsPerPage - 1) * GAP_PX : 0);
    // Distribute the remaining width among the items
    return (viewportWidth - totalGapWidthOnPage) / itemsPerPage;
  }, [getCarouselViewportWidth, itemsPerPage]);


  /**
   * Navigates to the next set of items.
   * If at the end, it wraps around to the first slide.
   */
  const handleNext = useCallback(() => {
    setActiveTransition(true); // Enable transition for smooth movement
    setCurrentIndex(prevIndex => {
      // Calculate the next index. If it would go beyond the total items (or the last full page),
      // wrap around to the first item (index 0).
      if (prevIndex + itemsPerPage >= totalItems) {
        return 0; // Go back to the first slide
      }
      return prevIndex + itemsPerPage; // Move forward by itemsPerPage
    });
  }, [itemsPerPage, totalItems]);

  /**
   * Navigates to the previous set of items.
   * If at the beginning, it wraps around to the last slide (aligned right).
   */
  const handlePrev = useCallback(() => {
    setActiveTransition(true); // Enable transition for smooth movement
    setCurrentIndex(prevIndex => {
      if (prevIndex - itemsPerPage < 0) {
        // When looping back from the start, go to the last page.
        // We set the currentIndex to the beginning of the last "logical" page.
        // The useEffect will then correctly position this last page, aligning the last item to the right.
        return Math.max(0, (totalPages - 1) * itemsPerPage);
      }
      return prevIndex - itemsPerPage; // Move backward by itemsPerPage
    });
  }, [itemsPerPage, totalItems, totalPages]);


  /**
   * Navigates to a specific slide based on its page index (for pagination dots).
   * @param pageIndex The index of the page (0-based) to navigate to.
   */
  const goToSlide = useCallback((pageIndex: number) => {
    setActiveTransition(true); // Enable transition
    setCurrentIndex(pageIndex * itemsPerPage); // Calculate the starting item index for the given page
  }, [itemsPerPage]);

  /**
   * Handles the start of a drag/swipe gesture (mousedown or touchstart).
   * Disables CSS transitions during drag for immediate visual feedback.
   */
  const handleDragStart = useCallback((event: MouseEvent | TouchEvent) => {
    // Only enable dragging if there are more items than can fit on one page
    if (totalItems <= itemsPerPage) return;

    setIsDragging(true); // Set dragging state to true
    setActiveTransition(false); // Disable transition to allow instant movement during drag

    // Capture the starting X coordinate based on mouse or touch event
    if (event.type === 'mousedown') {
      setStartX((event as MouseEvent).clientX);
    } else {
      setStartX((event as TouchEvent).touches[0].clientX);
    }
    // Store the current translation value, which will be the base for drag movements
    setPrevTranslateWhileDragging(currentTranslate);
  }, [currentTranslate, itemsPerPage, totalItems]);

  /**
   * Handles the movement during a drag/swipe gesture (mousemove or touchmove).
   * Updates the current translation based on the drag distance.
   */
  const handleDragMove = useCallback((event: MouseEvent | TouchEvent) => {
    if (!isDragging) return; // Only proceed if dragging is active

    let clientX: number;
    if (event.type === 'mousemove') {
      clientX = (event as MouseEvent).clientX;
    } else {
      clientX = (event as TouchEvent).touches[0].clientX;
    }

    const diff = clientX - startX; // Calculate the horizontal difference from the start of the drag
    setCurrentTranslate(prevTranslateWhileDragging + diff); // Update the carousel's translation
  }, [isDragging, startX, prevTranslateWhileDragging]);

  /**
   * Handles the end of a drag/swipe gesture (mouseup or touchend).
   * Determines if a swipe occurred and triggers next/previous slide navigation,
   * or snaps back to the current slide.
   */
  const handleDragEnd = useCallback(() => {
    setIsDragging(false); // End dragging state
    setActiveTransition(true); // Re-enable transition for snapping or moving to a new slide

    if (!carouselTrackRef.current) return;

    const itemSlotWidth = getItemSlotWidth();
    // Calculate the width of one "step" including the item and its trailing gap
    const stepWidth = itemSlotWidth + GAP_PX;

    // Calculate the intended 'resting' translation based on currentIndex
    // This is the ideal translation if we were to snap directly to the left-aligned item.
    const currentLogicalTargetTranslation = -currentIndex * stepWidth;

    // Calculate the total distance dragged from the intended resting position
    const dragDistance = currentTranslate - currentLogicalTargetTranslation;
    // Define a threshold (e.g., 20% of an item's content width) to consider it a valid swipe
    const swipeThreshold = itemSlotWidth * 0.2;

    if (dragDistance < -swipeThreshold) { // If swiped left enough (negative dragDistance means moved left)
      handleNext(); // Move to the next slide
    } else if (dragDistance > swipeThreshold) { // If swiped right enough (positive dragDistance means moved right)
      handlePrev(); // Move to the previous slide
    } else {
      // If not enough swipe to change slides, snap back to the logical position.
      // Recalculate the target translation to ensure perfect alignment after a drag,
      // using the same logic as the main useEffect for consistency.
      const viewportWidth = getCarouselViewportWidth();
      let finalTargetTranslation: number;
      const isLastPageEffective = currentIndex + itemsPerPage >= totalItems;

      if (totalItems > itemsPerPage && isLastPageEffective) {
        const totalItemsContentWidth = totalItems * itemSlotWidth;
        const totalGapsWidth = (totalItems - 1) * GAP_PX;
        finalTargetTranslation = -(totalItemsContentWidth + totalGapsWidth - viewportWidth);
        if (finalTargetTranslation > 0) finalTargetTranslation = 0; // Prevent positive translation
      } else {
        finalTargetTranslation = -currentIndex * stepWidth;
        if (finalTargetTranslation > 0) finalTargetTranslation = 0; // Prevent positive translation
      }
      setCurrentTranslate(finalTargetTranslation);
    }
  }, [currentTranslate, currentIndex, itemsPerPage, handleNext, handlePrev, getItemSlotWidth, getCarouselViewportWidth, totalItems]);

  /**
   * This effect synchronizes the visual position (currentTranslate) with the logical slide index (currentIndex).
   * It ensures the carousel snaps to the correct position after a button click,
   * a successful swipe, or when `itemsPerPage` changes.
   * This is where the left/right alignment logic is applied.
   */
  useEffect(() => {
    if (carouselTrackRef.current && !isDragging) { // Only update if not actively dragging
      const viewportWidth = getCarouselViewportWidth();
      const itemSlotWidth = getItemSlotWidth(); // Width of content area of one item
      const stepWidth = itemSlotWidth + GAP_PX; // Width of one item slot including its trailing gap

      let targetTranslation: number;

      // Determine if we are on the "last page" where items might not fill all slots,
      // and thus the last item should align to the right.
      // This condition is true if the current index would cause us to display items
      // that include or go beyond the total number of items.
      const isLastPageEffective = currentIndex + itemsPerPage >= totalItems;

      if (totalItems > itemsPerPage && isLastPageEffective) {
        // Calculate total track width including items and all gaps
        const totalItemsContentWidth = totalItems * itemSlotWidth;
        // There is one less gap than items IF items > 0. If 0 or 1 item, no gaps.
        const totalGapsWidth = (totalItems > 0 ? (totalItems - 1) * GAP_PX : 0);

        // The translation needed to position the last item flush right within the viewport.
        // It's the negative of (total width of items + total gaps - viewport width).
        targetTranslation = -(totalItemsContentWidth + totalGapsWidth - viewportWidth);

        // Ensure targetTranslation doesn't become positive (i.e., we don't shift right of the start)
        // This is important for cases where total items fit perfectly or fewer items than itemsPerPage,
        // preventing accidental shift to the right.
        if (targetTranslation > 0) {
          targetTranslation = 0;
        }
      } else {
        // For any other page, simply align the first item of the current slide to the left edge.
        // The translation is based on the current index * (item slot width + gap width)
        targetTranslation = -currentIndex * stepWidth;
        // Ensure first item is always at 0 or negative
        if (targetTranslation > 0) targetTranslation = 0;
      }
      setCurrentTranslate(targetTranslation);
    }
  }, [currentIndex, itemsPerPage, isDragging, totalItems, getCarouselViewportWidth, getItemSlotWidth]);


  /**
   * Effect to attach and clean up global event listeners for drag/swipe.
   * Listeners for `mousemove`/`touchmove` and `mouseup`/`touchend` are attached to `window`
   * to ensure dragging continues even if the pointer leaves the carousel element.
   */
  useEffect(() => {
    const trackElement = carouselTrackRef.current;
    if (trackElement) {
      // Attach start events to the carousel track itself
      // The type casting is important here to ensure TypeScript knows these are DOM events
      trackElement.addEventListener('mousedown', handleDragStart as EventListener);
      trackElement.addEventListener('touchstart', handleDragStart as EventListener);

      // Attach move and end events globally to window
      window.addEventListener('mousemove', handleDragMove as EventListener);
      window.addEventListener('touchmove', handleDragMove as EventListener);
      window.addEventListener('mouseup', handleDragEnd as EventListener);
      window.addEventListener('touchend', handleDragEnd as EventListener);

      // Clean up event listeners when the component unmounts or dependencies change
      return () => {
        trackElement.removeEventListener('mousedown', handleDragStart as EventListener);
        trackElement.removeEventListener('touchstart', handleDragStart as EventListener);
        window.removeEventListener('mousemove', handleDragMove as EventListener);
        window.removeEventListener('touchmove', handleDragMove as EventListener);
        window.removeEventListener('mouseup', handleDragEnd as EventListener);
        window.removeEventListener('touchend', handleDragEnd as EventListener);
      };
    }
  }, [handleDragStart, handleDragMove, handleDragEnd]);


  return (
    <div className="relative w-full overflow-hidden rounded-xl bg-gray-100 shadow-lg p-4"> {/* Added p-4 here for overall carousel padding */}
      {/* Outer container for the visible carousel viewport */}
      <div className="overflow-hidden">
        {/* The inner div that contains all items and gets translated for scrolling */}
        <div
          ref={carouselTrackRef}
          className={`flex ${activeTransition ? 'transition-transform duration-300 ease-in-out' : ''} ${totalItems > itemsPerPage ? 'cursor-grab active:cursor-grabbing' : ''} gap-x-4`} /* Added gap-x-4 here */
          style={{
            // Set the width of the track to accommodate all items plus all gaps between them.
            // Each item takes 'getItemSlotWidth()' space. There are 'totalItems - 1' gaps.
            width: `${(getItemSlotWidth() * totalItems) + (totalItems > 0 ? (totalItems - 1) * GAP_PX : 0)}px`,
            transform: `translateX(${currentTranslate}px)`,
          }}
        >
          {allItems.map((child, index) => (
            <div
              key={index}
              className="flex-shrink-0" // Removed p-4 from here
              style={{
                width: `${getItemSlotWidth()}px` // Set explicit pixel width for each item's content area
              }}
            >
              {child}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons (visible only if there are more items than fit on one page) */}
      {totalItems > itemsPerPage && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 transform rounded-full bg-white bg-opacity-75 p-2 text-gray-800 shadow-md hover:bg-opacity-100 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Previous slide"
            style={{ left: `${GAP_PX / 2}px`}} 
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 transform rounded-full bg-white bg-opacity-75 p-2 text-gray-800 shadow-md hover:bg-opacity-100 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Next slide"
            style={{ right: `${GAP_PX / 2}px`}} 
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
        </>
      )}

      {/* Bullet Pagination (visible only if there is more than one page) */}
      {totalPages > 1 && (
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 transform space-x-2">
          {Array.from({ length: totalPages }).map((_, pageIndex) => (
            <button
              key={pageIndex}
              onClick={() => goToSlide(pageIndex)}
              className={`h-3 w-3 rounded-full ${
                currentPage === pageIndex ? 'bg-blue-600' : 'bg-gray-400 hover:bg-gray-500'
              } transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              aria-label={`Go to slide ${pageIndex + 1}`}
            ></button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;

// // App.tsx (for demonstration purposes)
// // You would typically import the Carousel component from its own file.
// // import Carousel from './Carousel'; // Example import if Carousel.tsx is in the same directory

// function App() {
//   const [showCarousel, setShowCarousel] = useState(false);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 p-8 flex flex-col items-center justify-center font-sans">
//       <h1 className="text-4xl font-extrabold text-white mb-8 text-center drop-shadow-lg md:text-5xl">
//         Dynamic React Carousel
//       </h1>
//       <p className="text-white text-lg mb-8 text-center max-w-xl">
//         A customizable and responsive carousel built with React, TypeScript, and Tailwind CSS.
//         It supports showing multiple items per slide, bullet pagination,
//         navigation buttons, and intuitive swipe gestures.
//       </p>

//       <button
//         onClick={() => setShowCarousel(!showCarousel)}
//         className="mb-12 px-8 py-3 bg-white text-indigo-700 font-bold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
//       >
//         {showCarousel ? 'Hide Carousel' : 'Show Carousel'}
//       </button>

//       {showCarousel && (
//         <div className="w-full max-w-5xl"> {/* Increased max-w for a larger carousel */}
//           <Carousel itemsPerPage={3}> {/* Displaying 3 items per slide */}
//             {/* Example Carousel Items - you can put any ReactNode here */}
//             <div className="bg-white p-6 rounded-lg shadow-md h-48 flex items-center justify-center text-center text-2xl font-semibold text-gray-800 transition-transform hover:scale-105">
//               Item 1: Modern UI
//             </div>
//             <div className="bg-white p-6 rounded-lg shadow-md h-48 flex items-center justify-center text-center text-2xl font-semibold text-gray-800 transition-transform hover:scale-105">
//               Item 2: Fully Responsive
//             </div>
//             <div className="bg-white p-6 rounded-lg shadow-md h-48 flex items-center justify-center text-center text-2xl font-semibold text-gray-800 transition-transform hover:scale-105">
//               Item 3: Swipe Enabled
//             </div>
//             <div className="bg-white p-6 rounded-lg shadow-md h-48 flex items-center justify-center text-center text-2xl font-semibold text-gray-800 transition-transform hover:scale-105">
//               Item 4: Custom Content
//             </div>
//             <div className="bg-white p-6 rounded-lg shadow-md h-48 flex items-center justify-center text-center text-2xl font-semibold text-gray-800 transition-transform hover:scale-105">
//               Item 5: Easy to Use
//             </div>
//             <div className="bg-white p-6 rounded-lg shadow-md h-48 flex items-center justify-center text-center text-2xl font-semibold text-gray-800 transition-transform hover:scale-105">
//               Item 6: React & TS
//             </div>
//             <div className="bg-white p-6 rounded-lg shadow-md h-48 flex items-center justify-center text-center text-2xl font-semibold text-gray-800 transition-transform hover:scale-105">
//               Item 7: Tailwind CSS
//             </div>
//             <div className="bg-white p-6 rounded-lg shadow-md h-48 flex items-center justify-center text-center text-2xl font-semibold text-gray-800 transition-transform hover:scale-105">
//               Item 8: Enjoy!
//             </div>
//           </Carousel>

//           <h2 className="text-3xl font-extrabold text-white mt-16 mb-6 text-center drop-shadow-lg">
//             Single Item Carousel Example
//           </h2>
//           <Carousel itemsPerPage={1}> {/* Displaying 1 item per slide */}
//             <div className="bg-white p-8 rounded-lg shadow-md h-64 flex flex-col items-center justify-center text-center text-3xl font-bold text-blue-700">
//               <p className="mb-4">"The only way to do great work is to love what you do."</p>
//               <p className="text-xl">- Steve Jobs</p>
//             </div>
//             <div className="bg-white p-8 rounded-lg shadow-md h-64 flex flex-col items-center justify-center text-center text-3xl font-bold text-green-700">
//               <p className="mb-4">"Innovation distinguishes between a leader and a follower."</p>
//               <p className="text-xl">- Steve Jobs</p>
//             </div>
//             <div className="bg-white p-8 rounded-lg shadow-md h-64 flex flex-col items-center justify-center text-center text-3xl font-bold text-purple-700">
//               <p className="mb-4">"Your time is limited, don't waste it living someone else's life."</p>
//               <p className="text-xl">- Steve Jobs</p>
//             </div>
//           </Carousel>

//         </div>
//       )}
//     </div>
//   );
// }

// export default App;