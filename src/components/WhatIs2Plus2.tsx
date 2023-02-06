interface WhatIs2Plus2Props {
  setWhatIs2Plus2: (setWhatIs2Plus2Choice: string) => void;
  initialValue: string;
}

const WhatIs2Plus2: React.FC<WhatIs2Plus2Props> = (props) => {
  return (
    <div>
      <label htmlFor="what-is-2+2">What is 2+2?</label>
      <select
        aria-label="What Is 2 + 2"
        id="what-is-2+2"
        value={props.initialValue}
        onChange={(e) => {
          props.setWhatIs2Plus2(e.target.value);
        }}
      >
        <option value="4">4</option>
        <option value="Not 4">Not 4</option>
      </select>
    </div>
  );
};

export default WhatIs2Plus2;