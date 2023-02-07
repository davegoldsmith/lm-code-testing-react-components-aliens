import { useState } from "react";
import ErrorMessage from "./ErrorMessage";

interface SpeciesNameProps {
  setSpeciesName: (speciesName: string) => void;
  initialValue: string;
}

const SpeciesName: React.FC<SpeciesNameProps> = (props) => {
  const [ errorMessage, setErrorMessage ] = useState<string | undefined>();

  // const validate : (value : string) => string | undefined = (value) => {
  const validate = (value: string) : string | undefined => {
    if (/^[A-Za-z\s]*$/.test(value) === false) {
      return "❌ Species Name must only contain only letters";
    } if (value.length < 3 || value.length > 23) {
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
        value={props.initialValue}
        onChange={(e) => {
          const errorMessage = validate(e.target.value);
          setErrorMessage(errorMessage);
          props.setSpeciesName(e.target.value);
        }}
        
      />
      <ErrorMessage errorMessage={errorMessage} />
    </div>
  );
};

export default SpeciesName;
