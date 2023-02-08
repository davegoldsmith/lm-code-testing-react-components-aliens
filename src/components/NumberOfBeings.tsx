import { useContext, useEffect, useState } from "react";
import ErrorMessage from "./ErrorMessage";
import { UpdateFormErrorsContext } from "./FormErrorsContext";

interface NumberOfBeingsProps {
  setNumberOfBeings: (numberOfBeings: number) => void;
  numberOfBeings: number;
}

const NumberOfBeings: React.FC<NumberOfBeingsProps> = ({
  setNumberOfBeings,
  numberOfBeings,
}) => {
  const compName = "NumberOfBeings";
  const updateFormErrors = useContext(UpdateFormErrorsContext);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  useEffect(() => {
    const errorMessage = validate(numberOfBeings);
    setErrorMessage(errorMessage);
    updateFormErrors({
      componentName: compName,
      hasErrors: errorMessage !== undefined,
    });
  }, [numberOfBeings]);

  const validate = (value: number): string | undefined => {
    if (value < 1000000000) {
      return "❌ Number of beings must be greater than 1 billion";
    }
    return undefined;
  };

  return (
    <div>
      <label htmlFor="number-of-beings">Number Of Beings:</label>
      <input
        type="text"
        id="number-of-beings"
        aria-label="Number of Beings"
        value={numberOfBeings === 0 ? "" : numberOfBeings}
        onChange={(e) => {
          let value = 0;
          if (e.target.value) {
            value = parseInt(e.target.value);
            if (isNaN(value)) {
              value = 0;
            }
          }
          setNumberOfBeings(value);
        }}
      />
      <ErrorMessage errorMessage={errorMessage} />
    </div>
  );
};

export default NumberOfBeings;
