import { render, screen, fireEvent } from "@testing-library/react";
import ReasonForSparing from "./ReasonForSparing";
import W12MForm from "./W12MForm";

describe("Test the text area updates as expected", () => {
  test("that setWhatIs2Plus2() is called when selection changes", () => {
    const reasonForSparingProps = {
      setReasonForSparing: jest.fn(),
      initialValue: "",
    };
    render(<ReasonForSparing {...reasonForSparingProps} />);

    const inputNode = screen.getByLabelText(/reason for sparing/i);
    fireEvent.change(inputNode, { target: { value: "Humans are generally good eggs" } });

    expect(reasonForSparingProps.setReasonForSparing).toBeCalledTimes(1);
    expect(reasonForSparingProps.setReasonForSparing).toBeCalledWith("Humans are generally good eggs");
  });

  test("that WhatIs2Plus2 select field is updated when selection is changed", () => {
    render(<W12MForm />);

    const inputNode = screen.getByLabelText(/reason for sparing/i);
    fireEvent.change(inputNode, { target: { value: "We are really generous at the bar" } });

    expect(screen.getByLabelText(/reason for sparing/i)).toHaveValue("We are really generous at the bar");
  });
});