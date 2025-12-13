import React from 'react';

const TYPE_STYLES = {
  success: 'bg-green-600 text-white',
  error: 'bg-red-600 text-white',
  warning: 'bg-yellow-500 text-black',
  info: 'bg-blue-600 text-white',
};

function Toast({ open, type = 'info', message = '' }) {
  if (!open) return null;
  const styles = TYPE_STYLES[type] || TYPE_STYLES.info;
  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
      <div className={`rounded-md px-4 py-2 shadow-lg ${styles}`}>
        <span className="text-sm">{message}</span>
      </div>
    </div>
  );
}

export default Toast;
