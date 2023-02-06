import { useState } from "react";
import W12MHeader from "./W12MHeader";
import SpeciesName from "./SpeciesName";
import PlanetName from "./PlanetName";
import NumberOfBeings from "./NumberOfBeings";
import WhatIs2Plus2 from "./WhatIs2Plus2";
import ReasonForSparing from "./ReasonForSparing";
import FormSummary from "./FormSummary";

const W12MForm = () => {
  const [speciesName, setSpeciesName] = useState<string>("");
  const [planetName, setPlanetName] = useState<string>("");
  const [numberOfBeings, setNumberOfBeings] = useState<number>(0);
  const [whatIs2Plus2, setWhatIs2Plus2] = useState<string>("Not 4");
  const [reasonForSparing, setReasonForSparing] = useState<string>("");
  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  return (
    <section className="w12MForm">
      <W12MHeader />
      <SpeciesName
        setSpeciesName={(species: string) => setSpeciesName(species)}
        initialValue={speciesName}
      />
      <PlanetName
        setPlanetName={(planetName: string) => setPlanetName(planetName)}
        initialValue={planetName}
      />
      <NumberOfBeings
        setNumberOfBeings={(numberOfBeings: number) =>
          setNumberOfBeings(numberOfBeings)
        }
        initialValue={numberOfBeings}
      />
      <WhatIs2Plus2
        setWhatIs2Plus2={(whatIs2Plus2: string) =>
          setWhatIs2Plus2(whatIs2Plus2)
        }
        initialValue={whatIs2Plus2}
      />
      <ReasonForSparing
        setReasonForSparing={(reasonForSparing: string) =>
          setReasonForSparing(reasonForSparing)
        }
        initialValue={reasonForSparing}
      />
      <button
        type="submit"
        id="submit-button"
        aria-label="Submit"
        onClick={() => {
          setIsSubmit(true);
        }}
      >
        Submit
      </button>
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
    </section>
  );
};

export default W12MForm;
