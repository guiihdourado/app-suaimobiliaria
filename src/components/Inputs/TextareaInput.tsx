import React from 'react';

interface TextareaProps {
  label: string;
  name: string;
  register: any;
  error?: any;
  isRequired?: boolean;
}

const TextareaInput:React.FC<TextareaProps> = ({ label, name, register, error, isRequired }) => (
  <div className="mb-4">
    <label htmlFor={name} className="block text-sky-900 font-bold mb-2">
      {label}
      {isRequired && <span className="text-red-500">*</span>}
    </label>
    <textarea
      id={name}
      name={name}
      className="w-full border border-gray-300 p-2 rounded-xl focus:outline-none focus:border-sky-600"
      rows={4}
      ref={register(`${name}`,{ required: 'Campo obrigatório' })}
    />
    {error && <span className="text-red-500">{error.message}</span>}
  </div>
);

export { TextareaInput }