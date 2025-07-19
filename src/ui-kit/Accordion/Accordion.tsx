import { useState, type ReactElement, type ReactNode } from "react";
import './Accordion.scss'; // Assuming you'll create an Accordion.scss file

// import logo
import ChevronDown from '../../assets/Logo/ChevronDown.svg';

// Type for the Accordion component props
type TAccordion = {
  className?: string;
  children: ReactElement<{
    children: ReactNode; title: string 
}, string>[];
  allowMultipleOpen?: boolean; // New prop to control if multiple items can be open
  initialOpenIndexes?: number[]; // New prop for initially open items
  onChange?: (openIndexes: number[]) => void; // Callback to notify parent of changes
}

// Type for individual Accordion Item props
type TAccordionItemTitle = {
  children: ReactNode;
  title: string;
}

// AccordionItem component - conceptually similar to your Tab component
export const Accordion = ({
  children
}: TAccordionItemTitle) => {
  return <div>{children}</div>
}

// Accordion component - transformed from Tabs
export const Accordions = ({
  className,
  children,
  allowMultipleOpen = false, // Default to only one item open at a time
  initialOpenIndexes = [],
  onChange
}: TAccordion) => {
  // State to manage which accordion items are open
  const [openIndexes, setOpenIndexes] = useState<number[]>(initialOpenIndexes);

  const toggleAccordionItem = (index: number) => {
    let newOpenIndexes: number[];

    if (allowMultipleOpen) {
      // If multiple are allowed, add/remove the index
      if (openIndexes.includes(index)) {
        newOpenIndexes = openIndexes.filter(i => i !== index);
      } else {
        newOpenIndexes = [...openIndexes, index];
      }
    } else {
      // If only one is allowed, open this one or close it if already open
      newOpenIndexes = openIndexes.includes(index) ? [] : [index];
    }

    setOpenIndexes(newOpenIndexes);
    onChange?.(newOpenIndexes); // Notify parent if onChange is provided
  };

  return (
    <div className={`${className ?? ''} accordion`}>
      {children.map((item, index) => {
        const isOpen = openIndexes.includes(index);
        return (
          <div key={index} className="accordion-item">
            <div
              className={`accordion-title ${isOpen ? 'accordion-active' : ''}`}
              onClick={() => toggleAccordionItem(index)}
            >
              <span className="accordion-title-text">{item.props.title}</span>
              <img className="accordion-title-icon" src={ChevronDown} />
            </div>
            <div className={`accordion-content ${isOpen ? 'accordion-content-open' : ''}`}>
              {item.props.children}
            </div>
          </div>
        );
      })}
    </div>
  );
};