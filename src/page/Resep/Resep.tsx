import { Carousel } from '../../ui-kit';
import type { ReactNode } from 'react';
import './Resep.scss';

interface CarouselItem {
	id: number;
	content: ReactNode;
}

const Resep = () => {
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
		<div>
			<Carousel items={carouselItems} />
		</div>
	)
}

export default Resep;