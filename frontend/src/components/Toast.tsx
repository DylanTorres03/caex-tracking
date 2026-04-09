import { useEffect } from 'react';

interface ToastProps {
  message: string;
  type: 'error' | 'info';
  onClose: () => void;
}

export default function Toast({ message, type, onClose }: ToastProps) {
  useEffect(() => {
    const t = setTimeout(onClose, 4500);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div className="fixed top-5 right-5 z-50 animate-slideInRight">
      <div className="flex items-start gap-3 bg-white border border-gray-200 shadow-lg px-4 py-3 max-w-xs">
        <div
          className={`mt-0.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${
            type === 'error' ? 'bg-red-500' : 'bg-brand'
          }`}
          style={{ marginTop: '6px' }}
        />
        <p className="text-sm text-gray-700 leading-snug flex-1">{message}</p>
        <button
          onClick={onClose}
          className="text-gray-300 hover:text-gray-500 transition ml-1 flex-shrink-0"
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
