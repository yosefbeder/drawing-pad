import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { ConfigType } from '../../types';
import Canvas from './Canvas';
import classes from './Form.module.css';
import Input from './Input';

interface FormProps {
  values: {
    size: number;
    blur: number;
    color: string;
  };
  onChange: (value: ConfigType) => void;
  exclude?: ('size' | 'blur' | 'color')[];
}

const Form: React.FC<FormProps> = ({ values, onChange, exclude = [] }) => {
  const [size, setSize] = useState(values.size);
  const [blur, setBlur] = useState(values.blur);
  const [color, setColor] = useState(values.color);

  useEffect(() => {
    onChange({ size, blur, color });
  }, [size, blur, color]);

  return (
    <div className={classes.container}>
      <form className={classes.form}>
        {!exclude.includes('size') && (
          <Input
            label="Size"
            type="number"
            value={size}
            onChange={e => setSize(+e.target.value)}
            min={1}
          />
        )}
        {!exclude.includes('blur') && (
          <Input
            label="Blur"
            type="number"
            value={blur}
            onChange={e => setBlur(+e.target.value)}
            min={0}
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
