import { IFieldData, ISelectDropdownOption } from '@interfaces';

export const dropdownInputValidator = (formFieldData: IFieldData, value: ISelectDropdownOption) => {
  const { requiredFieldErrorMessage } = formFieldData?.errorMessages;

  return value ? true : requiredFieldErrorMessage;
};
