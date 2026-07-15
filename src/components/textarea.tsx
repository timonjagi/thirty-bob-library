import React from 'react';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export default function TextArea({ label, ...props }: TextAreaProps) {
  return (
    <div className="mb-16px">
      {label && (
        <label className="block text-14px font-medium text-gray-700 mb-6px">
          {label}
        </label>
      )}
      <textarea
        className="w-full border border-gray-300 rounded px-14px py-10px text-14px text-gray-900 focus:outline-none focus:border-gray-900 resize-none"
        rows={4}
        {...props}
      />
    </div>
  );
}
