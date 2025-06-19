import React, { forwardRef } from 'react';

type InputProps = {
  label?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  id?: string;
  name?: string;
  autoComplete?: string;
  icon?: React.ReactNode;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      type = 'text',
      placeholder,
      value,
      onChange,
      onBlur,
      error,
      required = false,
      disabled = false,
      className = '',
      id,
      name,
      autoComplete,
      icon,
    },
    ref
  ) => {
    return (
      <div className="mb-4">
        {label && (
          <label
            htmlFor={id}
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            type={type}
            id={id}
            name={name}
            className={`block w-full px-4 py-2 border ${
              error ? 'border-red-500' : 'border-gray-300'
            } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black sm:text-sm ${
              icon ? 'pl-10' : ''
            } ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''} ${className}`}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            disabled={disabled}
            autoComplete={autoComplete}
            required={required}
          />
        </div>
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    );
  }
);

export default Input;