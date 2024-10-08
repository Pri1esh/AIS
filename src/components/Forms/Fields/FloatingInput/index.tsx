import { CustomIcon } from '@components';
import { IFloatingInput } from '@interfaces';
import { useRef, useState } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Error from '../Error';
import styles from './floatingInput.module.scss';

const FloatingInput = (props: IFloatingInput) => {
  const {
    type,
    // eslint-disable-next-line react-hooks/rules-of-hooks
    inputRef = useRef(null), //NOSONAR
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onChange = () => {},
    placeholder = 'name',
    label = '',
    disabled = false,
    controlProps,
    name,
    errorMessage = '',
    classname = '',
    isClear = true,
    borderOnFocus = true,
    onClear,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onBlur = () => {},
    maxLen,
  } = props;

  const [showClear, setShowClear] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');

  const clearInput = () => {
    setInputValue('');
    isClear && onClear && onClear();
    setShowClear(false);
    onChange && onChange('');
  };

  const onChangeClear = (e: any) => {
    if (e.target.name === 'MobileNumber') {
      if (e.target.value.replace(/\D/g, '') === '') {
        setShowClear(false);
      } else {
        setShowClear(true);
      }
      setInputValue(e.target.value.replace(/\D/g, ''));
    } else if (e.target.value === '') {
      setShowClear(false);
      setInputValue(e.target.value);
    } else {
      setInputValue(e.target.value);
      setShowClear(true);
    }
  };

  const onFocusClear = (e: any) => {
    if (e.target.value === '') {
      setShowClear(false);
    } else {
      setShowClear(true);
    }
  };

  return (
    <div className={`${styles.wrapper} ${classname}`}>
      <FloatingLabel
        className={`${styles.wrapper} ${classname} ${errorMessage ? styles.error : ''}  ${classname}`}
        label={label}
        controlId={name}
      >
        <Form.Control
          as={type}
          ref={inputRef}
          id={name}
          autoComplete="off"
          maxLength={maxLen}
          onChange={(e) => {
            onChange(e);
            isClear && onChangeClear(e);
          }}
          onFocus={(e) => onFocusClear(e)}
          placeholder={placeholder}
          disabled={disabled}
          name={name}
          onBlur={() => {
            onBlur();
            setTimeout(() => setShowClear(false), 200);
          }}
          className={`${styles.floatingInput} ${borderOnFocus ? styles.border : ''} `}
          value={inputValue}
          {...controlProps}
        />
        {isClear && showClear && (
          <div
            className={styles.clearIcon}
            role="presentation"
            onMouseDown={() => {
              clearInput();
            }}
            onClick={clearInput}
          >
            <CustomIcon iconName={'close'} />
          </div>
        )}
      </FloatingLabel>
      {errorMessage && <Error errorMessage={errorMessage} />}
    </div>
  );
};

export default FloatingInput;
