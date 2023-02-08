import { render, screen } from "@testing-library/react";
import userEvent  from '@testing-library/user-event';
import SpeciesName from "./SpeciesName";
import W12MForm from "./W12MForm";

describe("Test the text field on SpeciesName updates as expected", () => {
  test(`Given the required props,
        When the component is rendered,
        Then the species name should be present`, () => {
    const speciesProps = {
      setSpeciesName: jest.fn(),
      speciesName: "Human Being",
    };
    render(<SpeciesName {...speciesProps} />);

    expect(screen.getByLabelText(/species name/i)).toHaveValue("Human Being");
    expect(
      screen.queryByText("❌ Species Must have length between 3 and 23")
    ).not.toBeInTheDocument();
  });

  test(`Given the required props, 
        When input text is updated, 
        Then setSpeciesName() function is called`, async () => {
    const speciesProps = {
      setSpeciesName: jest.fn(),
      speciesName: "",
    };
    render(<SpeciesName {...speciesProps} />);

    const inputNode = screen.getByLabelText(/species name/i);
    await userEvent.type(inputNode, "Earthling");

    expect(speciesProps.setSpeciesName).toBeCalledTimes(9);
    expect(speciesProps.setSpeciesName).toBeCalledWith("g");
  });

  test(`Given that the SpeciesName component is rendered,
        When text is updated,
        Then the text field's content is updated`, async () => {
    render(<W12MForm />);

    const inputNode = screen.getByLabelText(/species name/i);
    await userEvent.type(inputNode, "Earthling");

    expect(screen.getByLabelText(/species name/i)).toHaveValue("Earthling");
  });
});

describe("Test SpeciesName validation", () => {
  it(`Given the required props,
      When the text is updated to be less than 3 characters,
      Then wrong length error message should be visible`, async () => {

    render(<W12MForm />);

    const inputNode = screen.getByLabelText(/species name/i);
    await userEvent.type(inputNode, "me");

    expect(
      screen.getByText("❌ Species Must have length between 3 and 23")
    ).toBeInTheDocument();
  });

  it(`Given the required props,
      When the text is updated to be more than 23 characters,
      Then wrong length error message should be visible`, async () => {

    render(<W12MForm />);

    const inputNode = screen.getByLabelText(/species name/i);
    await userEvent.type(inputNode, "thisisaverylongspeciesnameandwillbreakvalidation");

    expect(
      screen.getByText("❌ Species Must have length between 3 and 23")
    ).toBeInTheDocument();
  });

  it(`Given the required props,
      When the component is rendered,
      Then the species name should be present`, async () => {
    render(<W12MForm />);

    const inputNode = screen.getByLabelText(/species name/i);
    await userEvent.type(inputNode, "%$");

    expect(
      screen.getByText("❌ Species Name must only contain only letters")
    ).toBeInTheDocument();
  });
});
