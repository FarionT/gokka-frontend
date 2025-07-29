import { useState, type ReactElement, type ReactNode } from "react";
import './TabKatalog.scss';

// Add onChange to TTab to pass the new active tab index to the parent
type TTabKatalog = {
  className?: string,
  children: ReactElement<{
    name?: ReactNode; title: string 
}, string>[];
  position?: string;
  activeTab?: number;
  onChange?: (index: number) => void; // Callback to notify the parent of tab changes
}

type TTabKatalogTitle = {
  children: ReactNode;
  title: string;
  name?: string;
}

export const TabKatalog = ({
  children,
}: TTabKatalogTitle) => {
  return <div>{children}</div>
}

export const TabsKatalog = ({
  className,
  children,
  position = 'center',
  activeTab: propActiveTab, // Rename propActiveTab to distinguish from internal state
  onChange
}: TTabKatalog) => {
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
    <div className={`${className ?? ''} tab-katalog`}>
      {/* <div className="tab-katalog-container mx-auto justify-center"> */}
        <div className={`flex tab-katalog-title tab-katalog-title-${position} mx-auto gap-8`}>
          {children.map((item, index) => (
            <div className={`flex tab-katalog-item gap-3 flex-col ${currentActiveTab === index ? 'tab-katalog-active' : ''}`} key={index}>
              <div 
                className={`tab-katalog-item-image flex `} 
                onClick={() => { changeTab(index) }}
              >
                <img src={item.props.title} className="w-12 h-12 m-auto" />
              </div>
              <div className="tab-katalog-item-text text-center">{item.props.name}</div>
            </div>
          ))}
        </div>
      {/* </div> */}
      <div className="tab-katalog-content py-8">{children[currentActiveTab]}</div>
    </div>
  )
}