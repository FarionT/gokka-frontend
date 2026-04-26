import { useRef, useState, useEffect } from 'react';

interface FilterState {
  approvedYes: boolean;
  approvedNo: boolean;
  halalYes: boolean;
  halalNo: boolean;
}

interface DropdownFilterProps {
  value: FilterState;
  onChange: (filters: FilterState) => void;
}

const DropdownFilter = ({ value, onChange }: DropdownFilterProps) => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const activeCount = Object.values(value).filter(Boolean).length;

  const toggle = (key: keyof FilterState) => {
    onChange({ ...value, [key]: !value[key] });
  };

  const clearAll = () => {
    onChange({ approvedYes: false, approvedNo: false, halalYes: false, halalNo: false });
  };

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={wrapperRef} className="relative inline-block">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-1.5 border border-slate-300 rounded-md bg-white text-sm text-slate-700 hover:bg-slate-50 transition-colors"
      >
        {/* Filter icon */}
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M1 3h12M3 7h8M5 11h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        <span>Filter</span>

        {/* Active count badge */}
        {activeCount > 0 && (
          <span className="bg-sky-100 text-sky-700 text-xs font-medium rounded-full px-1.5 py-px min-w-[18px] text-center">
            {activeCount}
          </span>
        )}

        {/* Chevron */}
        <svg
          width="12" height="12" viewBox="0 0 12 12" fill="none"
          className={`transition-transform duration-150 ${open ? 'rotate-180' : ''}`}
        >
          <path d="M2.5 4.5L6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {open && (
        <div className="absolute top-[calc(100%+6px)] left-0 min-w-[200px] bg-white border border-slate-200 rounded-lg shadow-md z-10 py-1">

          {/* Approved section */}
          <div className="px-3.5 pt-2 pb-1">
            <p className="text-[11px] font-medium text-slate-400 uppercase tracking-widest mb-1.5">Approved</p>
            {[
              { key: 'approvedYes' as const, label: 'Yes' },
              { key: 'approvedNo' as const, label: 'No' },
            ].map(({ key, label }) => (
              <label key={key} className="flex items-center gap-2.5 py-1 cursor-pointer text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={value[key]}
                  onChange={() => toggle(key)}
                  className="w-4 h-4 accent-sky-500 cursor-pointer"
                />
                {label}
              </label>
            ))}
          </div>

          <div className="mx-3.5 my-1.5 border-t border-slate-100" />

          {/* Halal section */}
          <div className="px-3.5 pt-1 pb-2">
            <p className="text-[11px] font-medium text-slate-400 uppercase tracking-widest mb-1.5">Halal</p>
            {[
              { key: 'halalYes' as const, label: 'Yes' },
              { key: 'halalNo' as const, label: 'No' },
            ].map(({ key, label }) => (
              <label key={key} className="flex items-center gap-2.5 py-1 cursor-pointer text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={value[key]}
                  onChange={() => toggle(key)}
                  className="w-4 h-4 accent-sky-500 cursor-pointer"
                />
                {label}
              </label>
            ))}
          </div>

          {/* Clear all */}
          <div className="border-t border-slate-100 px-3.5 py-1.5 flex justify-end">
            <button
              onClick={clearAll}
              className="text-xs text-slate-400 hover:text-slate-600 transition-colors"
            >
              Clear all
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownFilter;