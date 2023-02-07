import { render, screen, fireEvent, findByRole } from "@testing-library/react";
import userEvent  from '@testing-library/user-event'
import SpeciesName from "./SpeciesName";
import W12MForm from "./W12MForm";

describe("Test the text field on SpeciesName updates as expected", () => {
  it(`Given the required props,
  When the component is rendered,
  Then the species name should be present`, () => {
    const speciesProps = {
      setSpeciesName: jest.fn(),
      initialValue: "Human Being",
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
      initialValue: "",
    };
    render(<SpeciesName {...speciesProps} />);

    const inputNode = screen.getByLabelText(/species name/i);
    // await userEvent.type(inputNode, "Earthling");
    fireEvent.change(inputNode, { target: { value: "Earthling" } });

    expect(speciesProps.setSpeciesName).toBeCalledTimes(1);
    expect(speciesProps.setSpeciesName).toBeCalledWith("Earthling")

    // screen.debug(screen.getByRole("textbox"));
    // screen.debug(inputNode);
    // expect(screen.getByRole("textbox")).toHaveValue("Earthling");


  });

  // I've added this test because the fireEvent doesn't seem to update
  // at the component level, so used the parent form as render context
  // instead. Not really sure why this is?
  test(`Given that the SpeciesName coponent is rendered,
  When text is updated,
  then the text field's content is updated`, () => {
    render(<W12MForm />);

    const inputNode = screen.getByLabelText(/species name/i);
    fireEvent.change(inputNode, { target: { value: "Earthling" } });

    expect(screen.getByLabelText(/species name/i)).toHaveValue("Earthling");
  });
});

describe("Test SpeciesName validation", () => {
  it(`Given the required props,
    When the text is updated to be less than 3 characters,
    Then wrong length error message should be visible`, () => {
    // const speciesProps = {
    //   setSpeciesName: () => {},
    //   initialValue: "",
    // };
    // render(<SpeciesName {...speciesProps} />);
    render(<W12MForm />);

    const inputNode = screen.getByLabelText(/species name/i);
    fireEvent.change(inputNode, { target: { value: "me" } });

    expect(
      screen.getByText("❌ Species Must have length between 3 and 23")
    ).toBeInTheDocument();
  });

  it(`Given the required props,
      When the text is updated to be more than 23 characters,
      Then wrong length error message should be visible`, () => {
    // const speciesProps = {
    //   setSpeciesName: () => {},
    //   initialValue: "",
    // };
    // render(<SpeciesName {...speciesProps} />);
    render(<W12MForm />);

    const inputNode = screen.getByLabelText(/species name/i);
    fireEvent.change(inputNode, {
      target: { value: "thisisaverylongspeciesnameandwillbreakvalidation" },
    });

    expect(
      screen.getByText("❌ Species Must have length between 3 and 23")
    ).toBeInTheDocument();
  });

  it(`Given the required props,
  When the component is rendered,
  Then the species name should be present`, () => {
    // const speciesProps = {
    //   setSpeciesName: () => {},
    //   initialValue: "",
    // };
    // render(<SpeciesName {...speciesProps} />);
    render(<W12MForm />);

    const inputNode = screen.getByLabelText(/species name/i);
    fireEvent.change(inputNode, { target: { value: "%$" } });

    expect(
      screen.getByText("❌ Species Name must only contain only letters")
    ).toBeInTheDocument();
  });
});
