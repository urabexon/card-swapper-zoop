
import React, { useRef } from 'react';
import { ColumnType, CardType } from '../types';
import Card from './Card';
import AddButton from './AddButton';
import { MoreHorizontal, X } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface ColumnProps {
  column: ColumnType;
  onDragStart: (cardId: string, columnId: string) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (columnId: string, index?: number) => void;
  onAddCard: (columnId: string, title: string) => void;
  onDeleteCard: (cardId: string, columnId: string) => void;
  onDeleteColumn: (columnId: string) => void;
}

const Column: React.FC<ColumnProps> = ({
  column,
  onDragStart,
  onDragOver,
  onDrop,
  onAddCard,
  onDeleteCard,
  onDeleteColumn
}) => {
  const columnRef = useRef<HTMLDivElement>(null);
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    onDragOver(e);
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    
    const cardId = e.dataTransfer.getData('cardId');
    const columnId = e.dataTransfer.getData('columnId');
    const cardIndex = parseInt(e.dataTransfer.getData('index'));
    
    // If we're dropping directly on the column (not on a card)
    if (e.currentTarget === columnRef.current) {
      onDrop(column.id);
    }
  };
  
  const handleCardDrop = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault();
    e.stopPropagation();
    onDrop(column.id, index);
  };
  
  return (
    <div
      ref={columnRef}
      className="board-column flex flex-col min-w-[280px] max-w-[280px] h-full"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="p-3 border-b border-gray-200 border-opacity-50 flex justify-between items-center sticky top-0 bg-white bg-opacity-90 backdrop-blur-sm z-10">
        <h2 className="font-medium text-gray-800">{column.title}</h2>
        <DropdownMenu>
          <DropdownMenuTrigger className="p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
            <MoreHorizontal size={16} />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem 
              onClick={() => onDeleteColumn(column.id)}
              className="text-red-500 focus:text-red-500"
            >
              Delete Column
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <div className="p-2 flex-1 overflow-y-auto">
        {column.cards.map((card, index) => (
          <div 
            key={card.id}
            onDragOver={(e) => {
              e.preventDefault();
              e.currentTarget.classList.add("card-drop-target");
            }}
            onDragLeave={(e) => {
              e.currentTarget.classList.remove("card-drop-target");
            }}
            onDrop={(e) => handleCardDrop(e, index)}
          >
            <Card 
              card={card} 
              columnId={column.id} 
              index={index}
              onDragStart={onDragStart}
              onDelete={onDeleteCard}
            />
          </div>
        ))}
      </div>
      
      <div className="p-2 border-t border-gray-200 border-opacity-50">
        <AddButton 
          onAdd={(title) => onAddCard(column.id, title)}
          placeholder="Enter card title..."
          buttonText="Add Card"
        />
      </div>
    </div>
  );
};

export default Column;
