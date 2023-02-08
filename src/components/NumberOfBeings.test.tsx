import { render, screen, fireEvent } from "@testing-library/react";
import NumberOfBeings from "./NumberOfBeings";
import W12MForm from "./W12MForm";
import userEvent from "@testing-library/user-event";

describe("Test the text field on NumberOfBeings updates as expected", () => {
  test(`Given the required props,
        When the component is rendered,
        Then the species name should be present`, () => {
    const numOfBeingsProps = {
      setNumberOfBeings: jest.fn(),
      numberOfBeings: 1000000000,
    };
    render(<NumberOfBeings {...numOfBeingsProps} />);

    expect(screen.getByLabelText(/number of beings/i)).toHaveValue("1000000000");
    expect( screen.queryByText(/❌/)).not.toBeInTheDocument();
  });

  test(`Given the required props, 
        When input text is updated, 
        Then setSpeciesName() function is called`, async () => {
    const numOfBeingsProps = {
      setNumberOfBeings: jest.fn(),
      numberOfBeings: 0,
    };
    render(<NumberOfBeings {...numOfBeingsProps} />);

    const inputNode = screen.getByLabelText(/number of beings/i);
    await userEvent.type(inputNode, "9000");

    expect(numOfBeingsProps.setNumberOfBeings).toBeCalledTimes(4);
    expect(numOfBeingsProps.setNumberOfBeings).toBeCalledWith(0);
  });

  test(`Given that the NumberOfBeings component is rendered,
        When a number is entered in the text field,
        Then the NumberOfBeings text field is updated`, async () => {
    render(<W12MForm />);

    expect(screen.getByLabelText(/number of beings/i)).not.toHaveValue();

    const inputNode = screen.getByLabelText(/number of beings/i);
    await userEvent.type(inputNode, "99");

    expect(screen.getByLabelText(/number of beings/i)).toHaveValue("99");
  });

  test(`Given that the NumberOfBeings component is rendered,
        When 0 is entered in the text field
        Then NumberOfBeings text field is not updated`, async () => {
    render(<W12MForm />);

    expect(screen.getByLabelText(/number of beings/i)).not.toHaveValue();

    const inputNode = screen.getByLabelText(/number of beings/i);
    await userEvent.type(inputNode, "0");

    expect(screen.getByLabelText(/number of beings/i)).not.toHaveValue();
  });

  test(`Given that the NumberOfBeings component is rendered,
        When a non numeric value is entered in the text field,
        Then NumberOfBeings text field is not updated`, async () => {
    render(<W12MForm />);
    const inputNode = screen.getByLabelText(/number of beings/i);
    // enter a string value
    await userEvent.type(inputNode, "invalid");
    expect(screen.getByLabelText(/number of beings/i)).not.toHaveValue();
    // enter a bunch of symbols
    await userEvent.type(inputNode, "%%");
    expect(screen.getByLabelText(/number of beings/i)).not.toHaveValue();
  });
});

describe("Test NumberOfBeings validation", () => {
  test(`Given the required props,
        When the text entered is less than 1,000,000,000,
        Then error message should be visible`, () => {
    render(<W12MForm />);

    const inputNode = screen.getByLabelText(/number of beings/i);
    fireEvent.change(inputNode, { target: { value: "1000000" } });

    expect(
      screen.getByText("❌ Number of beings must be greater than 1 billion")
    ).toBeInTheDocument();
  });
});
