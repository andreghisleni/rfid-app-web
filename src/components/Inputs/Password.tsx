import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useField } from '@unform/core';

import zxcvbn from 'zxcvbn';

import { IconType } from 'react-icons';

import { FiAlertCircle } from 'react-icons/fi';
import { Error } from './styles';
import { Container, SubContainer, PasswordForce } from './stylesPass';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  containerStyle?: object;
  icon?: IconType;
  dark?: boolean;
  label?: string;
}
const Input: React.FC<InputProps> = ({
  name,
  containerStyle = {},
  icon: Icon,
  dark = true,
  label,
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isField, setIsField] = useState(false);
  const [value, setValue] = useState<string>();
  const [force, setForce] = useState(0);
  const { fieldName, defaultValue, registerField, error } = useField(name);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    setIsField(!!inputRef.current?.value);
  }, []);

  useEffect(() => {
    if (value === undefined) return;
    const f = (100 * zxcvbn(value).score) / 4;

    setForce(f);
  }, [value]);
  useEffect(() => {
    registerField({
      name: fieldName,
      path: 'value',
      ref: inputRef.current,
    });
  }, [fieldName, registerField]);

  return (
    <Container
      style={containerStyle}
      isFocused={isFocused}
      isFilled={isField}
      isErrored={!!error}
      dark={dark}
    >
      {label && <label htmlFor={fieldName}>{label}</label>}
      <div>
        <SubContainer dark={dark}>
          {Icon && <Icon size={16} />}

          <input
            name={name}
            onFocus={() => setIsFocused(true)}
            onBlur={handleInputBlur}
            id={fieldName}
            ref={inputRef}
            defaultValue={defaultValue}
            onChange={e => setValue(e.target.value)}
            {...rest}
          />

          {error && (
            <Error title={error}>
              <FiAlertCircle color="#c53030" size={20} />
            </Error>
          )}
        </SubContainer>
        <PasswordForce value={force} max="100" dark={dark}>
          Força:
          {force}
        </PasswordForce>
      </div>
    </Container>
  );
};

export default Input;
