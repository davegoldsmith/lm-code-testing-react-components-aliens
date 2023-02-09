import React, { FormEvent, useState } from "react";
import W12MHeader from "./W12MHeader";
import SpeciesName from "./SpeciesName";
import PlanetName from "./PlanetName";
import NumberOfBeings from "./NumberOfBeings";
import WhatIs2Plus2 from "./WhatIs2Plus2";
import ReasonForSparing from "./ReasonForSparing";
import FormSummary from "./FormSummary";
import FormErrorsContextProvider, { ComponentError } from "./FormErrorsContext";
import SubmitW12MForm from "./SubmitW12MForm";

const handleSubmit = (e: FormEvent) => {
  e.preventDefault();
};

const W12MForm = ({ onSubmit = handleSubmit }) => {
  const [speciesName, setSpeciesName] = useState<string>("");
  const [planetName, setPlanetName] = useState<string>("");
  const [numberOfBeings, setNumberOfBeings] = useState<number>(0);
  const [whatIs2Plus2, setWhatIs2Plus2] = useState<string>("4");
  const [reasonForSparing, setReasonForSparing] = useState<string>("");
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<Array<ComponentError>>([]);

  /**
   * Updates the array of component errors, if a component's validation
   * fails then it is flagged as having errors. When validation passes
   * then the flag is set to false for that coponent.
   *
   * @param componentError the component and it's error status
   */
  const updateFormErrors = (componentError: ComponentError) => {
    if (
      formErrors.filter(
        (err) => err.componentName === componentError.componentName
      ).length === 0
    ) {
      // add new error
      setFormErrors([...formErrors, componentError]);
    } else {
      // replace the existing
      setFormErrors(
        formErrors.map((err) =>
          err.componentName === componentError.componentName
            ? componentError
            : err
        )
      );
    }
  };

  return (
    <FormErrorsContextProvider
      formErrors={formErrors}
      updateFormErrors={updateFormErrors}
    >
      <form
        className="w12MForm"
        onSubmit={(e: FormEvent) => {
          onSubmit(e);
          setIsSubmit(true);
        }}
      >
        <W12MHeader />
        <SpeciesName
          setSpeciesName={(species: string) => setSpeciesName(species)}
          speciesName={speciesName}
        />
        <PlanetName
          setPlanetName={(planetName: string) => setPlanetName(planetName)}
          planetName={planetName}
        />
        <NumberOfBeings
          setNumberOfBeings={(numberOfBeings: number) =>
            setNumberOfBeings(numberOfBeings)
          }
          numberOfBeings={numberOfBeings}
        />
        <WhatIs2Plus2
          setWhatIs2Plus2={(whatIs2Plus2: string) =>
            setWhatIs2Plus2(whatIs2Plus2)
          }
          whatIs2Plus2={whatIs2Plus2}
        />
        <ReasonForSparing
          setReasonForSparing={(reasonForSparing: string) =>
            setReasonForSparing(reasonForSparing)
          }
          reasonForSparing={reasonForSparing}
        />
        <SubmitW12MForm />
        {isSubmit === true && (
          <FormSummary
            speciesName={speciesName}
            planetName={planetName}
            numberOfBeings={numberOfBeings}
            whatIs2Plus2={whatIs2Plus2}
            reasonForSparing={reasonForSparing}
            isSubmit={isSubmit}
          />
        )}
      </form>
    </FormErrorsContextProvider>
  );
};

export default W12MForm;
