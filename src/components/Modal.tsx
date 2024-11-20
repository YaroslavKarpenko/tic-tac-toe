import React from 'react';

interface ModalProps {
  isVisible: boolean;
  message: string;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isVisible, message, onClose }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg text-center relative">
        <p className="text-lg font-bold">{message}</p>
        <button
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          onClick={onClose}>
          Ок
        </button>
      </div>
      <div className="absolute inset-0" onClick={onClose}></div>
    </div>
  );
};

export default Modal;
