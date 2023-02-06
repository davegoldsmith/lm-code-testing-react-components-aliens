import { fireEvent, render, screen } from "@testing-library/react";
import W12MForm from "./W12MForm";

test("renders form element", () => {
  // we can hold onto the object returned from render()
  // this object has a container property that we can destructure and inspect
  const { container } = render(<W12MForm />);

  // the container is just a normal DOM element, so we can look at normal properties like '.firstChild'
  // for example, the firstChild of our container should be our form element
  expect(container.firstChild).toHaveClass("w12MForm");
});

test("that summary form is shown when submit button is pressed", () => {
  render(<W12MForm />);

	expect(screen.queryByText(/Form Summary/i)).not.toBeInTheDocument();

  const inputNode = screen.getByLabelText(/submit/i);

  fireEvent.click(inputNode);

	expect(screen.getByText(/Form Summary/i)).toBeInTheDocument();
});
