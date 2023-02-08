import { useContext, useEffect, useState } from "react";
import ErrorMessage from "./ErrorMessage";
import { UpdateFormErrorsContext } from "./FormErrorsContext";

interface WhatIs2Plus2Props {
  setWhatIs2Plus2: (setWhatIs2Plus2Choice: string) => void;
  whatIs2Plus2: string;
}

const WhatIs2Plus2: React.FC<WhatIs2Plus2Props> = ({setWhatIs2Plus2, whatIs2Plus2}) => {
  const compName = "WhatIs2Plus2";
  const updateFormErrors = useContext(UpdateFormErrorsContext);
  const [ errorMessage, setErrorMessage ] = useState<string | undefined>();
  useEffect(() => {
    const errorMessage = validate(whatIs2Plus2);
    setErrorMessage(errorMessage);
    updateFormErrors({
      componentName: compName,
      hasErrors: errorMessage !== undefined,
    });
  }, [whatIs2Plus2]);

  const validate = (value: string) : string | undefined => {
    if (value === "Not 4") {
      return "❌ The answer for What is 2 + 2 can only be 4 (obvs)";
    }
    return undefined;
  };

  return (
    <div>
      <label htmlFor="what-is-2+2">What is 2+2?</label>
      <select
        aria-label="What Is 2 + 2"
        id="what-is-2+2"
        value={whatIs2Plus2}
        onChange={(e) => {
          setWhatIs2Plus2(e.target.value);
        }}
      >
        <option value="4">4</option>
        <option value="Not 4">Not 4</option>
      </select>
      <ErrorMessage errorMessage={errorMessage} />
    </div>
  );
};

export default WhatIs2Plus2;