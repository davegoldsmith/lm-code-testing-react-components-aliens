interface ReasonForSparingProps {
  setReasonForSparing: (reasonForSparing: string) => void;
  initialValue: string;
}

const ReasonForSparing: React.FC<ReasonForSparingProps> = (props) => {
  return (
    <div>
      <label htmlFor="reason-for-sparing">What is 2+2?</label>
      <textarea
        name="reason-for-sparing"
        value={props.initialValue}
        rows={4}
        cols={10}
        onChange={(e) => {
          props.setReasonForSparing(e.target.value);
        }}
      ></textarea>
    </div>
  );
};

export default ReasonForSparing;
