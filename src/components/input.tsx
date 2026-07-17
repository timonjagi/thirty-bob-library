import React, { useEffect, useImperativeHandle, useRef, useState } from 'react';
import {
  TextBoxCommonBase,
  InputBase,
  TextBoxDisable,
  TextBoxEnable,
} from 'components/utils/theme';

export interface Props {
  value?: string;
  initialValue?: string;
  placeholder?: string;
  readOnly?: boolean;
  disabled?: boolean;
  className?: string;
  id?: string;
  name?: string;
  label?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  [key: string]: any;
}

export const defaultProps = {
  disabled: false,
  readOnly: false,
  className: '',
  placeholder: '',
  initialValue: '',
};

type NativeAttrs = Omit<React.InputHTMLAttributes<any>, keyof Props>;

export type InputPropsType = Props & NativeAttrs;

const Input = React.forwardRef<
  HTMLInputElement,
  React.PropsWithChildren<InputPropsType>
>(
  (
    {
      className,
      id,
      value,
      name,
      label,
      initialValue,
      disabled,
      readOnly,
      placeholder,
      onChange,
      onFocus,
      onBlur,
      ...props
    },
    ref: React.Ref<HTMLInputElement | null>
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    useImperativeHandle(ref, () => inputRef.current);

    const [initValue, setInitValue] = useState<string>(initialValue);

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled || readOnly) return;
      setInitValue(event.target.value);
      onChange && onChange(event);
    };

    const focusHandler = (e: React.FocusEvent<HTMLInputElement>) => {
      onFocus && onFocus(e);
    };
    const blurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
      onBlur && onBlur(e);
    };

    useEffect(() => {
      if (value === undefined) return;
      setInitValue(value);
    }, [value]);

    const classNames =
      InputBase +
      ' ' +
      TextBoxCommonBase +
      ' ' +
      (disabled === true ? TextBoxDisable : TextBoxEnable) +
      ' ' +
      className;

    return (
      <div className="mb-16px">
        {label && (
          <label htmlFor={name} className="block text-14px font-medium text-gray-700 mb-6px">
            {label}
          </label>
        )}
        <input
          ref={inputRef}
          type={props.type || 'text'}
          placeholder={placeholder}
          className={classNames}
          id={name}
          value={initValue}
          disabled={disabled}
          readOnly={readOnly}
          onChange={changeHandler}
          onFocus={focusHandler}
          onBlur={blurHandler}
          autoComplete="off"
          name={name}
          {...props}
        />
      </div>
    );
  }
);

Input.defaultProps = defaultProps;

export default Input;
