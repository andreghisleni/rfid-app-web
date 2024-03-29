import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useField } from '@unform/core';
import ReactInputMask, { Props } from 'react-input-mask';

import { IconType } from 'react-icons';

import { FiAlertCircle } from 'react-icons/fi';
import { Container, Error } from './styles';

interface InputProps extends Props {
  name: string;
  containerStyle?: object;
  icon?: IconType;
  maskPlaceholder?: string;
  dark?: boolean;
  border?: boolean;
  label?: string;
  type?: 'cpf/cnpj';
}
const InputMask: React.FC<InputProps> = ({
  name,
  containerStyle = {},
  icon: Icon,
  maskPlaceholder = '_',
  dark = true,
  border = true,
  label,
  type,
  mask,
  onChange,
  ...rest
}) => {
  const inputRef = useRef<ReactInputMask>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isField, setIsField] = useState(false);
  const [currentMask, setCurrentMask] = useState<string>(
    `${type === 'cpf/cnpj' ? '999.999.999-999' : mask}`,
  );

  const { fieldName, defaultValue, registerField, error } = useField(name);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    setIsField(!!inputRef.current?.props.value);
  }, []);
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
      setValue(ref: any, value: string) {
        ref.setInputValue(value);
      },
      clearValue(ref: any) {
        ref.setInputValue('');
      },
    });
  }, [fieldName, registerField]);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    event => {
      if (type === 'cpf/cnpj')
        setCurrentMask(
          event.target.value.length < 15
            ? '999.999.999-999'
            : '999.999.999/9999-999',
        );
      onChange && onChange(event);
    },
    [type, setCurrentMask, onChange],
  );

  return (
    <Container
      style={containerStyle}
      isFocused={isFocused}
      isFilled={isField}
      isErrored={!!error}
      dark={dark}
      border={border}
    >
      {label && <label htmlFor={fieldName}>{label}</label>}
      <div>
        {Icon && <Icon size={16} />}

        <ReactInputMask
          name={name}
          onFocus={() => setIsFocused(true)}
          onBlur={handleInputBlur}
          id={fieldName}
          ref={inputRef}
          maskChar={maskPlaceholder}
          defaultValue={defaultValue}
          mask={currentMask}
          onChange={handleChange}
          {...rest}
        />
        {error && (
          <Error title={error}>
            <FiAlertCircle color="#c53030" size={20} />
          </Error>
        )}
      </div>
    </Container>
  );
};

export default InputMask;
