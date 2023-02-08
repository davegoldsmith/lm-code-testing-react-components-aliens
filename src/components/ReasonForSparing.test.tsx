import { render, screen } from "@testing-library/react";
import userEvent  from '@testing-library/user-event'
import ReasonForSparing from "./ReasonForSparing";
import W12MForm from "./W12MForm";

describe("Test the text area updates as expected", () => {
  test(`Given the required props,
        When the component is rendered,
        Then the reason for sparing should be present`, () => {
    const reasonForSparingProps = {
      setReasonForSparing: jest.fn(),
      reasonForSparing: "We are all a jolly lot of ok chaps",
    };
    render(<ReasonForSparing {...reasonForSparingProps} />);

    expect(screen.getByLabelText(/reason for sparing/i)).toHaveValue("We are all a jolly lot of ok chaps");
    expect(
      screen.queryByText("❌ Reason for Sparing name must have length between 17 and 153")
    ).not.toBeInTheDocument();
  });

  test(`Given the required props, 
        When input text is updated, 
        Then setReasonForSparing() function is called`, async () => {
    const reasonForSparingProps = {
      setReasonForSparing: jest.fn(),
      reasonForSparing: "",
    };
    render(<ReasonForSparing {...reasonForSparingProps} />);

    const inputNode = screen.getByLabelText(/reason for sparing/i);
    await userEvent.type(inputNode, "Humans are generally good eggs" );

    expect(reasonForSparingProps.setReasonForSparing).toBeCalledTimes(30);
    expect(reasonForSparingProps.setReasonForSparing).toBeCalledWith("s");
  });

  test(`Given the required props, 
        When input text is updated, 
        Then setSpeciesName() function is called`, async() => {
    render(<W12MForm />);

    const inputNode = screen.getByLabelText(/reason for sparing/i);
    await userEvent.type(inputNode,  "We are really generous at the bar");

    expect(screen.getByLabelText(/reason for sparing/i)).toHaveValue("We are really generous at the bar");
  });
});

describe("Test ReasonForSparing validation", () => {
  it(`Given the required props,
      When the text is updated to be less than 17 characters,
      Then wrong length error message should be visible`, async () => {

    render(<W12MForm />);

    const inputNode = screen.getByLabelText(/reason for sparing/i);
    await userEvent.type(inputNode, "just because");

    expect(
      screen.getByText("❌ Reason for Sparing must have length between 17 and 153")
    ).toBeInTheDocument();
  });

  it(`Given the required props,
      When the text is updated to be more than 153 characters,
      Then wrong length error message should be visible`, async () => {

    render(<W12MForm />);

    const inputNode = screen.getByLabelText(/reason for sparing/i);
    await userEvent.type(inputNode, "Please don't kill us, please, please, please, please, please, please, please, please, please,please, please, please, please, please, please, please, please, please, please, pretty please");

    expect(
      screen.getByText("❌ Reason for Sparing must have length between 17 and 153")
    ).toBeInTheDocument();
  });
});