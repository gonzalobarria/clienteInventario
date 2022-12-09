/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from 'react';
import { NavLink } from 'reactstrap';

const ApplicationMenuPOS = ({ children }) => {
  const containerRef = useRef();
  const [isOpen, setIsOpen] = useState(false);

  const handleDocumentClick = (e) => {
    if (isOpen) {
      const container = containerRef.current;
      if (container.contains(e.target) || container === e.target) {
        return;
      }
      setIsOpen(false);
    }
  };

  useEffect(() => {
    ['click', 'touchstart'].forEach((event) =>
      document.addEventListener(event, handleDocumentClick, false)
    );

    return () => {
      ['click', 'touchstart'].forEach((event) =>
        document.removeEventListener(event, handleDocumentClick, false)
      );
    };
  }, [isOpen]);

  return (
    <div ref={containerRef} className={`app-menu-pos ${isOpen ? 'shown' : ''}`}>
      {children}
      <NavLink
        className="app-menu-button d-inline-block d-md-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <i className="simple-icon-options" />
      </NavLink>
    </div>
  );
};

export default ApplicationMenuPOS;
