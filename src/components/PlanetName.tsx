import { useContext, useEffect, useState } from "react";
import ErrorMessage from "./ErrorMessage";
import { UpdateFormErrorsContext } from "./FormErrorsContext";

interface PlanetNameProps {
  setPlanetName: (planetName: string) => void;
  planetName: string;
}

const PlanetName: React.FC<PlanetNameProps> = ({setPlanetName, planetName}) => {
  const compName = "PlanetName";
  const updateFormErrors = useContext(UpdateFormErrorsContext);
  const [ errorMessage, setErrorMessage ] = useState<string | undefined>();
  useEffect(() => {
    const errorMessage = validate(planetName);
    setErrorMessage(errorMessage);
    updateFormErrors({
      componentName: compName,
      hasErrors: errorMessage !== undefined,
    });
  }, [planetName]);

  const validate = (value: string) : string | undefined => {
    if (/^[a-zA-Z0-9]+$/.test(value) === false) {
      return "❌ Planet name must only contain letters and numbers";
    } if (value.length < 2 || value.length > 49) {
      return "❌ Planet name must have length between 2 and 49";
    }
    return undefined;
  };

  return (
    <div>
      <label htmlFor="planet-name">Planet Name:</label>
      <input
        type="text"
        id="planet-name"
        aria-label="Planet Name"
        value={planetName}
        onChange={(e) => {
          setPlanetName(e.target.value);
        }}
      />
      <ErrorMessage errorMessage={errorMessage} />
    </div>
  );
};

export default PlanetName;
