import React, { ChangeEvent } from 'react';
interface InputProps {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  type: string;
  autoComplete: string;
  required: boolean;
  placeholder?: string;
  errorMessage?: string;
  hasError?: boolean;
}

const Input: React.FC<InputProps> = ({
  id,
  name,
  label,
  value,
  onChange,
  autoComplete,
  type,
  required,
  placeholder,
  errorMessage,
  hasError = false,
}) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium leading-6 text-gray-900">
        {label}
      </label>
      <div className="mt-2">
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          required={required}
          placeholder={placeholder}
          className={`block px-2 w-full rounded-md border py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
            hasError ? 'border-red-500' : ''
          }`}
        />
        {hasError && <p className="mt-1 text-sm text-red-500">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default Input;
