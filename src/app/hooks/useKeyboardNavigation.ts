import { useEffect, useCallback } from 'react';

export function useKeyboardNavigation(
  onNext?: () => void,
  onPrevious?: () => void,
  onHome?: () => void,
  onSearch?: () => void
) {
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    // 避免在输入框中触发导航
    if (event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement ||
        (event.target as HTMLElement)?.contentEditable === 'true') {
      return;
    }

    switch (event.key) {
      case 'ArrowRight':
      case 'j':
        if (onNext && !event.ctrlKey && !event.metaKey) {
          event.preventDefault();
          onNext();
        }
        break;
      case 'ArrowLeft':
      case 'k':
        if (onPrevious && !event.ctrlKey && !event.metaKey) {
          event.preventDefault();
          onPrevious();
        }
        break;
      case 'h':
      case 'Home':
        if (onHome) {
          event.preventDefault();
          onHome();
        }
        break;
      case '/':
        if (onSearch) {
          event.preventDefault();
          onSearch();
        }
        break;
    }
  }, [onNext, onPrevious, onHome, onSearch]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
}