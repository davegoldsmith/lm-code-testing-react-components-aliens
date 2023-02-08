import { render, screen } from "@testing-library/react";
import PlanetName from "./PlanetName";
import W12MForm from "./W12MForm";
import userEvent from "@testing-library/user-event";

describe("Test the text field on PlanetName updates as expected", () => {
  test(`Given the required props,
        When the component is rendered,
        Then the species name should be present`, () => {
    const planetNameProps = {
      setPlanetName: jest.fn(),
      planetName: "Earth",
    };
    render(<PlanetName {...planetNameProps} />);

    expect(screen.getByLabelText(/planet name/i)).toHaveValue("Earth");
    expect(
      screen.queryByText("❌ Planet name must have length between 2 and 49")
    ).not.toBeInTheDocument();
  });
  test(`Given the required props, 
        When input text is updated, 
        Then setPlanetName() function is called`, async () => {
    const planetNameProps = {
      setPlanetName: jest.fn(),
      planetName: "",
    };
    render(<PlanetName {...planetNameProps} />);

    const inputNode = screen.getByLabelText(/planet name/i);
    await userEvent.type(inputNode, "Earth");

    expect(planetNameProps.setPlanetName).toBeCalledTimes(5);
    expect(planetNameProps.setPlanetName).toBeCalledWith("h");
  });

  test(`Given that the PlanetName component is rendered,
        When text is updated,
        Then the text field's content is updated`, async () => {
    render(<W12MForm />);

    const inputNode = screen.getByLabelText(/planet name/i);
    await userEvent.type(inputNode, "Earth");

    expect(screen.getByLabelText(/planet name/i)).toHaveValue("Earth");
  });
});

describe("Test PlanetName validation", () => {
  test(`Given the required props,
        When the text is updated to be less than 2 characters,
        Then wrong length error message should be visible`, async () => {
    render(<W12MForm />);

    const inputNode = screen.getByLabelText(/planet name/i);
    await userEvent.type(inputNode, "i");

    expect(
      screen.getByText("❌ Planet name must have length between 2 and 49")
    ).toBeInTheDocument();
  });

  test(`Given the required props,
        When the text is updated to be more than 23 characters,
        Then wrong length error message should be visible`, async () => {
    render(<W12MForm />);

    const inputNode = screen.getByLabelText(/planet name/i);
    await userEvent.type(
      inputNode,
      "thisisaverylongspeciesnameandwillbreakvalidationespeciallyificarryontypingmoreandmorestuff"
    );

    expect(
      screen.getByText("❌ Planet name must have length between 2 and 49")
    ).toBeInTheDocument();
  });

  test(`Given the required props,
        When the text is updated to an invalid name,
        Then error message should be shown`, async () => {
    render(<W12MForm />);

    const inputNode = screen.getByLabelText(/planet name/i);
    await userEvent.type(inputNode, "%$");

    expect(
      screen.getByText("❌ Planet name must only contain letters and numbers")
    ).toBeInTheDocument();
  });
});
