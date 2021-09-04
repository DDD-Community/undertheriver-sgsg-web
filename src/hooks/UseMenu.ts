import React, { useEffect, useRef, useState } from 'react';

const useMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  function onOpenMenu(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    setIsMenuOpen(true);
    e.preventDefault();
  }

  function onCloseMenu(ref: React.RefObject<HTMLDivElement>) {
    useEffect(() => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setIsMenuOpen(false);
        }
      }
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref]);
  }

  // const wrapperRef = useRef<HTMLDivElement>(null);

  return {
    isMenuOpen,
    onOpenMenu,
    onCloseMenu,
  };
};
export default useMenu;
