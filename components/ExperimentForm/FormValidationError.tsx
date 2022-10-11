import React from "react";

interface FormValidationErrorProps {
  inputFieldError: string | undefined;
  touched?: boolean;
}

export const FormValidationError: React.FC<FormValidationErrorProps> = ({
  inputFieldError,
  touched,
}) => {
  return (
    <>{inputFieldError && touched ? <div>{inputFieldError}</div> : null}</>
  );
};
