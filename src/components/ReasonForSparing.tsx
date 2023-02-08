import { useState } from "react";
import ErrorMessage from "./ErrorMessage";

interface ReasonForSparingProps {
  setReasonForSparing: (reasonForSparing: string) => void;
  reasonForSparing: string;
}

const ReasonForSparing: React.FC<ReasonForSparingProps> = (props) => {

  const [ errorMessage, setErrorMessage ] = useState<string | undefined>();

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
        value={props.reasonForSparing}
        rows={4}
        cols={10}
        onChange={(e) => {
          const errorMessage = validate(e.target.value);
          setErrorMessage(errorMessage);          
          props.setReasonForSparing(e.target.value);
        }}
      ></textarea>
      <ErrorMessage errorMessage={errorMessage} />
    </div>
          
  );
};

export default ReasonForSparing;
