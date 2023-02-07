import { render, screen, fireEvent } from "@testing-library/react";
import NumberOfBeings from "./NumberOfBeings";
import W12MForm from "./W12MForm";

describe("Test the text field on NumberOfBeings updates as expected", () => {
  test("that setNumberOfBeings() is called when input text is updated", () => {
    const numOfBeingsProps = {
      setNumberOfBeings: jest.fn(),
      initialValue: 0,
    };
    render(<NumberOfBeings {...numOfBeingsProps} />);

    const inputNode = screen.getByLabelText(/number of beings/i);
    fireEvent.change(inputNode, { target: { value: 9000 } });

    expect(numOfBeingsProps.setNumberOfBeings).toBeCalledTimes(1);
    expect(numOfBeingsProps.setNumberOfBeings).toBeCalledWith(9000);;
  });

  test("that NumberOfBeings text field is updated when a number is entered in the text field", () => {
    render(<W12MForm />);

    expect(screen.getByLabelText(/number of beings/i)).not.toHaveValue();

    const inputNode = screen.getByLabelText(/number of beings/i);
    fireEvent.change(inputNode, { target: { value: 99 } });

    expect(screen.getByLabelText(/number of beings/i)).toHaveValue("99");
  });

  test("that NumberOfBeings text field is not updated when 0 is entered in the text field", () => {
    render(<W12MForm />);

    expect(screen.getByLabelText(/number of beings/i)).not.toHaveValue();

    const inputNode = screen.getByLabelText(/number of beings/i);
    fireEvent.change(inputNode, { target: { value: 0 } });

    expect(screen.getByLabelText(/number of beings/i)).not.toHaveValue();
  });

  test("that NumberOfBeings text field is not updated when a non numeric value is entered in the text field", () => {
    render(<W12MForm />);
    const inputNode = screen.getByLabelText(/number of beings/i);
    // enter a string value
    fireEvent.change(inputNode, { target: { value: "invalid" } });
    expect(screen.getByLabelText(/number of beings/i)).not.toHaveValue();
    // enter a bunch of symbols
    fireEvent.change(inputNode, { target: { value: "%$%" } });
    expect(screen.getByLabelText(/number of beings/i)).not.toHaveValue();
  });
});

describe("Test NumberOfBeings validation", () => {
  test(`Given the required props,
        When the text entered is less than 1,000,000,000,
        Then error message should be visible`, () => {
    // const planetNameProps = {
    //   setPlanetName: () => {},
    //   initialValue: "",
    // };
    // render(<PlanetName {...planetNameProps} />);
    render(<W12MForm />);

    const inputNode = screen.getByLabelText(/planet name/i);
    fireEvent.change(inputNode, { target: { value: "i" } });

    expect(
      screen.getByText("❌ Planet name must have length between 2 and 49")
    ).toBeInTheDocument();
  });

  test(`Given the required props,
        When the text is updated to be more than 23 characters,
        Then wrong length error message should be visible`, () => {
    // const planetNameProps = {
    //   setPlanetName: () => {},
    //   initialValue: "",
    // };
    // render(<PlanetName {...planetNameProps} />);
    render(<W12MForm />);

    const inputNode = screen.getByLabelText(/planet name/i);
    fireEvent.change(inputNode, {
      target: {
        value:
          "thisisaverylongspeciesnameandwillbreakvalidationespeciallyificarryontypingmoreandmorestuff",
      },
    });

    expect(
      screen.getByText("❌ Planet name must have length between 2 and 49")
    ).toBeInTheDocument();
  });

  test(`Given the required props,
        When the text is updated to an invalid name,
        Then error message should be shown`, () => {
    // const planetNameProps = {
    //   setPlanetName: () => {},
    //   initialValue: "",
    // };
    // render(<PlanetName {...planetNameProps} />);
    render(<W12MForm />);

    const inputNode = screen.getByLabelText(/planet name/i);
    fireEvent.change(inputNode, { target: { value: "%$" } });

    expect(
      screen.getByText("❌ Planet name must only contain letters and numbers")
    ).toBeInTheDocument();
  });
});