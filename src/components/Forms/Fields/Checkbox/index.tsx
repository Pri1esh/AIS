import { ICheckbox } from '@interfaces';
import { GTMHelper } from '@utils';
import { useEffect } from 'react';
import { Controller } from 'react-hook-form';
import Error from '../Error';
import styles from './checkbox.module.scss';

const Checkbox = (props: ICheckbox) => {
  const { control, errors, classname = '', compData, setValue = null } = props;
  const { url = '', target = '', fieldName, fieldID, placeholder, errorMessages, selected = false, gtmData } = compData;

  useEffect(() => {
    setValue && setValue(fieldName, selected);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`${styles.checkData} ${classname}`}>
      <div className={styles.inputWrapper}>
        <Controller
          control={control}
          name={fieldName}
          rules={{
            required: errorMessages?.requiredFieldErrorMessage,
          }}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <input
              type="checkbox"
              className="form-check-input"
              id={fieldID}
              checked={value}
              onBlur={onBlur}
              onChange={onChange}
              ref={ref}
            />
          )}
        />
        <label className="form-check-label" htmlFor={fieldID}>
          {url ? (
            <a
              href={url}
              target={target}
              onClick={() => {
                GTMHelper({
                  ...gtmData,
                });
              }}
            >
              {placeholder}
            </a>
          ) : (
            <>{placeholder}</>
          )}
        </label>
      </div>
      {errors[fieldName] && <Error errorMessage={errorMessages?.requiredFieldErrorMessage} />}
    </div>
  );
};

export default Checkbox;
