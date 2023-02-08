import { useContext } from "react";
import { FormErrorsContext } from "./FormErrorsContext";


const SubmitW12MForm: React.FC = () => {
  const formErrors = useContext(FormErrorsContext);
  /**
   * Checks errors on each component to see if submit is allowed
   *
   * @returns true if there are no validation errors otherwise false
   */
  const canSubmit = (): boolean => {
    const compErr = formErrors.find(
      (componentError) => componentError.hasErrors === true
    );
    return compErr !== undefined;
  };

  return (
    <div>
      <input
        disabled={canSubmit() === true}
        type="submit"
        value="Submit"
        id="submit-button"
        aria-label="Submit"
      />
    </div>
  );
};

export default SubmitW12MForm;