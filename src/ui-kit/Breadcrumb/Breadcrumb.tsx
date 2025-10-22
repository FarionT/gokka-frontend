import React from 'react';
import { useNavigate } from 'react-router';

// 1. Define the interface for a single breadcrumb item
interface BreadcrumbItem {
  label: string;
  href: string;
}

// 2. Define the props for the main component
interface DynamicBreadcrumbsProps {
  items: BreadcrumbItem[];
}

/**
 * A dynamic breadcrumb component without icons, using text separators.
 */
const Breadcrumb: React.FC<DynamicBreadcrumbsProps> = ({ items }) => {
  const navigate = useNavigate();
  
  // Define a static 'Home' item to always start the breadcrumb
  const homeItem: BreadcrumbItem = { label: 'Home', href: '/admin/v1/dashboard' };

  // Combine the static home item with the dynamic items
  const allItems = [homeItem, ...items];

  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-2 sm:space-x-3">
        {allItems.map((item, index) => {
          const isLast = index === allItems.length - 1;

          return (
            <li key={item.href || index} className="flex items-center">
              
              {/* Separator: Simple forward slash character */}
              {index > 0 && (
                <div className='flex items-center'>
                  <span className="text-gray-400 mx-1 sm:mx-1.5 text-lg font-light">/</span>
                  <span className="sr-only">/</span>
                </div>
              )}

              {isLast ? (
                // Last item (Current Page): Non-clickable span
                <span 
                  className="ml-1 sm:ml-2 text-sm font-medium text-gray-500 cursor-default" 
                  aria-current="page"
                >
                  {item.label}
                </span>
              ) : (
                // Non-Last Item: Clickable element using useNavigate
                <div
                  onClick={() => navigate(item.href)}
                  // Styles for a clickable link. Removed the 'mr-2' from the Home icon logic.
                  className="flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 transition duration-150 ease-in-out cursor-pointer ml-1 sm:ml-2"
                  role="link"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      navigate(item.href);
                    }
                  }}
                >
                  {/* Home Item: Label starts the same way as others */}
                  {item.label}
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;