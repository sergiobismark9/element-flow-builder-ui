
import { useState, useCallback } from 'react';
import { Component } from '@/components/PageBuilderEditor';

interface HistoryState {
  components: Component[];
  timestamp: number;
}

export const useHistory = (initialComponents: Component[] = []) => {
  const [history, setHistory] = useState<HistoryState[]>([
    { components: initialComponents, timestamp: Date.now() }
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const pushToHistory = useCallback((components: Component[]) => {
    setHistory(prev => {
      const newHistory = prev.slice(0, currentIndex + 1);
      newHistory.push({ components: [...components], timestamp: Date.now() });
      
      // Manter apenas os últimos 50 estados
      if (newHistory.length > 50) {
        newHistory.shift();
        return newHistory;
      }
      
      return newHistory;
    });
    setCurrentIndex(prev => prev + 1);
  }, [currentIndex]);

  const undo = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      return history[currentIndex - 1].components;
    }
    return null;
  }, [currentIndex, history]);

  const redo = useCallback(() => {
    if (currentIndex < history.length - 1) {
      setCurrentIndex(prev => prev + 1);
      return history[currentIndex + 1].components;
    }
    return null;
  }, [currentIndex, history]);

  const canUndo = currentIndex > 0;
  const canRedo = currentIndex < history.length - 1;

  return {
    pushToHistory,
    undo,
    redo,
    canUndo,
    canRedo,
    currentComponents: history[currentIndex]?.components || []
  };
};
