import { render, screen } from "@testing-library/react";
import "@testing-library/dom";
import { Button } from "./Button";

test("test btn", () => {
  render(<Button>Test Btn</Button>);
});
