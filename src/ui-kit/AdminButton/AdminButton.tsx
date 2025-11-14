import React from 'react';

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  color?: 'main' | 'secondary' | 'destructive';
  disabled?: boolean;
  className?: string;
}

/**
 * A reusable button component with different color styles, including an outlined secondary style.
 */
const AdminButton: React.FC<ButtonProps> = ({ onClick, children, color = 'main', disabled = false, className }) => {
  let colorClasses;

  // Determine the color and hover styles based on the 'color' prop
  switch (color) {
    case 'main':
      // Primary action style
      colorClasses = 'bg-sky-500 hover:bg-sky-600 text-white focus:ring-sky-500';
      break;
    case 'secondary':
      // Secondary action style: White background with gray border and text
      colorClasses = 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 focus:ring-slate-400';
      break;
    case 'destructive':
      // Destructive action style
      colorClasses = 'bg-red-500 hover:bg-red-600 text-white focus:ring-red-500';
      break;
    default:
      // Fallback style
      colorClasses = 'bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-300';
  }

  // Combine general styling with specific color and disabled states
  const buttonClasses = `
    ${className} 
    w-fit 
    h-fit
    px-4 
    py-2 
    rounded-md 
    font-semibold 
    transition-colors 
    duration-150 
    focus:outline-none 
    focus:ring-2 
    focus:ring-opacity-75 
    ${colorClasses} 
    ${disabled ? 'opacity-50 cursor-not-allowed shadow-none' : 'shadow-md hover:shadow-lg'}
    cursor-pointer
  `;

  return (
    <button onClick={onClick} className={buttonClasses} disabled={disabled}>
      {children}
    </button>
  );
};

export default AdminButton
