interface PlanetNameProps {
  setPlanetName: (planetName: string) => void;
  initialValue: string;
}

const PlanetName: React.FC<PlanetNameProps> = (props) => {
  return (
    <div>
      <label htmlFor="planet-name">Planet Name:</label>
      <input
        type="text"
        id="planet-name"
        aria-label="Planet Name"
        value={props.initialValue}
        onChange={(e) => {
          props.setPlanetName(e.target.value);
        }}
      />
    </div>
  );
};

export default PlanetName;
