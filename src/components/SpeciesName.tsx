interface SpeciesNameProps {
  setSpeciesName: (speciesName: string) => void;
  initialValue: string;
}

const SpeciesName: React.FC<SpeciesNameProps> = (props) => {
  return (
    <div>
      <label htmlFor="species-name">Species Name:</label>
      <input
        aria-label="Species Name"
        type="text"
        id="species-name"        
        value={props.initialValue}
        onChange={(e) => {
          props.setSpeciesName(e.target.value);
        }}
      />
    </div>
  );
};

export default SpeciesName;
