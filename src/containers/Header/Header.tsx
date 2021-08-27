import React, { useState } from 'react';
import classes from './Header.module.css';
import {
  IoArrowUndoOutline as Undo,
  IoArrowRedoOutline as Redo,
} from 'react-icons/io5';
import { Eraser, Pencil } from 'react-bootstrap-icons';
import IconButton from '../../components/IconButton';
import withDropdown from '../../helper/withDropdown';
import Form from '../../components/Form/Form';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { ERASER, PENCIL } from '../../store/constants/configs';
import { CHANGE_TOOL, REDO, UNDO } from '../../store/constants/app';
import { useEffect } from 'react';

const Header = () => {
  const dispatch = useAppDispatch();
  const selectedTool = useAppSelector(state => state.app.selectedTool);
  const eraserConfigs = useAppSelector(state => state.configs.eraser);
  const pencilConfigs = useAppSelector(state => state.configs.pencil);

  const [isEraserConfigsShown, setIsEraserConfigsShown] = useState(false);
  const [isPencilConfigsShown, setIsPencilConfigsShown] = useState(false);

  const past = useAppSelector(state => state.app.paths.past);
  const present = useAppSelector(state => state.app.paths.present);
  const future = useAppSelector(state => state.app.paths.future);

  useEffect(() => {
    // push configs to the local storage
    localStorage.setItem('eraserConfigs', JSON.stringify(eraserConfigs));
    localStorage.setItem('pencilConfigs', JSON.stringify(pencilConfigs));
  }, [eraserConfigs, pencilConfigs]);

  useEffect(() => {
    // push the history stack to the local stoarge
    localStorage.setItem('past', JSON.stringify(past));
    localStorage.setItem('present', JSON.stringify(present));
    localStorage.setItem('future', JSON.stringify(future));
  }, [past, present, future]);

  return (
    <div className={classes.container}>
      {withDropdown(
        <IconButton
          onClick={() => dispatch({ type: CHANGE_TOOL, payload: 'eraser' })}
          isSelected={selectedTool === 'eraser'}
        >
          <Eraser />
        </IconButton>,
        <Form
          values={{ ...eraserConfigs, color: '#fff' }}
          exclude={['color']}
          onChange={values => dispatch({ type: ERASER, payload: values })}
        />,
        classes.dropdown,
        isEraserConfigsShown,
        () => setIsEraserConfigsShown(true),
        () => setIsEraserConfigsShown(false),
      )}

      {withDropdown(
        <IconButton
          onClick={() => dispatch({ type: CHANGE_TOOL, payload: 'pencil' })}
          isSelected={selectedTool === 'pencil'}
        >
          <Pencil />
        </IconButton>,
        <Form
          values={pencilConfigs}
          onChange={values => dispatch({ type: PENCIL, payload: values })}
        />,
        classes.dropdown,
        isPencilConfigsShown,
        () => setIsPencilConfigsShown(true),
        () => setIsPencilConfigsShown(false),
      )}

      <h1 className={`header-1 ${classes.header}`}>Drawing Pad</h1>
      <IconButton onClick={() => dispatch({ type: UNDO })} disabled={!present}>
        <Undo />
      </IconButton>
      <IconButton
        onClick={() => dispatch({ type: REDO })}
        disabled={future.length === 0}
      >
        <Redo />
      </IconButton>
    </div>
  );
};

export default Header;
