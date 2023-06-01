import classNames from 'classnames';
import React from 'react';

interface TextareaProps {
  label: string;
  name: string;
  register: any;
  error?: any;
  isRequired?: boolean;
}

const TextareaInput:React.FC<TextareaProps> = ({ label, name, register, error, isRequired }) => {
  return (
    <div className="mb-4">
      <div className="flex w-full justify-between items-center">
        <label htmlFor={name} className="text-sm font-bold mb-1">
          {label}
          {isRequired && <span className="text-red-500">*</span>}
        </label>

        {!!error && <span className="text-red-500 text-sm font-bold">{error}</span>}
      </div>

      <textarea
        id={name}
        name={name}
        className={classNames('w-full border border-gray-300 p-2 rounded-xl focus:outline-none focus:border-sky-600', {
          'border-red-500': !!error,
        })}
        rows={4}
        {...register(`${name}`)}
      />
      
    </div>
  );
}

export { TextareaInput }