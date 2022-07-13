import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from 'react';
import { useField } from '@unform/core';

import { IconBaseProps } from 'react-icons';

import { FiAlertCircle } from 'react-icons/fi';
import { FaRegCopy } from 'react-icons/fa';

import CopyToClipboard from 'react-copy-to-clipboard';

import { Container, Error, Copy } from './styles';
import { useToast } from '../../hooks/toast';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  containerStyle?: object;
  icon?: React.ComponentType<IconBaseProps>;
  dark?: boolean;
  copy?: boolean;
  border?: boolean;
  label?: string;
}
const Input: React.FC<InputProps> = ({
  name,
  containerStyle = {},
  icon: Icon,
  dark = true,
  copy = false,
  border = true,
  label,

  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isField, setIsField] = useState(false);
  const { fieldName, defaultValue, registerField, error } = useField(name);

  const { addToast } = useToast();

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    setIsField(!!inputRef.current?.value);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      path: 'value',
      ref: inputRef.current,
    });
  }, [fieldName, registerField]);

  const defValue = useMemo(() => {
    if (defaultValue as Date) {
      return defaultValue.split('T')[0];
    }
    return defaultValue;
  }, [defaultValue]);

  const copied = useCallback(() => {
    addToast({
      type: 'copied',
      title: 'Copiado para área de transferencia',
      time: 1000,
    });
  }, [addToast]);

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
      <div className={rest.disabled ? 'disabled' : ''}>
        {Icon && <Icon size={16} />}

        <input
          name={name}
          onFocus={() => setIsFocused(true)}
          onBlur={handleInputBlur}
          id={fieldName}
          ref={inputRef}
          defaultValue={defValue}
          {...rest}
        />
        {copy && (
          <CopyToClipboard text={`${inputRef.current?.value}`} onCopy={copied}>
            <Copy dark={dark}>
              <FaRegCopy />
            </Copy>
          </CopyToClipboard>
        )}
        {error && (
          <Error title={error}>
            <FiAlertCircle color="#c53030" size={20} />
          </Error>
        )}
      </div>
    </Container>
  );
};

export default Input;
