import { render, screen, fireEvent } from "@testing-library/react";

import W12MForm from "./W12MForm";
import WhatIs2Plus2 from "./WhatIs2Plus2";

describe("Test the select field updates as expected", () => {
  test("that setWhatIs2Plus2() is called when selection changes", () => {
    const whatIs2Plus2Props = {
      setWhatIs2Plus2: jest.fn(),
      initialValue: "Not 4",
    };
    render(<WhatIs2Plus2 {...whatIs2Plus2Props} />);

    const inputNode = screen.getByLabelText(/what is 2/i);
    fireEvent.change(inputNode, { target: { value: "4" } });

    expect(whatIs2Plus2Props.setWhatIs2Plus2).toBeCalledTimes(1);
    expect(whatIs2Plus2Props.setWhatIs2Plus2).toBeCalledWith("4");
  });

  test("that WhatIs2Plus2 select field is updated when selection is changed", () => {
    render(<W12MForm />);

    const inputNode = screen.getByLabelText(/what is 2/i);
    fireEvent.change(inputNode, { target: { value: "4" } });

    expect(screen.getByLabelText(/what is 2/i)).toHaveValue("4");
  });
});