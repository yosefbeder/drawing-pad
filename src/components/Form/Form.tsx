import React, { useState } from 'react';
import Canvas from './Canvas';
import classes from './Form.module.css';
import Input from './Input';

interface FormProps {
  defalutValues: {
    size: number;
    blur: number;
    color: string;
  };
  exclude?: ('size' | 'blur' | 'color')[];
}

const Form: React.FC<FormProps> = ({ defalutValues, exclude = [] }) => {
  const [size, setSize] = useState(defalutValues.size);
  const [blur, setBlur] = useState(defalutValues.blur);
  const [color, setColor] = useState(defalutValues.color);

  return (
    <div className={classes.container}>
      <form className={classes.form}>
        {!exclude.includes('size') && (
          <Input
            label="Size"
            type="number"
            value={size}
            min={1}
            onChange={e => setSize(+e.target.value)}
          />
        )}
        {!exclude.includes('blur') && (
          <Input
            label="Blur"
            type="number"
            value={blur}
            min={1}
            onChange={e => setBlur(+e.target.value)}
          />
        )}

        {!exclude.includes('color') && (
          <Input
            label="Color"
            value={color}
            onChange={e => setColor(e.target.value)}
          />
        )}
      </form>
      <Canvas size={size} blur={blur} color={color} />
    </div>
  );
};

export default Form;
