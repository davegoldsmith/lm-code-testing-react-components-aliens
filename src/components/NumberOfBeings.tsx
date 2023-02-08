import { useState } from "react";
import ErrorMessage from "./ErrorMessage";

interface NumberOfBeingsProps {
  setNumberOfBeings: (numberOfBeings: number) => void;
  numberOfBeings: number;
}

const NumberOfBeings: React.FC<NumberOfBeingsProps> = (props) => {
  const [ errorMessage, setErrorMessage ] = useState<string | undefined>();

  const validate = (value: number) : string | undefined => {
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
        value={props.numberOfBeings === 0 ? "" : props.numberOfBeings}
        onChange={(e) => {
          let value = 0;
          if (e.target.value) {
            value = parseInt(e.target.value);
            if (isNaN(value)) {
              value = 0;
            }
          }
          const errorMessage = validate(value);
          setErrorMessage(errorMessage);
          props.setNumberOfBeings(value);
        }}
      />
      <ErrorMessage errorMessage={errorMessage} />
    </div>
  );
};

export default NumberOfBeings;
