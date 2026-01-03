import React, { useEffect, useState } from 'react';
import { useTheme } from './ThemeProvider';
import { useIsMobile } from './ui/use-mobile';

interface CustomCursorProps {
  variant?: 'default' | 'dark' | 'purple' | 'pink';
  animated?: boolean;
  trail?: boolean;
}

export function CustomCursor({ variant = 'default', animated = false, trail = false }: CustomCursorProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { theme } = useTheme();
  const isMobile = useIsMobile();

  // 在移动端不显示自定义光标
  if (isMobile) {
    return null;
  }

  useEffect(() => {
    // 隐藏系统光标 - 使用类和样式双重保险
    document.documentElement.classList.add('cursor-enabled');
    document.body.classList.add('cursor-enabled');
    document.body.style.cursor = 'none';
    document.documentElement.style.cursor = 'none';

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      // 强制隐藏所有光标，包括滚动条区域
      const allElements = document.querySelectorAll('*');
      allElements.forEach(el => {
        (el as HTMLElement).style.cursor = 'none';
      });

      // 特别处理滚动条相关的样式
      const style = document.createElement('style');
      style.textContent = `
        *::-webkit-scrollbar,
        *::-webkit-scrollbar-track,
        *::-webkit-scrollbar-thumb,
        *::-webkit-scrollbar-button,
        *::-webkit-scrollbar-corner {
          cursor: none !important;
        }
      `;
      document.head.appendChild(style);

      // 清理之前的样式
      setTimeout(() => {
        const existingStyles = document.querySelectorAll('style[data-cursor-hide]');
        existingStyles.forEach(s => s.remove());
        style.setAttribute('data-cursor-hide', 'true');
      }, 0);
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseLeaveWindow = () => setIsVisible(false);
    const handleMouseEnterWindow = () => setIsVisible(true);

    // 为交互元素添加hover检测
    const interactiveElements = document.querySelectorAll('button, a, [role="button"], input, textarea, select, [tabindex]:not([tabindex="-1"])');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeaveWindow);
    document.addEventListener('mouseenter', handleMouseEnterWindow);

    return () => {
      // 恢复系统光标
      document.documentElement.classList.remove('cursor-enabled');
      document.body.classList.remove('cursor-enabled');
      document.body.style.cursor = '';
      document.documentElement.style.cursor = '';

      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeaveWindow);
      document.removeEventListener('mouseenter', handleMouseEnterWindow);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  const cursorClasses = [
    'cursor-dot',
    `cursor-theme-${variant === 'default' ? (theme === 'dark' ? 'dark' : 'default') : variant}`,
    animated && 'cursor-animated',
  ].filter(Boolean).join(' ');

  const followClasses = [
    'cursor-dot-follow',
    `cursor-theme-${variant === 'default' ? (theme === 'dark' ? 'dark' : 'default') : variant}`,
    trail && 'cursor-trail',
  ].filter(Boolean).join(' ');

  const containerClasses = [
    'cursor-theme',
    isHovering && 'cursor-hover',
    isClicking && 'cursor-click',
  ].filter(Boolean).join(' ');

  if (!isVisible) return null;

  return (
    <>
      <div className={containerClasses}>
        <div
          className={cursorClasses}
          style={{
            transform: `translate(${mousePosition.x - 4}px, ${mousePosition.y - 4}px)`,
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 0.2s ease',
          }}
        />
        <div
          className={followClasses}
          style={{
            transform: `translate(${mousePosition.x - 16}px, ${mousePosition.y - 16}px)`,
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 0.3s ease',
          }}
        />
      </div>
    </>
  );
}