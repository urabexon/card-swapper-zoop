
import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';

interface AddButtonProps {
  onAdd: (text: string) => void;
  placeholder: string;
  buttonText: string;
}

const AddButton: React.FC<AddButtonProps> = ({ onAdd, placeholder, buttonText }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [text, setText] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text);
      setText('');
      setIsAdding(false);
    }
  };
  
  const handleCancel = () => {
    setText('');
    setIsAdding(false);
  };
  
  if (isAdding) {
    return (
      <div className="animate-fade-in">
        <form onSubmit={handleSubmit} className="p-2">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={placeholder}
            className="w-full p-2 border border-blue-200 rounded-md mb-2 focus:outline-none focus:ring-1 focus:ring-blue-300 focus:border-blue-300"
            autoFocus
          />
          <div className="flex space-x-2">
            <button
              type="submit"
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-1.5 px-3 rounded-md text-sm transition-colors duration-200"
            >
              Add
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="flex items-center justify-center bg-gray-200 hover:bg-gray-300 text-gray-700 py-1.5 px-2 rounded-md text-sm transition-colors duration-200"
            >
              <X size={16} />
            </button>
          </div>
        </form>
      </div>
    );
  }
  
  return (
    <button
      onClick={() => setIsAdding(true)}
      className="w-full flex items-center justify-center py-2 px-3 text-sm text-gray-600 hover:text-gray-900 bg-white bg-opacity-60 hover:bg-opacity-80 border border-dashed border-gray-300 rounded-md transition-all duration-200 hover:border-gray-400"
    >
      <Plus size={16} className="mr-1" /> {buttonText}
    </button>
  );
};

export default AddButton;
