import React from 'react';
import { CSSTransition } from 'react-transition-group';

interface DropdownProps {
  className?: string;
}

const Dropdown: React.FC<DropdownProps> = ({ children, className }) => {
  return <div className={`dropdown ${className}`}>{children}</div>;
};

const withDropdown = (
  component: React.ReactNode,
  dropdown: React.ReactNode,
  dropdownClassName?: string,
  isDropdownShown?: boolean,
  onContainerEnter?: () => void,
  onContainerLeave?: () => void,
) => {
  return (
    <div
      className="dropdown-container"
      onMouseEnter={onContainerEnter}
      onMouseLeave={onContainerLeave}
    >
      {component}
      <CSSTransition
        classNames="fade"
        in={isDropdownShown}
        timeout={300}
        unmountOnExit
        mountOnEnter
      >
        <Dropdown className={dropdownClassName}>{dropdown}</Dropdown>
      </CSSTransition>
    </div>
  );
};

export default withDropdown;
