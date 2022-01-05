import React, { useEffect, useRef, useState } from 'react';

const useMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  function onOpenMenu(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    setIsMenuOpen(true);
    e.preventDefault();
  }

  function onCloseMenu(ref: React.RefObject<HTMLDivElement>) {
    useEffect(() => {
      function handleClickOutside(event: CustomEvent) {
        if (ref.current && !ref.current.contains(event.target as Node)) {
          setIsMenuOpen(false);
        }
      }
      document.addEventListener('mousedown', ((event: CustomEvent) => {
        handleClickOutside(event);
      }) as EventListener);
      return () => {
        document.removeEventListener('mousedown', ((event: CustomEvent) => {
          handleClickOutside(event);
        }) as EventListener);
      };
    }, [ref]);
  }

  return {
    isMenuOpen,
    onOpenMenu,
    onCloseMenu,
  };
};
export default useMenu;
