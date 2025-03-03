
import { useState, useCallback } from 'react';
import { BoardType, ColumnType, CardType } from '../types';
import { toast } from "sonner";

export const useDragAndDrop = (initialBoard: BoardType) => {
  const [board, setBoard] = useState<BoardType>(initialBoard);
  const [draggedItem, setDraggedItem] = useState<{ cardId: string, columnId: string } | null>(null);

  const handleDragStart = useCallback((cardId: string, columnId: string) => {
    setDraggedItem({ cardId, columnId });
  }, []);

  const handleDragEnd = useCallback(() => {
    setDraggedItem(null);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }, []);

  const handleDrop = useCallback((targetColumnId: string, targetIndex?: number) => {
    if (!draggedItem) return;

    const { cardId, columnId } = draggedItem;
    
    if (columnId === targetColumnId && typeof targetIndex === 'undefined') return;

    setBoard(prev => {
      // Create a copy of the board
      const newBoard = { ...prev };
      
      // Find source and target columns
      const sourceColumn = newBoard.columns.find(col => col.id === columnId);
      const targetColumn = newBoard.columns.find(col => col.id === targetColumnId);
      
      if (!sourceColumn || !targetColumn) return prev;
      
      // Find and remove the card from source column
      const cardIndex = sourceColumn.cards.findIndex(card => card.id === cardId);
      if (cardIndex === -1) return prev;
      
      const [movedCard] = sourceColumn.cards.splice(cardIndex, 1);
      
      // Add the card to the target column
      if (typeof targetIndex !== 'undefined') {
        targetColumn.cards.splice(targetIndex, 0, movedCard);
      } else {
        targetColumn.cards.push(movedCard);
      }
      
      toast.success(`Moved card to ${targetColumn.title}`);
      
      return newBoard;
    });
    
    handleDragEnd();
  }, [draggedItem, handleDragEnd]);

  const addNewCard = useCallback((columnId: string, title: string) => {
    if (!title.trim()) {
      toast.error("Card title cannot be empty");
      return;
    }
    
    setBoard(prev => {
      const newBoard = { ...prev };
      const column = newBoard.columns.find(col => col.id === columnId);
      
      if (!column) return prev;
      
      const newCard: CardType = {
        id: Date.now().toString(),
        title: title.trim(),
        created: new Date()
      };
      
      column.cards.push(newCard);
      toast.success("Card added");
      return newBoard;
    });
  }, []);

  const addNewColumn = useCallback((title: string) => {
    if (!title.trim()) {
      toast.error("Column title cannot be empty");
      return;
    }
    
    setBoard(prev => {
      const newColumn: ColumnType = {
        id: Date.now().toString(),
        title: title.trim(),
        cards: []
      };
      
      const newBoard = {
        ...prev,
        columns: [...prev.columns, newColumn]
      };
      
      toast.success("Column added");
      return newBoard;
    });
  }, []);
  
  const deleteCard = useCallback((cardId: string, columnId: string) => {
    setBoard(prev => {
      const newBoard = { ...prev };
      const column = newBoard.columns.find(col => col.id === columnId);
      
      if (!column) return prev;
      
      column.cards = column.cards.filter(card => card.id !== cardId);
      toast.success("Card deleted");
      return newBoard;
    });
  }, []);
  
  const deleteColumn = useCallback((columnId: string) => {
    setBoard(prev => {
      const newBoard = {
        ...prev,
        columns: prev.columns.filter(col => col.id !== columnId)
      };
      
      toast.success("Column deleted");
      return newBoard;
    });
  }, []);

  return {
    board,
    draggedItem,
    handleDragStart,
    handleDragEnd,
    handleDragOver,
    handleDrop,
    addNewCard,
    addNewColumn,
    deleteCard,
    deleteColumn
  };
};
