import React from 'react';
import classes from './Header.module.css';
import {
  IoArrowUndoOutline as Undo,
  IoArrowRedoOutline as Redo,
} from 'react-icons/io5';
import { Eraser, Pencil } from 'react-bootstrap-icons';
import IconButton from '../../components/IconButton';
import withDropdown from '../../helper/withDropdown';
import Form from '../../components/Form/Form';
import { useState } from 'react';

const Header = () => {
  const [isEraserConfigsShown, setIsEraserConfigsShown] = useState(false);
  const [isPencilConfigsShown, setIsPencilConfigsShown] = useState(false);
  const [selectedTool, setSelectedTool] = useState<'pencil' | 'eraser'>(
    'pencil',
  );

  return (
    <div className={classes.container}>
      {withDropdown(
        <IconButton
          onClick={() => setSelectedTool('eraser')}
          isSelected={selectedTool === 'eraser'}
        >
          <Eraser />
        </IconButton>,
        <Form
          defalutValues={{ size: 2, blur: 1, color: '#fff' }}
          exclude={['color']}
        />,
        classes.dropdown,
        isEraserConfigsShown,
        () => setIsEraserConfigsShown(true),
        () => setIsEraserConfigsShown(false),
      )}

      {withDropdown(
        <IconButton
          onClick={() => setSelectedTool('pencil')}
          isSelected={selectedTool === 'pencil'}
        >
          <Pencil />
        </IconButton>,
        <Form
          defalutValues={{
            size: 2,
            blur: 1,
            color: '#fff',
          }}
        />,
        classes.dropdown,
        isPencilConfigsShown,
        () => setIsPencilConfigsShown(true),
        () => setIsPencilConfigsShown(false),
      )}

      <h1 className={`header-1 ${classes.header}`}>Drawing Pad</h1>
      <IconButton>
        <Undo />
      </IconButton>
      <IconButton>
        <Redo />
      </IconButton>
    </div>
  );
};

export default Header;
