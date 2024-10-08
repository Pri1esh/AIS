import { CustomIcon } from '@components';
import { useDeviceType } from '@utils';
import { MouseEvent, useEffect, useRef, useState } from 'react';
import { Offcanvas } from 'react-bootstrap';
import { ISelectDropdown, ISelectDropdownOption } from 'src/lib/interfaces';
import Error from '../Error';
import styles from './selectDropdown.module.scss';
const SelectDropdown = (props: ISelectDropdown) => {
  const {
    options = [],
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setSelected = () => {},
    placeholder = 'select',
    errorMessage = '',
    selected = null,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onBlur = () => {},
    classname = '',
    // eslint-disable-next-line react-hooks/rules-of-hooks
    inputRef = useRef(null), //NOSONAR
  } = props;
  const selectedRef = useRef<HTMLDivElement>(null);
  const clearRef = useRef<HTMLSpanElement>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<ISelectDropdownOption | null>(selected);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const { deviceType } = useDeviceType();
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  const handleClickOutside = (e: any) => {
    if (
      selectedRef?.current &&
      clearRef?.current &&
      !selectedRef?.current?.contains(e.target) &&
      !clearRef?.current?.contains(e.target)
    ) {
      setOpen(false);
    }
  };
  const removeSelected = () => {
    setOpen(false);
    setShowDropdown(false);
    setSelected && setSelected(null);
    setSelectedValue(null);
  };
  const handleClick = (e: MouseEvent<HTMLLIElement>, item: ISelectDropdownOption) => {
    setSelected && setSelected(item);
    setSelectedValue(item);
    e.stopPropagation();
    setOpen(false);
    setShowDropdown(false);
  };

  const DropdownList = (
    <ul>
      {options.map((item: ISelectDropdownOption, index: number) => (
        <li
          key={`${item?.id + index}`}
          onClick={(e) => {
            handleClick(e, item);
          }}
          className={`${selectedValue?.id === item?.id ? styles.selected : ''}`}
        >
          <button type="button">{item?.label}</button>
        </li>
      ))}
    </ul>
  );

  return (
    <div className={`${styles.wrapper} ${classname}`}>
      <input className={'visually-hidden'} ref={inputRef} />
      <div
        className={`${styles.selectdropdown} ${errorMessage ? styles.error : ''}`}
        onClick={() => {
          setOpen(!open);
          setShowDropdown(!showDropdown);
        }}
        ref={selectedRef}
        onBlur={() => {
          onBlur();
          setOpen(false);
        }}
      >
        <span
          ref={clearRef}
          className={`${styles.selectarrow} ${
            deviceType == 'desktop' ? open && styles.selectClose : showDropdown && styles.selectClose
          } ${selectedValue ? styles.crossIcon : ''}`}
        >
          {deviceType === 'desktop' && selectedValue && open ? (
            <span onClick={removeSelected}>
              <CustomIcon iconName="close" classname={styles.close} />
            </span>
          ) : (
            <CustomIcon iconName="up" classname={styles.angleUp} />
          )}
        </span>
        <label className={selectedValue?.label?.length ? styles.selectfloatinglabel : ''}>{placeholder}</label>
        <div className={styles.selectvalue}>
          <span className={styles.selectvalueLabel}>{selectedValue?.label}</span>
        </div>

        {deviceType === 'mobile' ? (
          <Offcanvas
            show={showDropdown}
            className={styles.offcanvas}
            onHide={() => setShowDropdown(false)}
            placement={'bottom'}
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>
                <h3 className={styles.offcanvasHeading}>{placeholder}</h3>
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className={styles.offcanvasBody}>
              <div className={styles.dropDownoffCanvas}>{DropdownList}</div>
            </Offcanvas.Body>
          </Offcanvas>
        ) : (
          <div className={`${styles.dropdownbox} ${open ? styles.selectOpen : ''}`}>{DropdownList}</div>
        )}
      </div>
      {errorMessage && <Error errorMessage={errorMessage} />}
    </div>
  );
};
export default SelectDropdown;
