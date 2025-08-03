import { useState, type ReactElement, type ReactNode } from "react";
import './Tab.scss';

// Add onChange to TTab to pass the new active tab index to the parent
type TTab = {
  className?: string,
  children: ReactElement<{ title: string }, string>[];
  position?: string;
  activeTab?: number;
  onChange?: (index: number) => void; // Callback to notify the parent of tab changes
}

type TTabTitle = {
  children: ReactNode;
  title: string;
}

export const Tab = ({
  children
}: TTabTitle) => {
  return <div>{children}</div>
}

export const Tabs = ({
  className,
  children,
  position = 'center',
  activeTab: propActiveTab, // Rename propActiveTab to distinguish from internal state
  onChange
}: TTab) => {
  // 1. Internal state management for uncontrolled behavior (optional, if no activeTab prop is provided)
  const [internalActiveTab, setInternalActiveTab] = useState<number>(propActiveTab ?? 0);

  // 2. Determine the current active tab. 
  // If propActiveTab is defined, use it (controlled). Otherwise, use internal state (uncontrolled).
  const currentActiveTab = propActiveTab !== undefined ? propActiveTab : internalActiveTab;

  const changeTab = (index: number) => {
    // If an onChange handler is provided, call it to update the parent's state
    if (onChange) {
      onChange(index);
    }
    
    // If propActiveTab is not defined (uncontrolled), update internal state
    if (propActiveTab === undefined) {
      setInternalActiveTab(index);
    }
  }

  return (
    <div className={`${className ?? ''} tab`}>
      <div className={`flex tab-title tab-title-${position} gap-6`}>
        {children.map((item, index) => (
          <div 
            className={`tab-title-text ${currentActiveTab === index ? 'tab-active' : ''}`} 
            key={index} 
            onClick={() => { changeTab(index) }}
          >
            {item.props.title}
          </div>
        ))}
      </div>
      <div className="tab-content py-6">{children[currentActiveTab]}</div>
    </div>
  )
}