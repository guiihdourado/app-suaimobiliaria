import classNames from 'classnames';
import React from 'react';

export interface DividerProps {
  marginTop?: 'sm' | 'md' | 'xl' | '2xl';
  marginBottom?: 'sm' | 'md' | 'xl' | '2xl';
}

const Divider: React.FC<DividerProps> = ({ marginBottom, marginTop }) => {
  return (
    <div
      className={classNames(
        'w-full border-t-[1px] border-slate-5 my-[0.25rem]',
        {
          'mt-2': marginTop === 'sm',
          'mt-3': marginTop === 'md',
          'mt-4': marginTop === 'xl',
          'mt-5': marginTop === '2xl',
          'mb-2': marginBottom === 'sm',
          'mb-3': marginBottom === 'md',
          'mb-4': marginBottom === 'xl',
          'mb-5': marginBottom === '2xl',
        }
      )}
    />
  );
};

export { Divider };
