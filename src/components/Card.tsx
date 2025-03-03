
import React, { useState } from 'react';
import { CardType } from '../types';
import { Check, X, Trash2 } from 'lucide-react';

interface CardProps {
  card: CardType;
  columnId: string;
  index: number;
  onDragStart: (cardId: string, columnId: string) => void;
  onDelete: (cardId: string, columnId: string) => void;
}

const Card: React.FC<CardProps> = ({ card, columnId, index, onDragStart, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(card.title);
  
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('cardId', card.id);
    e.dataTransfer.setData('columnId', columnId);
    e.dataTransfer.setData('index', index.toString());
    
    setTimeout(() => {
      e.currentTarget.classList.add('dragging-card');
    }, 0);
    
    onDragStart(card.id, columnId);
  };
  
  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.remove('dragging-card');
  };
  
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  
  const handleSave = () => {
    // In a real app, you'd update the card title in your state/API here
    setIsEditing(false);
  };
  
  const handleCancel = () => {
    setTitle(card.title);
    setIsEditing(false);
  };
  
  const formattedDate = card.created 
    ? new Intl.DateTimeFormat('en-US', { 
        month: 'short', 
        day: 'numeric' 
      }).format(new Date(card.created))
    : '';
    
  return (
    <div
      className="board-card mb-2 p-3 cursor-grab active:cursor-grabbing animate-fade-in"
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      style={{ animationDelay: `${index * 40}ms` }}
    >
      <div className="flex justify-between items-start group">
        {isEditing ? (
          <div className="w-full">
            <input
              type="text"
              value={title}
              onChange={handleTitleChange}
              className="w-full p-1 mb-1 border border-blue-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-300"
              autoFocus
            />
            <div className="flex space-x-2">
              <button 
                onClick={handleSave} 
                className="text-xs p-1 flex items-center text-green-500 hover:text-green-600 transition-colors"
              >
                <Check size={14} className="mr-1" /> Save
              </button>
              <button 
                onClick={handleCancel} 
                className="text-xs p-1 flex items-center text-gray-500 hover:text-gray-600 transition-colors"
              >
                <X size={14} className="mr-1" /> Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex-1" onDoubleClick={() => setIsEditing(true)}>
              <h3 className="font-medium text-sm leading-tight">{card.title}</h3>
              {card.description && (
                <p className="text-xs text-gray-500 mt-1 line-clamp-2">{card.description}</p>
              )}
            </div>
            <button 
              onClick={() => onDelete(card.id, columnId)}
              className="opacity-0 group-hover:opacity-100 transition-opacity p-1 text-gray-400 hover:text-red-500 rounded-full hover:bg-red-50"
            >
              <Trash2 size={14} />
            </button>
          </>
        )}
      </div>
      
      {card.tags && card.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {card.tags.map((tag, index) => (
            <span 
              key={index} 
              className="px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-700"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      
      {formattedDate && (
        <div className="mt-2 flex justify-end">
          <span className="text-xs text-gray-400">{formattedDate}</span>
        </div>
      )}
    </div>
  );
};

export default Card;
