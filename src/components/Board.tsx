
import React from 'react';
import { BoardType } from '../types';
import Column from './Column';
import AddButton from './AddButton';
import { useDragAndDrop } from '../hooks/useDragAndDrop';

interface BoardProps {
  initialBoard: BoardType;
}

const Board: React.FC<BoardProps> = ({ initialBoard }) => {
  const {
    board,
    handleDragStart,
    handleDragOver,
    handleDrop,
    addNewCard,
    addNewColumn,
    deleteCard,
    deleteColumn
  } = useDragAndDrop(initialBoard);
  
  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-200 bg-white bg-opacity-90 backdrop-blur-sm sticky top-0 z-20">
        <h1 className="text-2xl font-medium text-gray-800">{board.title}</h1>
      </div>
      
      <div className="flex-1 overflow-x-auto p-4">
        <div className="flex gap-4 h-full items-start">
          {board.columns.map((column) => (
            <Column
              key={column.id}
              column={column}
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onAddCard={addNewCard}
              onDeleteCard={deleteCard}
              onDeleteColumn={deleteColumn}
            />
          ))}
          
          <div className="min-w-[280px] max-w-[280px] animate-fade-in">
            <AddButton
              onAdd={addNewColumn}
              placeholder="Enter column title..."
              buttonText="Add Column"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Board;
