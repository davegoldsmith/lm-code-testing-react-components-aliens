interface NumberOfBeingsProps {
  setNumberOfBeings: (numberOfBeings: number) => void;
  initialValue: number;
}

const NumberOfBeings: React.FC<NumberOfBeingsProps> = (props) => {
  return (
    <div>
      <label htmlFor="number-of-beings">Number Of Beings:</label>
      <input
        type="text"
        name="number-of-beings"
        value={props.initialValue === 0 ? "" : props.initialValue}
        onChange={(e) => {
          let value = 0;
          if (e.target.value) {
            value = parseInt(e.target.value);
            if (isNaN(value)) {
              value = 0;
            }
          }
          props.setNumberOfBeings(value);
        }}
      />
    </div>
  );
};

export default NumberOfBeings;
