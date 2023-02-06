interface FormSummaryProps {
  speciesName: string;
  planetName: string;
  numberOfBeings: number;
  whatIs2Plus2: string;
  reasonForSparing: string;
  isSubmit: boolean;
}

const FormSummary: React.FC<FormSummaryProps> = (props) => {
  return (
    <div>
        <div>
          <p>
            <strong>Species Name: </strong>
            {props.speciesName}
          </p>
          <p>
            <strong>Planet Name: </strong>
            {props.planetName}
          </p>
          <p>
            <strong>Number of Beings: </strong>
            {props.numberOfBeings}
          </p>
          <p>
            <strong>What is 2 + 2?: </strong>
            {props.whatIs2Plus2}
          </p>
          <p>
            <strong>Reason for Sparing: </strong>
            {props.reasonForSparing}
          </p>
        </div>
    </div>
  );
};

export default FormSummary;
