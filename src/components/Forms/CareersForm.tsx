import { ENDPOINT, postAPI } from '@api-manager';
import { CustomToast } from '@components';
import { CareerFormState } from '@enum';
import { ICareerForm, IFieldData, IFileInputSelected, IMobileNumberData, ISelectDropdownOption } from '@interfaces';
import { formValidator } from '@logic/CareerForm';
import { GTMHelper } from '@utils';
import React, { useEffect, useRef, useState } from 'react';
import { Container, Form, Row } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import styles from './careerForm.module.scss';
import { Button, Checkbox, FileInput, FloatingInput, MobileNumberInput, SelectDropdown } from './Fields';
import ReCaptcha from './Fields/ReCaptcha';

const CareersForm = (props: ICareerForm) => {
  const { compData } = props;
  const [formState, setFormState] = useState('');
  const [toastData, setToastData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const reCaptchaRef = useRef<any>(null);
  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    reset,
    setFocus,
    formState: { errors },
  } = useForm<any>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });

  useEffect(() => {
    const foundError = Object.keys(errors).reduce((field: any, a) => {
      return !!errors[field] ? field : a;
    }, null);

    if (foundError) {
      setFocus(foundError);
    }
  }, [errors, setFocus]);

  const clearToast = () => {
    setTimeout(() => {
      setFormState('');
      setToastData('');
      clearForm();
    }, 10000);
  };

  const clearForm = () => {
    setFormSubmitted(!formSubmitted);
    reset();
    reCaptchaRef?.current?.reset();
    setLoading(false);
  };

  const onSubmit = (data: any) => {
    setFormState(CareerFormState.progress);
    setLoading(true);
    setToastData(compData?.progressData);
    const formData = new FormData();
    data?.Name && formData.append('Name', data?.Name);
    data?.Email && formData.append('Email', data?.Email);
    data?.MobileNumber?.phoneNumber &&
      formData.append('MobileNumber', data?.MobileNumber?.countryCode + data?.MobileNumber?.phoneNumber);
    data?.CurrentOrganisation && formData.append('Organization', data?.CurrentOrganisation);
    data?.InterestedPosition?.label && formData.append('Position', data?.InterestedPosition?.label);
    data?.TotalExperience?.label && formData.append('Experience', data?.TotalExperience?.label);
    data?.AttachResume?.name && formData.append('resume', data?.AttachResume, data?.AttachResume?.name);
    data?.reCaptcha && formData.append('g-reCAPTCHA-response', data?.reCaptcha);
    data?.TermsAndConditions && formData?.append('Agreement', data?.TermsAndConditions);

    setTimeout(() => {
      postAPI(ENDPOINT.CLIENT.postForm, formData, compData?.antiforgeryToken)
        .then((res) => {
          if (res?.[0]?.ErrorMessage || res?.ErrorMessage) {
            formSubmitFailed(data, res?.[0]?.ErrorMessage || res?.ErrorMessage);
          } else {
            formSubmitSuccess(data);
            clearForm();
          }
        })
        .catch((error) => {
          formSubmitFailed(data, error?.message);
        });
      setLoading(false);
    }, 1000);
  };

  const formSubmitSuccess = (data: any) => {
    GTMHelper({
      event: compData?.formGTMData?.submitEvent,
      category: compData?.formGTMData?.gtmCategory,
      sub_category: compData?.formGTMData?.gtmSubCategory,
      page_type: compData?.formGTMData?.pageType,
      label: compData?.submitButton?.buttonText,
      position_interested: data?.InterestedPosition,
      experience: data?.TotalExperience,
      current_organisation: data?.CurrentOrganisation,
      resume_flag: data?.AttachResume ? 1 : 0,
      terms_flag: data?.TermsAndConditions ? 1 : 0,
    });
    setFormState(CareerFormState.success);
    setToastData(compData?.thankYouData);
    clearToast();
  };

  const formSubmitFailed = (data: any, errorMessage: string) => {
    GTMHelper({
      event: compData?.formGTMData?.failEvent,
      category: compData?.formGTMData?.gtmCategory,
      sub_category: compData?.formGTMData?.gtmSubCategory,
      page_type: compData?.formGTMData?.pageType,
      label: compData?.submitButton?.buttonText,
      position_interested: data?.InterestedPosition,
      experience: data?.TotalExperience,
      current_organisation: data?.CurrentOrganisation,
      resume_flag: data?.AttachResume ? 1 : 0,
      terms_flag: data?.TermsAndConditions ? 1 : 0,
      error_text: errorMessage || 'Network Error.',
    });
    setFormState(CareerFormState.error);
    setToastData(compData?.formFailData);
    clearToast();
  };

  const getInputField = (formField: IFieldData, onChange: any, onBlur: any, value: any, ref: any) => {
    switch (formField?.fieldType) {
      case 'text':
        return (
          <FloatingInput
            label={formField?.placeholder}
            onChange={(e: { target: { value: string } }) => onChange(e?.target?.value)}
            errorMessage={errors?.[formField?.fieldName || '']?.message as string}
            isClear={formField?.isClear}
            onClear={() => onChange('')}
            onBlur={onBlur}
            name={formField?.fieldName || ''}
            classname={styles.maxWidth}
            maxLen={formField?.maxAllowedLength}
            inputRef={ref}
          />
        );
      case 'phone':
        return (
          <MobileNumberInput
            label={formField?.placeholder}
            onChangeMobileNumber={(e: IMobileNumberData) => onChange(e)}
            onBlur={onBlur}
            errorMessage={errors?.[formField?.fieldName || '']?.message as string}
            name={formField?.fieldName}
            classname={styles.maxWidth}
            inputRef={ref}
          />
        );
      case 'dropdown':
        return (
          <SelectDropdown
            setSelected={(e: ISelectDropdownOption | null): void => {
              onChange(e);
            }}
            selected={value}
            errorMessage={errors?.[formField?.fieldName || '']?.message as string}
            placeholder={formField?.placeholder}
            onBlur={onBlur}
            classname={styles.maxWidth}
            options={formField?.fieldOptions}
            inputRef={ref}
          />
        );
      case 'file':
        return (
          <FileInput
            selected={value}
            setSelected={(e: IFileInputSelected | null) => onChange(e)}
            label={formField?.placeholder}
            description={formField?.fieldDescription}
            onBlur={onBlur}
            errorMessage={errors?.[formField?.fieldName || '']?.message as string}
            classname={styles.maxWidth}
            inputRef={ref}
          />
        );
      default:
        return <></>;
    }
  };
  return (
    <div
      className={`${styles.wrapper} ${compData?.theme?.includes('aliceBlue') ? styles.lightBlueTheme : ''}`}
      id={compData?.sectionID}
    >
      <Container>
        <CustomToast show={formState} setShow={setFormState} compData={toastData} onClose={clearForm} />
        {compData?.sectionHeading && <h2 className={styles.formHeading}>{compData?.sectionHeading}</h2>}
        <Form onSubmit={handleSubmit(onSubmit)}>
          <fieldset disabled={loading}>
            {compData?.formFields && compData?.formFields?.length > 0 && (
              <Row className={styles.formFields}>
                {compData?.formFields?.map((formField: IFieldData, index: number) =>
                  formField && formField?.fieldType ? (
                    <React.Fragment key={`${formField?.fieldName + index}`}>
                      <Controller
                        key={formSubmitted?.toString()}
                        control={control}
                        name={formField?.fieldName || ''}
                        rules={{
                          required: formField?.errorMessages?.requiredFieldErrorMessage,
                          validate: () => formValidator(formField, getValues(formField?.fieldName)),
                        }}
                        render={({ field: { onChange, onBlur, value, ref } }) =>
                          getInputField(formField, onChange, onBlur, value, ref)
                        }
                      />
                    </React.Fragment>
                  ) : (
                    <></>
                  ),
                )}
              </Row>
            )}

            {compData?.checkboxField && (
              <Checkbox
                key={formSubmitted?.toString()}
                control={control}
                errors={errors}
                setValue={setValue}
                compData={compData?.checkboxField}
              />
            )}
            {compData?.reCaptchaField && compData?.reCaptchaField?.fieldName && (
              <ReCaptcha
                control={control}
                controlName={compData?.reCaptchaField?.fieldName || ''}
                errors={errors}
                errorMessage={compData?.reCaptchaField?.errorMessages?.requiredFieldErrorMessage}
                reCaptchaRef={reCaptchaRef}
              />
            )}

            {compData?.submitButton && (
              <Button type="submit" className={styles.button} loading={loading}>
                {compData?.submitButton?.buttonText}
              </Button>
            )}
          </fieldset>
        </Form>
      </Container>
    </div>
  );
};
export default CareersForm;
