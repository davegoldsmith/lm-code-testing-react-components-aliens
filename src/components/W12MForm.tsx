import { useState } from "react";
import W12MHeader from "./W12MHeader";
import SpeciesName from "./SpeciesName";
import PlanetName from "./PlanetName";

const W12MForm = () => {
  const [speciesName, setSpeciesName] = useState<string>("");
	const [planetName, setPlanetName] = useState<string>("");

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
    </section>
  );
};

export default W12MForm;
