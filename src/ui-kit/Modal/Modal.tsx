import { useEffect, useRef } from "react";
import type { FC, ReactNode } from "react";

declare module "react" {
  interface CSSProperties {
    "--tw-shadow"?: string;
    "--tw-shadow-color"?: string;
  }
}

// Define the props interface for the Modal component
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode; // children can be any valid React node
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Effect to handle clicks outside the modal and ESC key press
  useEffect(() => {
    // Handle clicks outside the modal content
    const handleClickOutside = (event: MouseEvent) => {
      // If the modal is open and the click is outside the modal content area
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose(); // Close the modal
      }
    };

    // Handle ESC key press
    // const handleEscapeKey = (event: KeyboardEvent) => {
    //   if (event.key === "Escape") {
    //     onClose(); // Close the modal
    //   }
    // };

    // Add event listeners when the modal is open
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("mousedown", handleClickOutside);
      // document.addEventListener("keydown", handleEscapeKey);
    } else {
      document.body.style.overflow = "";
    }

    // Clean up event listeners when the component unmounts or modal closes
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      // document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen, onClose]); // Re-run effect when isOpen or onClose changes

  // If the modal is not open, don't render anything
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-30 bg-black opacity-50 w-full h-full"></div>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4bg-opacity-50 font-sans">
        <div
          ref={modalRef} // Attach ref to the modal content container
          className="relative bg-white rounded-xl shadow-2xl max-w-lg w-full mx-auto transform transition-all duration-300 ease-out
                    sm:max-w-xl md:max-w-2xl lg:max-w-3xl
                    scale-95 opacity-0 animate-scale-in" // Initial state for animation
          // Add animation keyframes for scale-in
          style={{
            animation: "scale-in 0.3s forwards",
            "--tw-shadow": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
            "--tw-shadow-color": "rgb(0 0 0 / 0.05)",
          }}
        >
          {/* Render the children passed to the Modal component */}
          {children}
        </div>

        {/* Tailwind CSS custom animation for the modal entry */}
        <style>{`
          @keyframes scale-in {
            from {
              transform: scale(0.95);
              opacity: 0;
            }
            to {
              transform: scale(1);
              opacity: 1;
            }
          }
        `}</style>
      </div>
    </>
  );
};

export default Modal;
