import { useState } from 'react';
import './Produk.scss';
import { Modal } from '../../ui-kit';

const Produk = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  
  // Function to open the modal
  const openModal = (): void => setIsModalOpen(true);
  // Function to close the modal
  const closeModal = (): void => setIsModalOpen(false);

  return (
    <div>
      <div onClick={openModal}>Test</div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {/* Content for the modal - can be any React node */}
        <div className="p-6 sm:p-8 md:p-10 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Welcome to the Modal!</h2>
          <p className="text-base sm:text-lg text-gray-700 mb-6">
            This is a responsive modal built with React and Tailwind CSS.
            It closes when you click outside or press the ESC key.
          </p>
          <img
            src="https://placehold.co/400x200/ADD8E6/000000?text=Placeholder+Image"
            alt="Placeholder"
            className="w-full h-auto rounded-lg mb-6 shadow-sm"
            onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => { e.currentTarget.onerror = null; e.currentTarget.src="https://placehold.co/400x200/ADD8E6/000000?text=Image+Load+Error"; }}
          />
          <button
            onClick={closeModal}
            className="px-5 py-2 bg-red-500 text-white font-semibold rounded-md shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 transition duration-300 ease-in-out"
          >
            Close Modal
          </button>
        </div>
      </Modal>
    </div>
  )
}

export default Produk;