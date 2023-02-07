import { render, screen, fireEvent } from "@testing-library/react";
import PlanetName from "./PlanetName";
import W12MForm from "./W12MForm";

describe("Test the text field on PlanetName updates as expected", () => {
  test("that setPlanetName() is called when input text is updated", () => {
    const planetNameProps = {
      setPlanetName: jest.fn(),
      initialValue: "",
    };
    render(<PlanetName {...planetNameProps} />);

    const inputNode = screen.getByLabelText(/planet name/i);
    fireEvent.change(inputNode, { target: { value: "Earth" } });

    expect(planetNameProps.setPlanetName).toBeCalledTimes(1);
    expect(planetNameProps.setPlanetName).toBeCalledWith("Earth");
  });

  test("that PlanetName text field is updated when text is updated", () => {
    render(<W12MForm />);

    const inputNode = screen.getByLabelText(/planet name/i);
    fireEvent.change(inputNode, { target: { value: "Earth" } });

    expect(screen.getByLabelText(/planet name/i)).toHaveValue("Earth");
  });
});

describe("Test PlanetName validation", () => {
  test(`Given the required props,
        When the text is updated to be less than 2 characters,
        Then wrong length error message should be visible`, () => {
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
