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