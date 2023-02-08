import { render, screen } from "@testing-library/react";
import userEvent  from '@testing-library/user-event';
import W12MForm from "./W12MForm";
import WhatIs2Plus2 from "./WhatIs2Plus2";

describe("Test the select field updates as expected", () => {
  test(`Given the required props,
        When the component is rendered,
        Then the 'what is 4 + 4' selector should be present`, () => {
    const whatIs2Plus2Props = {
      setWhatIs2Plus2: jest.fn(),
      whatIs2Plus2: "4",
    };
    render(<WhatIs2Plus2 {...whatIs2Plus2Props} />);

    expect(screen.getByLabelText(/what is 2/i)).toHaveValue("4");
    expect( screen.queryByText(/❌/)).not.toBeInTheDocument();
  });

  test(`Given the required props, 
        When input text is updated, 
        Then setSpeciesName() function is called`, async () => {
    const whatIs2Plus2Props = {
      setWhatIs2Plus2: jest.fn(),
      whatIs2Plus2: "Not 4",
    };
    render(<WhatIs2Plus2 {...whatIs2Plus2Props} />);

    const inputNode = screen.getByLabelText(/what is 2/i);
    await userEvent.selectOptions(inputNode, "4");

    expect(whatIs2Plus2Props.setWhatIs2Plus2).toBeCalledTimes(1);
    expect(whatIs2Plus2Props.setWhatIs2Plus2).toBeCalledWith("4");
  });

  test(`Given that the SpeciesName component is rendered,
        When select option is changed,
        Then the select field's content is updated`, async() => {
    render(<W12MForm />);

    const inputNode = screen.getByLabelText(/what is 2/i);

    await userEvent.selectOptions(inputNode, "Not 4");

    expect(screen.getByLabelText(/what is 2/i)).toHaveValue("Not 4");
  });
});

describe("Test WhatIs2Plus2 validation", () => {
  it(`Given the required props,
      When the select option is changed to 'Not 4',
      Then error message should be visible`, async () => {

    render(<W12MForm />);

    const inputNode = screen.getByLabelText(/what is 2/i);
    await userEvent.selectOptions(inputNode, "Not 4");

    expect(
      screen.getByText("❌ The answer for What is 2 + 2 can only be 4 (obvs)")
    ).toBeInTheDocument();
  });
});