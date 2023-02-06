import { render, screen, fireEvent } from "@testing-library/react";
import SpeciesName from "./SpeciesName";
import W12MForm from "./W12MForm";

describe("Test the text field on SpeciesName updates as expected", () => {
  test("that setSpeciesName() is called when input text is updated", () => {
    const speciesProps = {
      setSpeciesName: jest.fn(),
      initialValue: "",
    };
    render(<SpeciesName {...speciesProps} />);

    const inputNode = screen.getByLabelText(/species name/i);
    fireEvent.change(inputNode, { target: { value: "Earthling" } });

    expect(speciesProps.setSpeciesName).toBeCalledTimes(1);
    expect(speciesProps.setSpeciesName).toBeCalledWith("Earthling");
  });

  test("that SpeciesName text field is updated when text is updated", () => {
    render(<W12MForm />);

    const inputNode = screen.getByLabelText(/species name/i);
    fireEvent.change(inputNode, { target: { value: "Earthling" } });

    expect(screen.getByLabelText(/species name/i)).toHaveValue("Earthling");
  });
});
