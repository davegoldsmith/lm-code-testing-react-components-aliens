import { useContext, useEffect, useState } from "react";
import ErrorMessage from "./ErrorMessage";
import { UpdateFormErrorsContext } from "./FormErrorsContext";

interface ReasonForSparingProps {
  setReasonForSparing: (reasonForSparing: string) => void;
  reasonForSparing: string;
}

const ReasonForSparing: React.FC<ReasonForSparingProps> = ({setReasonForSparing, reasonForSparing}) => {
  const compName = "ReasonForSparing";
  const updateFormErrors = useContext(UpdateFormErrorsContext);
  const [ errorMessage, setErrorMessage ] = useState<string | undefined>();
  useEffect(() => {
    const errorMessage = validate(reasonForSparing);
    setErrorMessage(errorMessage);
    updateFormErrors({
      componentName: compName,
      hasErrors: errorMessage !== undefined,
    });
  }, [reasonForSparing]);

  const validate = (value: string) : string | undefined => {
    if (value.length < 17 || value.length > 153) {
      return "❌ Reason for Sparing must have length between 17 and 153";
    }
    return undefined;
  };

  return (
    <div>
      <label htmlFor="reason-for-sparing">Reason for Sparing</label>
      <textarea
        aria-label="Reason for Sparing"
        id="reason-for-sparing"
        value={reasonForSparing}
        rows={4}
        cols={10}
        onChange={(e) => {                 
          setReasonForSparing(e.target.value);
        }}
      ></textarea>
      <ErrorMessage errorMessage={errorMessage} />
    </div>
          
  );
};

export default ReasonForSparing;
