import React from 'react';

// Define the shape of the props for our flexible input component.
interface FlexibleInputProps {
  label: string;
  type: 'text' | 'number' | 'file' | 'dropdown' | 'password' | 'textarea' | 'color'; // Added 'textarea'
  // Adjusted value type to string | number | File | null, which accommodates all types
  value: string | number | File | null;
  onChange: (value: string | number | File | null) => void;
  placeholder?: string;
  options?: { value: string; label: string }[];
  // Optional prop for textarea rows
  rows?: number;
  className?: string;
  disabled?: boolean;
  // file
  fileType?: 'image' | 'video'
}

// The main flexible input component.
const InputField: React.FC<FlexibleInputProps> = ({
  label,
  type,
  value,
  onChange,
  placeholder,
  options,
  rows = 3, // Default rows for textarea
  className,
  disabled = false,
  fileType = 'image'
}) => {
const commonClasses = "mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-300 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none";
  const renderInput = () => {
    switch (type) {
      case 'text':
      case 'password':
        return (
          <input
            type={type}
            value={value as string}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className={commonClasses}
            disabled={disabled}
          />
        );
      case 'color':
        // Color inputs typically use a hex string value (e.g., #ff0000)
        // We'll apply a minimal class to avoid the bulky padding of commonClasses, 
        // while maintaining border/focus styles.
        { const colorClasses = "mt-1 block w-16 h-10 p-0 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-200 disabled:border-slate-200";
        return (
          <input
            type="color"
            // Default to #000000 if value is null or not a string
            value={(typeof value === 'string' && value) || '#000000'}
            onChange={(e) => onChange(e.target.value)}
            className={colorClasses}
            disabled={disabled}
            // Note: Color inputs ignore placeholder prop
          />
        ); }
      case 'textarea': // New case for textarea
        return (
          <textarea
            value={value as string}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            rows={rows}
            // Applying common styles for consistency, adjusted padding might be better for textareas
            className={`${commonClasses} resize-y`} 
            disabled={disabled}
          />
        );
      case 'number':
        return (
          <input
            type={type}
            // The value for number input should be string or number for controlled components
            // Casting to `any` here or using an intermediate variable can help with TypeScript's strictness
            value={value === null ? '' : value as number | string}
            onChange={(e) => {
              const newValue = e.target.value;
              // Only update if the value is a valid number or an empty string
              if (!isNaN(Number(newValue)) || newValue === '') {
                // If it's an empty string, pass null; otherwise, pass the number
                onChange(newValue === '' ? null : Number(newValue));
              }
            }}
            placeholder={placeholder}
            className={commonClasses}
            disabled={disabled}
          />
        );
      case 'file':
        // --- Image Preview Logic ---
        {
          // const imageFile = value instanceof File ? value : null;
          // const previewUrl = imageFile ? URL.createObjectURL(imageFile) : null;

          // Helper function to clear the file (calls the parent's onChange with null)
          // const handleClearFile = () => {
          //   // Clean up the object URL immediately before clearing state (best practice)
          //   if (previewUrl) {
          //     URL.revokeObjectURL(previewUrl);
          //   }
          //   onChange(null);
            
          //   // OPTIONAL: Clear the visual state of the *actual* file input element.
          //   // This requires using a ref since file inputs are inherently uncontrolled.
          //   // For simplicity in a single-file component, we'll omit the ref, 
          //   // but if the user wants to re-upload the *same* file, 
          //   // a ref is needed to clear e.target.value.
          // };

          return (
            <div>
              <input
                type="file"
                disabled={disabled}
                accept={`${fileType}/*`}
                onChange={(e) => onChange(e.target.files ? e.target.files[0] : null)}
                // Tailwind classes for the file input button styling
                className="block w-full text-sm text-slate-500 mt-1.5
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-violet-50 file:text-violet-700
                  hover:file:bg-violet-100 disabled:file:opacity-50"
              />
            </div>
          );
        }
      // ... rest of the component
      case 'dropdown':
        // Check if value is null OR an empty string
        { const isPlaceholderNeeded = value === null || value === '';

        return (
          <select
            // Ensure the value passed to <select> is a string, defaulting to '' if null
            value={value === null ? '' : value as string}
            onChange={(e) => onChange(e.target.value)}
            className={commonClasses}
            disabled={disabled}
          >
            {/* ✅ MODIFIED: Show 'Select an option' if value is null OR '' */}
            {isPlaceholderNeeded && (
              <option value="" disabled>
                Select an option
              </option>
            )}
            {options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ); }
      default:
        return null;
    }
  };

  return (
    <div className={`${className}`}>
      <label className="block text-sm font-medium text-slate-700">
        {label}
      </label>
      {renderInput()}
    </div>
  );
};

export default InputField;