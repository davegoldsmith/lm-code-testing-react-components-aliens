import { fireEvent, render, screen } from "@testing-library/react";
import userEvent  from '@testing-library/user-event';
import W12MForm from "./W12MForm";

test("renders form element", () => {
  // we can hold onto the object returned from render()
  // this object has a container property that we can destructure and inspect
  const { container } = render(<W12MForm />);

  // the container is just a normal DOM element, so we can look at normal properties like '.firstChild'
  // for example, the firstChild of our container should be our form element
  expect(container.firstChild).toHaveClass("w12MForm");
});

test(`Given all data is valid,
      When submit button is pressed,
      then  summary form is shown`, async() => {
  render(<W12MForm />);

	expect(screen.queryByText(/Form Summary/i)).not.toBeInTheDocument();

  const submitButton = screen.getByLabelText(/submit/i);

  expect(submitButton).toBeDisabled();

  const speciesInput = screen.getByLabelText(/species name/i);
  const numOfBeingsInput = screen.getByLabelText(/number of beings/i);
  const planetInput = screen.getByLabelText(/planet name/i);
  const whatIsSumInput = screen.getByLabelText(/what is 2/i);
  const reasonForSparingInput = screen.getByLabelText(/reason for sparing/i);

  await userEvent.type(speciesInput, "Earthling");
  await userEvent.type(planetInput, "Earth");
  await userEvent.selectOptions(whatIsSumInput, "4");
  await userEvent.type(numOfBeingsInput, "1000000000000");
  await userEvent.type(reasonForSparingInput, "We are very nice and friendly");

  expect(submitButton).not.toBeDisabled();
  await userEvent.click(submitButton);

	expect(screen.getByText(/Form Summary/i)).toBeInTheDocument();
});
