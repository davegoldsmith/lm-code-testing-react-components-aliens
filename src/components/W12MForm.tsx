import { useState } from "react";
import W12MHeader from "./W12MHeader";
import SpeciesName from "./SpeciesName";

const W12MForm = () => {
  const [speciesName, setSpeciesName] = useState<string>("");

  return (
    <section className="w12MForm">
      <W12MHeader />
      <SpeciesName
        setSpeciesName={(species: string) => setSpeciesName(species)}
        initialValue={speciesName}
      />
    </section>
  );
};

export default W12MForm;
