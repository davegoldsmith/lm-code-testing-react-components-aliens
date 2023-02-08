import { useContext, useEffect, useState } from "react";
import ErrorMessage from "./ErrorMessage";
import { UpdateFormErrorsContext } from "./FormErrorsContext";

interface SpeciesNameProps {
  setSpeciesName: (speciesName: string) => void;
  speciesName: string;
}

const SpeciesName: React.FC<SpeciesNameProps> = ({
  speciesName,
  setSpeciesName,
}) => {
  const compName = "SpeciesName";
  const updateFormErrors = useContext(UpdateFormErrorsContext);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  useEffect(() => {
    const errorMessage = validate(speciesName);
    setErrorMessage(errorMessage);
    updateFormErrors({
      componentName: compName,
      hasErrors: errorMessage !== undefined,
    });
  }, [speciesName]);

  // const validate : (value : string) => string | undefined = (value) => {
  const validate = (value: string): string | undefined => {
    if (/^[A-Za-z\s]*$/.test(value) === false) {
      return "❌ Species Name must only contain only letters";
    }
    if (value.length < 3 || value.length > 23) {
      return "❌ Species Must have length between 3 and 23";
    }
    return undefined;
  };

  return (
    <div>
      <label htmlFor="species-name">Species Name:</label>
      <input
        aria-label="Species Name"
        type="text"
        id="species-name"
        value={speciesName}
        onChange={(e) => {
          setSpeciesName(e.target.value);
        }}
      />
      <ErrorMessage errorMessage={errorMessage} />
    </div>
  );
};

export default SpeciesName;
