import { useState } from "react";
import W12MHeader from "./W12MHeader";
import SpeciesName from "./SpeciesName";
import PlanetName from "./PlanetName";
import NumberOfBeings from "./NumberOfBeings";

const W12MForm = () => {
  const [speciesName, setSpeciesName] = useState<string>("");
	const [planetName, setPlanetName] = useState<string>("");
	const [numberOfBeings, setNumberOfBeings] = useState<number>(0);

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
        setNumberOfBeings={(numberOfBeings: number) => setNumberOfBeings(numberOfBeings)}
        initialValue={numberOfBeings}
      />					
    </section>
  );
};

export default W12MForm;
