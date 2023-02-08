import React, { ReactElement } from "react";

export interface ComponentError {
  componentName : string;
  hasErrors: boolean;
}

interface FormErrorsProviderProps {
  children: ReactElement;
  formErrors: Array<ComponentError>;
  updateFormErrors: (compErr: ComponentError) => void;
}

export const FormErrorsContext = React.createContext(
  Array<ComponentError>());

export const UpdateFormErrorsContext = React.createContext(
  (compErr: ComponentError) => {}
);

const FormErrorsContextProvider : React.FC<FormErrorsProviderProps> =
({ children, formErrors, updateFormErrors }) => {
  return (
    <FormErrorsContext.Provider value={formErrors}>
    <UpdateFormErrorsContext.Provider value={updateFormErrors}>
      {children}
    </UpdateFormErrorsContext.Provider>
    </FormErrorsContext.Provider>
  );
};

export default FormErrorsContextProvider;