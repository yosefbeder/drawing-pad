import React from 'react';
import classes from './Form.module.css';

interface InputProps {
  label: string;
}

const Input: React.FC<
  InputProps & React.InputHTMLAttributes<HTMLInputElement>
> = props => {
  const { className, label, ...restProps } = props;

  return (
    <div className={classes['input-group']}>
      <div className={classes['input-label']}>{label}</div>
      <input className={`${classes.input} ${className}`} {...restProps} />
    </div>
  );
};

export default Input;
