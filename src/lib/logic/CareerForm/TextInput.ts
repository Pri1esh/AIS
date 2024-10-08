import { IFieldData } from '@interfaces';
import { emailValidatorRegex, nameValidatorRegex } from '@utils';

export const textInputValidator = (formFieldData: IFieldData, value: string) => {
  const { requiredFieldErrorMessage, maxLengthErrorMessage, minLengthErrorMessage, regexErrorMessage } =
    formFieldData?.errorMessages;

  if (!value) {
    return requiredFieldErrorMessage;
  }
  const regex = formFieldData?.fieldName?.toLowerCase()?.includes('email') ? emailValidatorRegex : nameValidatorRegex;
  if (!regex?.test(value)) return regexErrorMessage;

  if (formFieldData?.maxAllowedLength && value?.length > formFieldData?.maxAllowedLength) {
    return maxLengthErrorMessage;
  } else if (formFieldData?.minRequiredLength && value?.length < formFieldData?.minRequiredLength) {
    return minLengthErrorMessage;
  }
  return true;
};
